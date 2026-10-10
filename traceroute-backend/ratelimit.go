package main

import (
	"os"
	"strconv"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// limiterSet is a per-client rate limiter. (The original code used ONE limiter for the whole service, so after
// 10 requests from anybody every visitor got HTTP 429 until the next token refilled, 15 minutes later.)
type limiterSet struct {
	mu    sync.Mutex
	m     map[string]*clientLimiter
	every time.Duration // one new token per interval
	burst int
}

type clientLimiter struct {
	lim  *rate.Limiter
	seen time.Time
}

func newLimiterSet(every time.Duration, burst int) *limiterSet {
	return &limiterSet{m: map[string]*clientLimiter{}, every: every, burst: burst}
}

// newLimiterSetFromEnv: RATE_LIMIT_BURST (default 10) requests, refilling one every RATE_LIMIT_REFILL (default 90s),
// i.e. roughly "10 per 15 minutes" per client.
func newLimiterSetFromEnv() *limiterSet {
	burst := 10
	if v, err := strconv.Atoi(os.Getenv("RATE_LIMIT_BURST")); err == nil && v > 0 {
		burst = v
	}
	every := 90 * time.Second
	if d, err := time.ParseDuration(os.Getenv("RATE_LIMIT_REFILL")); err == nil && d > 0 {
		every = d
	}
	return newLimiterSet(every, burst)
}

func (s *limiterSet) allow(key string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	c, ok := s.m[key]
	if !ok {
		c = &clientLimiter{lim: rate.NewLimiter(rate.Every(s.every), s.burst)}
		s.m[key] = c
	}
	c.seen = time.Now()
	return c.lim.Allow()
}

// retryAfter is how long until this client gets a token back (for the Retry-After header).
func (s *limiterSet) retryAfter() time.Duration { return s.every }

// sweep forgets clients not seen for maxIdle so the map cannot grow without bound.
func (s *limiterSet) sweep(maxIdle time.Duration) {
	s.mu.Lock()
	defer s.mu.Unlock()
	for k, c := range s.m {
		if time.Since(c.seen) > maxIdle {
			delete(s.m, k)
		}
	}
}

func (s *limiterSet) startJanitor() {
	go func() {
		for range time.Tick(10 * time.Minute) {
			s.sweep(time.Hour)
		}
	}()
}
