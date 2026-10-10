package main

import (
	"context"
	"os"
	"strings"

	"github.com/sirupsen/logrus"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/trace"
)

const (
	defaultServiceName = "traceroute-backend"
	serviceVersion     = "1.1"
)

var tracer trace.Tracer = otel.Tracer(defaultServiceName)

// serviceName is what shows up as `service.name` in Tempo and `service_name` in the span metrics.
func serviceName() string {
	if v := strings.TrimSpace(os.Getenv("OTEL_SERVICE_NAME")); v != "" {
		return v
	}
	return defaultServiceName
}

// initTelemetry turns tracing on only when an OTLP endpoint is configured
// (OTEL_EXPORTER_OTLP_ENDPOINT, e.g. http://otel-collector.monitoring.svc.cluster.local:4317).
// Without one it is a no-op, so local runs and tests need no collector.
func initTelemetry(ctx context.Context) (shutdown func(context.Context) error, enabled bool) {
	noop := func(context.Context) error { return nil }
	if os.Getenv("OTEL_EXPORTER_OTLP_ENDPOINT") == "" && os.Getenv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT") == "" {
		return noop, false
	}
	exp, err := otlptracegrpc.New(ctx) // endpoint, headers, TLS etc. all come from the standard OTEL_* env vars
	if err != nil {
		logrus.WithError(err).Error("telemetry disabled: cannot create OTLP exporter")
		return noop, false
	}
	// Defaults first, environment last, so OTEL_SERVICE_NAME / OTEL_RESOURCE_ATTRIBUTES win.
	res, err := resource.New(ctx,
		resource.WithAttributes(attribute.String("service.name", defaultServiceName), attribute.String("service.version", serviceVersion)),
		resource.WithTelemetrySDK(),
		resource.WithFromEnv(),
	)
	if err != nil {
		logrus.WithError(err).Warn("telemetry resource incomplete")
	}
	tp := sdktrace.NewTracerProvider(sdktrace.WithBatcher(exp), sdktrace.WithResource(res))
	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))
	tracer = tp.Tracer(defaultServiceName)
	return tp.Shutdown, true
}

// logFields adds trace_id / span_id so a log line links to its trace in Grafana (Loki -> Tempo).
func logFields(ctx context.Context, f logrus.Fields) logrus.Fields {
	if f == nil {
		f = logrus.Fields{}
	}
	if sc := trace.SpanContextFromContext(ctx); sc.IsValid() {
		f["trace_id"] = sc.TraceID().String()
		f["span_id"] = sc.SpanID().String()
	}
	return f
}
