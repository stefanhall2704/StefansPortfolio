#!/bin/bash

# Cloudflared tunnel setup for traceroute backend
# This script sets up a secure tunnel to the traceroute backend service

set -e

echo "🚀 Setting up Cloudflare Tunnel for Traceroute Backend"

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared is not installed. Please install it first:"
    echo "curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cloudflared.deb"
    exit 1
fi

# Check if already logged in
if ! cloudflared tunnel login; then
    echo "❌ Failed to login to Cloudflare. Please run 'cloudflared tunnel login' manually first."
    exit 1
fi

# Create the tunnel
echo "📝 Creating tunnel..."
if cloudflared tunnel create traceroute-backend-tunnel; then
    echo "✅ Tunnel 'traceroute-backend-tunnel' created successfully"
else
    echo "⚠️  Tunnel might already exist, continuing..."
fi

# Get tunnel ID
TUNNEL_ID=$(cloudflared tunnel list | grep traceroute-backend-tunnel | awk '{print $1}')
if [ -z "$TUNNEL_ID" ]; then
    echo "❌ Failed to get tunnel ID"
    exit 1
fi

echo "🔑 Tunnel ID: $TUNNEL_ID"

# Create DNS record for the tunnel
echo "🌐 Creating DNS records..."

# Main subdomain
cloudflared tunnel route dns traceroute-backend-tunnel traceroute.stefanmhall.dev

# Health check subdomain
cloudflared tunnel route dns traceroute-backend-tunnel health-traceroute.stefanmhall.dev

echo "✅ DNS records created:"
echo "   - traceroute.stefanmhall.dev"
echo "   - health-traceroute.stefanmhall.dev"

# Create credentials file path
CREDENTIALS_DIR="/etc/cloudflared"
sudo mkdir -p $CREDENTIALS_DIR

# Copy credentials file
echo "📋 Copying tunnel credentials..."
sudo cp ~/.cloudflared/$(cloudflared tunnel list | grep traceroute-backend-tunnel | awk '{print $2}').json $CREDENTIALS_DIR/traceroute-tunnel.json

echo "✅ Setup complete!"
echo ""
echo "🔧 To start the tunnel, run:"
echo "sudo cloudflared tunnel run traceroute-backend-tunnel"
echo ""
echo "📊 To run in background as a service:"
echo "sudo cloudflared service install"
echo ""
echo "🔍 Test the tunnel:"
echo "curl https://traceroute.stefanmhall.dev/health"
echo ""
echo "🎯 Your traceroute backend will be available at:"
echo "https://traceroute.stefanmhall.dev"

