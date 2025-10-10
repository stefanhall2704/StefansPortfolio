#!/bin/bash
set -e

# Script to help set up GitHub secrets for Portfolio CI/CD
# This script will generate the values you need to add to your GitHub repository secrets

echo "🔐 Portfolio GitHub Actions Secrets Setup"
echo "=========================================="
echo ""

echo "📋 Required GitHub Secrets for Portfolio:"
echo ""

# Docker Hub credentials
echo "1. DOCKER_USERNAME"
echo "   Description: Your Docker Hub username"
echo "   Value: stefanmhall"
echo ""

echo "2. DOCKER_PASSWORD"
echo "   Description: Your Docker Hub password or access token"
echo "   Value: [Your Docker Hub password or token]"
echo "   Note: Use an access token for better security"
echo ""

# SSH credentials
echo "3. SSH_HOST"
echo "   Description: IP address or hostname of your Kubernetes cluster control plane"
echo "   Value: 192.168.1.102"
echo "   Note: Update this to match your actual server IP"
echo ""

echo "4. SSH_USERNAME"
echo "   Description: Username for SSH access to the control plane"
echo "   Value: stefan"
echo "   Note: Update this to match your actual username"
echo ""

echo "5. SSH_PRIVATE_KEY"
echo "   Description: Private SSH key for authentication"
echo "   Value: [Your complete SSH private key]"
echo "   Note: Include the complete key with headers and footers"
echo ""

echo "📝 How to add these secrets:"
echo "1. Go to your GitHub repository: https://github.com/stefanmhall/StefansPortfolio"
echo "2. Navigate to Settings → Secrets and variables → Actions"
echo "3. Click 'New repository secret' for each secret above"
echo "4. Copy and paste the values"
echo ""

echo "🔗 Docker Hub Access Token:"
echo "If you don't have a Docker Hub access token:"
echo "1. Go to https://hub.docker.com/settings/security"
echo "2. Click 'New Access Token'"
echo "3. Give it a name (e.g., 'Portfolio GitHub Actions')"
echo "4. Copy the token and use it as DOCKER_PASSWORD"
echo ""

echo "🔑 SSH Key Setup:"
echo "If you need to generate SSH keys:"
echo "1. Run: ssh-keygen -t ed25519 -C 'github-actions-portfolio'"
echo "2. Copy the public key to your server: ssh-copy-id username@hostname"
echo "3. Use the private key content as SSH_PRIVATE_KEY"
echo ""

echo "🧪 Testing Your Setup:"
echo "After adding the secrets, you can test by:"
echo "1. Pushing to the main branch (triggers automatic deployment)"
echo "2. Using manual dispatch in GitHub Actions"
echo "3. Checking deployment status: kubectl get pods -n hallphotography -l app=portfolio"
echo ""

echo "✅ Setup complete! Your Portfolio GitHub Actions should now be able to deploy to your Kubernetes cluster."
