package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"go.opentelemetry.io/otel"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/sdk/trace/tracetest"
)

func TestLimiterIsPerClient(t *testing.T) {
	s := newLimiterSet(time.Hour, 2)
	if !s.allow("a") || !s.allow("a") {
		t.Fatal("first two requests from a must pass")
	}
	if s.allow("a") {
		t.Fatal("third request from a must be limited")
	}
	if !s.allow("b") {
		t.Fatal("b must not be affected by a (the old global limiter blocked everyone)")
	}
}

func TestLimiterSweepForgetsIdleClients(t *testing.T) {
	s := newLimiterSet(time.Hour, 1)
	s.allow("old")
	s.m["old"].seen = time.Now().Add(-2 * time.Hour)
	s.allow("fresh")
	s.sweep(time.Hour)
	if _, ok := s.m["old"]; ok {
		t.Fatal("idle client should be dropped")
	}
	if _, ok := s.m["fresh"]; !ok {
		t.Fatal("active client must stay")
	}
}

func TestIsValidTarget(t *testing.T) {
	for target, want := range map[string]bool{
		"1.1.1.1": true, "example.com": true, "a-b.example.org": true, "::1": true,
		"": false, "exa mple.com": false, "example.com; rm -rf /": false, "-bad.com": false, "$(whoami).com": false,
	} {
		if got := isValidTarget(target); got != want {
			t.Errorf("isValidTarget(%q)=%v want %v", target, got, want)
		}
	}
}

func TestParseTracerouteLine(t *testing.T) {
	h := parseTracerouteLine("2  192.168.1.1  0.445 ms  0.4 ms", 2)
	if h == nil || h.Number != 2 || h.IP != "192.168.1.1" || h.Latency != 0.445 || h.Location != "Local Network" {
		t.Fatalf("unexpected hop: %+v", h)
	}
	if parseTracerouteLine("traceroute to 1.1.1.1 (1.1.1.1), 30 hops max", 1) != nil {
		t.Fatal("header line must not parse as a hop")
	}
}

// Over HTTP: one client exhausting its allowance must not lock out another client.
func TestRESTRateLimitPerClient(t *testing.T) {
	gin.SetMode(gin.TestMode)
	old := limiters
	limiters = newLimiterSet(time.Hour, 1)
	defer func() { limiters = old }()
	r := gin.New()
	r.POST("/api/traceroute", handleTracerouteREST)

	call := func(remote string) int {
		req := httptest.NewRequest(http.MethodPost, "/api/traceroute", strings.NewReader("{bad json"))
		req.RemoteAddr = remote + ":5555"
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		return w.Code
	}
	if c := call("10.0.0.1"); c != 400 { // passes the limiter, then fails validation
		t.Fatalf("first call: got %d want 400", c)
	}
	if c := call("10.0.0.1"); c != 429 {
		t.Fatalf("second call from same client: got %d want 429", c)
	}
	if c := call("10.0.0.2"); c != 400 {
		t.Fatalf("other client must still be allowed: got %d want 400", c)
	}
}

// The traceroute work is wrapped in a span carrying target, hop count and completion.
func TestExecuteTracerouteEmitsSpan(t *testing.T) {
	dir := t.TempDir()
	fake := "#!/bin/sh\necho 'traceroute to 1.1.1.1'\necho ' 1  10.0.0.1  0.5 ms'\necho ' 2  192.168.1.1  1.5 ms'\n"
	if err := os.WriteFile(filepath.Join(dir, "traceroute"), []byte(fake), 0o755); err != nil {
		t.Fatal(err)
	}
	t.Setenv("PATH", dir+string(os.PathListSeparator)+os.Getenv("PATH"))

	rec := tracetest.NewSpanRecorder()
	tp := sdktrace.NewTracerProvider(sdktrace.WithSpanProcessor(rec))
	otel.SetTracerProvider(tp)
	tracer = tp.Tracer("test")

	res, err := executeTraceroute(context.Background(), "1.1.1.1", 5, 2, nil)
	if err != nil || res.TotalHops != 2 || !res.Completed {
		t.Fatalf("result %+v err %v", res, err)
	}
	spans := rec.Ended()
	if len(spans) != 1 || spans[0].Name() != "traceroute.execute" {
		t.Fatalf("want one traceroute.execute span, got %d", len(spans))
	}
	got := map[string]string{}
	for _, a := range spans[0].Attributes() {
		got[string(a.Key)] = a.Value.Emit()
	}
	if got["traceroute.target"] != "1.1.1.1" || got["traceroute.hops"] != "2" || got["traceroute.completed"] != "true" {
		t.Fatalf("span attributes wrong: %v", got)
	}
}
