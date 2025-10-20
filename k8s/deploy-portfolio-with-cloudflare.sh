#!/bin/bash
set -e

echo "========================================="
echo "Portfolio App Deployment with Cloudflare Update"
echo "========================================="
echo ""

# Configuration
PORTFOLIO_NODEPORT=31057
TRACEROUTE_NODEPORT=31654
CONTROL_PLANE_IP="192.168.1.102"
CLOUDFLARE_CONFIG="/etc/cloudflared/config.yml"
NAMESPACE="stefansportfolio"

echo "Creating namespace and shared resources..."
kubectl apply -f k8s/shared/namespace.yaml
kubectl apply -f k8s/shared/dns-config.yaml

echo ""
echo "Deploying Portfolio app..."
kubectl apply -f k8s/portfolio/portfolio-deployment.yaml
kubectl apply -f k8s/portfolio/portfolio-service.yaml

echo ""
echo "Deploying Traceroute Backend..."
kubectl apply -f k8s/traceroute/traceroute-backend-deployment.yaml
kubectl apply -f k8s/traceroute/traceroute-backend-service.yaml

echo ""
echo "Forcing deployment rollouts to ensure new images are pulled..."
# Force restart to pull the latest images with updated code
kubectl rollout restart deployment/portfolio -n $NAMESPACE
kubectl rollout restart deployment/traceroute-backend -n $NAMESPACE

echo ""
echo "Waiting for Portfolio app to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/portfolio -n $NAMESPACE

echo ""
echo "Waiting for Traceroute Backend to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/traceroute-backend -n $NAMESPACE

echo ""
echo "Verifying Portfolio service has correct NodePort..."
ACTUAL_PORTFOLIO_NODEPORT=$(kubectl get svc portfolio -n $NAMESPACE -o jsonpath='{.spec.ports[0].nodePort}')
if [ "$ACTUAL_PORTFOLIO_NODEPORT" != "$PORTFOLIO_NODEPORT" ]; then
    echo "ERROR: Portfolio service NodePort is $ACTUAL_PORTFOLIO_NODEPORT, expected $PORTFOLIO_NODEPORT"
    echo "The portfolio-service.yaml may not have the fixed nodePort configured correctly."
    exit 1
fi

echo "✅ Portfolio service NodePort is correct: $PORTFOLIO_NODEPORT"

echo ""
echo "Verifying Traceroute Backend service has correct NodePort..."
ACTUAL_TRACEROUTE_NODEPORT=$(kubectl get svc traceroute-backend -n $NAMESPACE -o jsonpath='{.spec.ports[0].nodePort}')
if [ "$ACTUAL_TRACEROUTE_NODEPORT" != "$TRACEROUTE_NODEPORT" ]; then
    echo "ERROR: Traceroute Backend service NodePort is $ACTUAL_TRACEROUTE_NODEPORT, expected $TRACEROUTE_NODEPORT"
    echo "The traceroute-backend-service.yaml may not have the fixed nodePort configured correctly."
    exit 1
fi

echo "✅ Traceroute Backend service NodePort is correct: $TRACEROUTE_NODEPORT"

echo ""
echo "Updating Cloudflare tunnel configuration..."
if [ -f "$CLOUDFLARE_CONFIG" ]; then
    # Backup current config
    sudo cp "$CLOUDFLARE_CONFIG" "$CLOUDFLARE_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"

    # Update the NodePorts in the config for both services
    # Update portfolio entry
    sudo sed -i "s|http://$CONTROL_PLANE_IP:31056|http://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT|g" "$CLOUDFLARE_CONFIG"
    # Update traceroute entry
    sudo sed -i "s|http://$CONTROL_PLANE_IP:31653|http://$CONTROL_PLANE_IP:$TRACEROUTE_NODEPORT|g" "$CLOUDFLARE_CONFIG"

    echo "✅ Cloudflare config updated to use Portfolio NodePort $PORTFOLIO_NODEPORT and Traceroute NodePort $TRACEROUTE_NODEPORT"

    # Restart cloudflared
    echo "Restarting cloudflared service..."
    if sudo -n systemctl restart cloudflared 2>/dev/null; then
        echo "✅ Cloudflared service restarted"
    else
        echo "⚠️  Could not restart cloudflared automatically (sudo requires password)"
        echo ""
        echo "To fix this for future deployments, run the setup script:"
        echo "  ./k8s/setup-passwordless-sudo.sh"
        echo ""
        echo "Or manually restart cloudflared now:"
        echo "  sudo systemctl restart cloudflared"
        echo ""
        echo "Both services are deployed but Cloudflare tunnel may need manual restart."
    fi
else
    echo "WARNING: Cloudflare config not found at $CLOUDFLARE_CONFIG"
    echo "Please manually update your Cloudflare tunnel to use:"
    echo "  Portfolio: https://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT"
    echo "  Traceroute: https://$CONTROL_PLANE_IP:$TRACEROUTE_NODEPORT"
fi

echo ""
echo "========================================="
echo "Portfolio & Traceroute Backend Deployment Complete!"
echo "========================================="
echo ""
echo "Service Details:"
echo "  Portfolio NodePort: $PORTFOLIO_NODEPORT"
echo "  Traceroute NodePort: $TRACEROUTE_NODEPORT"
echo "  Control Plane IP: $CONTROL_PLANE_IP"
echo ""
echo "External URLs:"
echo "  Portfolio: https://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT"
echo "  Traceroute: https://$CONTROL_PLANE_IP:$TRACEROUTE_NODEPORT"
echo ""
echo "Check status with:"
echo "  kubectl get pods -n $NAMESPACE"
echo "  kubectl get svc -n $NAMESPACE"
echo ""
