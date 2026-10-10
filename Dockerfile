# Multi-stage build for production React app
FROM node:18-bullseye AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm config set engine-strict=false && npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Production stage with nginx (the -otel variant ships the OpenTelemetry module)
FROM nginx:alpine-otel

# Copy built React app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# nginx config: stock config + OpenTelemetry. The server block is a template (envsubst at container start).
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
ENV NGINX_PORT=80 \
    OTEL_NGINX_ENDPOINT=otel-collector.monitoring.svc.cluster.local:4317 \
    OTEL_NGINX_SERVICE=portfolio

# Expose port 80
# Which commit this image was built from (CI passes --build-arg GIT_SHA=<sha>); served at /version.txt
ARG GIT_SHA=unknown
RUN printf '%s\n' "$GIT_SHA" > /usr/share/nginx/html/version.txt

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
