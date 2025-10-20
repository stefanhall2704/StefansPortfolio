package main

import (
	"bufio"
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
	"golang.org/x/time/rate"
)

type TracerouteRequest struct {
	Target   string `json:"target" binding:"required"`
	MaxHops  int    `json:"maxHops" binding:"min=1,max=50"`
	Timeout  int    `json:"timeout" binding:"min=1,max=30"`
}

type Hop struct {
	Number    int     `json:"number"`
	IP        string  `json:"ip"`
	Hostname  string  `json:"hostname"`
	Latency   float64 `json:"latency"`
	Location  string  `json:"location"`
	Port      int     `json:"port"`
	IsSecure  bool    `json:"isSecure"`
	Description string `json:"description"`
}

type TracerouteResult struct {
	Target     string `json:"target"`
	TotalHops  int    `json:"totalHops"`
	Hops       []Hop  `json:"hops"`
	Completed  bool   `json:"completed"`
	Error      string `json:"error,omitempty"`
}

type ProgressMessage struct {
	Type     string  `json:"type"`
	Progress float64 `json:"progress"`
	Message  string  `json:"message"`
	Hop      *Hop    `json:"hop,omitempty"`
	Result   *TracerouteResult `json:"result,omitempty"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// In production, validate origin
		return true
	},
}

// Rate limiter: 10 requests per 15 minutes per IP
var rateLimiter = rate.NewLimiter(rate.Every(15*time.Minute), 10)

func main() {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetLevel(logrus.InfoLevel)

	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	// Middleware
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     getAllowedOrigins(),
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Upgrade", "Connection"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":    "healthy",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
	})

	// Root endpoint
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"service":   "traceroute-backend",
			"version":   "1.0",
			"status":    "running",
			"endpoints": []string{"/health", "/api/traceroute", "/ws"},
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
	})

	// REST API endpoint
	r.POST("/api/traceroute", handleTracerouteREST)

	// WebSocket endpoint
	r.GET("/ws", handleWebSocket)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	logrus.WithField("port", port).Info("Starting traceroute server")
	logrus.Fatal(r.Run(":" + port))
}

func getAllowedOrigins() []string {
	origins := []string{"http://localhost:3000", "http://localhost:8080"}
	if corsOrigin := os.Getenv("CORS_ORIGIN"); corsOrigin != "" {
		origins = append(origins, corsOrigin)
	}
	return origins
}

func handleTracerouteREST(c *gin.Context) {
	clientIP := c.ClientIP()

	// Rate limiting
	if !rateLimiter.Allow() {
		c.JSON(429, gin.H{"error": "Rate limit exceeded. Try again later."})
		return
	}

	var req TracerouteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request: " + err.Error()})
		return
	}

	if !isValidTarget(req.Target) {
		c.JSON(400, gin.H{"error": "Invalid target: must be valid domain or IP address"})
		return
	}

	// Set defaults
	if req.MaxHops == 0 {
		req.MaxHops = 30
	}
	if req.Timeout == 0 {
		req.Timeout = 5
	}

	logrus.WithFields(logrus.Fields{
		"target":  req.Target,
		"client":  clientIP,
		"maxHops": req.MaxHops,
		"timeout": req.Timeout,
	}).Info("Starting traceroute")

	result, err := executeTraceroute(req.Target, req.MaxHops, req.Timeout, nil)
	if err != nil {
		logrus.WithError(err).Error("Traceroute failed")
		c.JSON(500, gin.H{"error": "Traceroute failed: " + err.Error()})
		return
	}

	c.JSON(200, result)
}

func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		logrus.WithError(err).Error("WebSocket upgrade failed")
		return
	}
	defer conn.Close()

	clientIP := c.ClientIP()
	logrus.WithField("client", clientIP).Info("WebSocket connection established")

	// Set connection timeouts
	conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	// Keep-alive ping
	go func() {
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				if err := conn.WriteControl(websocket.PingMessage, []byte{}, time.Now().Add(10*time.Second)); err != nil {
					return
				}
			}
		}
	}()

	for {
		var req TracerouteRequest
		err := conn.ReadJSON(&req)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				logrus.WithError(err).Error("WebSocket error")
			}
			break
		}

		// Rate limiting for WebSocket
		if !rateLimiter.Allow() {
			conn.WriteJSON(ProgressMessage{
				Type:    "error",
				Message: "Rate limit exceeded. Try again later.",
			})
			continue
		}

		if !isValidTarget(req.Target) {
			conn.WriteJSON(ProgressMessage{
				Type:    "error",
				Message: "Invalid target: must be valid domain or IP address",
			})
			continue
		}

		// Set defaults
		if req.MaxHops == 0 {
			req.MaxHops = 30
		}
		if req.Timeout == 0 {
			req.Timeout = 5
		}

		logrus.WithFields(logrus.Fields{
			"target":  req.Target,
			"client":  clientIP,
			"maxHops": req.MaxHops,
			"timeout": req.Timeout,
		}).Info("Starting WebSocket traceroute")

		progressCallback := func(progress float64, message string, hop *Hop) {
			msg := ProgressMessage{
				Type:     "progress",
				Progress: progress,
				Message:  message,
			}
			if hop != nil {
				msg.Hop = hop
			}
			conn.WriteJSON(msg)
		}

		result, err := executeTraceroute(req.Target, req.MaxHops, req.Timeout, progressCallback)
		if err != nil {
			conn.WriteJSON(ProgressMessage{
				Type:    "error",
				Message: "Traceroute failed: " + err.Error(),
			})
			continue
		}

		conn.WriteJSON(ProgressMessage{
			Type:   "complete",
			Result: &result,
		})
	}
}

func isValidTarget(target string) bool {
	if net.ParseIP(target) != nil {
		return true
	}

	// Basic domain validation
	matched, _ := regexp.MatchString(`^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`, target)
	return matched && len(target) <= 253
}

func executeTraceroute(target string, maxHops, timeout int, progressCallback func(float64, string, *Hop)) (TracerouteResult, error) {
	result := TracerouteResult{
		Target:    target,
		Hops:      []Hop{},
		Completed: false,
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout*maxHops)*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, "traceroute", "-n", "-m", strconv.Itoa(maxHops), "-w", strconv.Itoa(timeout), target)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return result, fmt.Errorf("failed to create stdout pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return result, fmt.Errorf("failed to start traceroute: %w", err)
	}

	scanner := bufio.NewScanner(stdout)
	hopCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		hop := parseTracerouteLine(line, hopCount+1)
		if hop != nil {
			result.Hops = append(result.Hops, *hop)
			hopCount++

			if progressCallback != nil {
				progress := float64(hopCount) / float64(maxHops) * 90 // Leave 10% for completion
				progressCallback(progress, fmt.Sprintf("Found hop %d: %s (%s) - %.2fms", hop.Number, hop.IP, hop.Location, hop.Latency), hop)
			}
		}
	}

	if err := cmd.Wait(); err != nil && ctx.Err() != context.DeadlineExceeded {
		// Some traceroute errors are acceptable if we got some hops
		if hopCount == 0 {
			return result, fmt.Errorf("traceroute command failed: %w", err)
		}
	}

	result.TotalHops = hopCount
	result.Completed = true

	if progressCallback != nil {
		progressCallback(100, fmt.Sprintf("Traceroute completed! Found %d hops to %s", hopCount, target), nil)
	}

	return result, nil
}

func parseTracerouteLine(line string, expectedNumber int) *Hop {
	// Example line: "1  192.168.1.1  1.234 ms"
	re := regexp.MustCompile(`^(\d+)\s+([^\s]+)\s+([0-9.]+)\s+ms`)
	matches := re.FindStringSubmatch(line)

	if len(matches) != 4 {
		return nil
	}

	hopNum, _ := strconv.Atoi(matches[1])
	ip := matches[2]
	latency, _ := strconv.ParseFloat(matches[3], 64)

	hop := &Hop{
		Number:     hopNum,
		IP:         ip,
		Hostname:   ip, // Could implement reverse DNS lookup
		Latency:    latency,
		Location:   getLocationFromIP(ip),
		Description: getDescriptionFromIP(ip),
		Port:       80, // Default, could be determined
		IsSecure:   false, // Default, could be determined
	}

	return hop
}

func getLocationFromIP(ip string) string {
	parts := strings.Split(ip, ".")
	if len(parts) != 4 {
		return "Unknown"
	}

	// Local networks
	if ip == "127.0.0.1" || strings.HasPrefix(ip, "192.168.") || strings.HasPrefix(ip, "10.") || strings.HasPrefix(ip, "172.") {
		return "Local Network"
	}

	// Known provider ranges (simplified)
	switch {
	case parts[0] == "142" && parts[1] == "250":
		return "Mountain View, CA"
	case parts[0] == "140" && parts[1] == "82":
		return "East Coast, US"
	case parts[0] == "151" && parts[1] == "101":
		return "New York, NY"
	case parts[0] == "104" && parts[1] == "21":
		return "Global CDN"
	case parts[0] == "205" && parts[1] == "251":
		return "AWS Global"
	case parts[0] == "52":
		return "AWS Global"
	case parts[0] == "157" && parts[1] == "240":
		return "Menlo Park, CA"
	case parts[0] == "104" && parts[1] == "244":
		return "San Francisco, CA"
	default:
		return "Internet"
	}
}

func getDescriptionFromIP(ip string) string {
	parts := strings.Split(ip, ".")
	if len(parts) != 4 {
		return "Internet router"
	}

	// Local networks
	if ip == "127.0.0.1" || strings.HasPrefix(ip, "192.168.") || strings.HasPrefix(ip, "10.") || strings.HasPrefix(ip, "172.") {
		return "Local router/gateway"
	}

	// Known provider ranges
	switch {
	case parts[0] == "142" && parts[1] == "250":
		return "Google Cloud"
	case parts[0] == "140" && parts[1] == "82":
		return "GitHub"
	case parts[0] == "151" && parts[1] == "101":
		return "Stack Overflow"
	case parts[0] == "104" && parts[1] == "21":
		return "Cloudflare CDN"
	case parts[0] == "205" && parts[1] == "251":
		return "Amazon AWS"
	case parts[0] == "52":
		return "Netflix CDN"
	case parts[0] == "157" && parts[1] == "240":
		return "Meta (Facebook)"
	case parts[0] == "104" && parts[1] == "244":
		return "Twitter/X"
	default:
		return "Internet router"
	}
}
