#!/bin/bash

# Deploy Portfolio to Kubernetes
# This script deploys the portfolio application to the Kubernetes cluster

set -e

echo "🚀 Deploying Portfolio to Kubernetes..."

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed or not in PATH"
    exit 1
fi

# Check if we can connect to the cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster"
    exit 1
fi

echo "✅ Connected to Kubernetes cluster"

# Deploy using the main k8s structure
echo "📦 Applying Kubernetes configurations..."
kubectl apply -f /home/stefan/Documents/Personal/kubernetes/k8s/portfolio-deployment.yaml
kubectl apply -f /home/stefan/Documents/Personal/kubernetes/k8s/portfolio-service.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/portfolio -n hallphotography

# Get the service information
echo "📋 Service Information:"
kubectl get service portfolio -n hallphotography

# Get the ingress information
echo "🌐 Ingress Information:"
kubectl get ingress web-ingress -n hallphotography

echo "✅ Portfolio deployment completed successfully!"
echo ""
echo "🔗 Access your portfolio at: https://portfolio.stefan-sre.com"
echo "📊 Check deployment status with: kubectl get pods -n hallphotography"
echo "📝 View logs with: kubectl logs -f deployment/portfolio -n hallphotography"
