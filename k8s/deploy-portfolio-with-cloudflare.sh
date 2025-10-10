#!/bin/bash
set -e

echo "========================================="
echo "Portfolio App Deployment with Cloudflare Update"
echo "========================================="
echo ""

# Configuration
PORTFOLIO_NODEPORT=31056
CONTROL_PLANE_IP="192.168.1.102"
CLOUDFLARE_CONFIG="/etc/cloudflared/config.yml"

echo "Deploying Portfolio app..."
# Deploy the portfolio app
kubectl apply -k k8s/portfolio/

echo ""
echo "Forcing deployment rollout to ensure new image is pulled..."
# Force restart to pull the latest image with updated code
kubectl rollout restart deployment/portfolio -n stefansportfolio

echo ""
echo "Waiting for Portfolio app to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/portfolio -n stefansportfolio

echo ""
echo "Verifying service has correct NodePort..."
ACTUAL_NODEPORT=$(kubectl get svc portfolio -n stefansportfolio -o jsonpath='{.spec.ports[0].nodePort}')
if [ "$ACTUAL_NODEPORT" != "$PORTFOLIO_NODEPORT" ]; then
    echo "ERROR: Service NodePort is $ACTUAL_NODEPORT, expected $PORTFOLIO_NODEPORT"
    echo "The portfolio-service.yaml may not have the fixed nodePort configured correctly."
    exit 1
fi

echo "✅ Service NodePort is correct: $PORTFOLIO_NODEPORT"

echo ""
echo "Updating Cloudflare tunnel configuration..."
if [ -f "$CLOUDFLARE_CONFIG" ]; then
    # Backup current config
    sudo cp "$CLOUDFLARE_CONFIG" "$CLOUDFLARE_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Update the NodePort in the config for portfolio
    sudo sed -i "s|https://$CONTROL_PLANE_IP:[0-9]*|https://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT|g" "$CLOUDFLARE_CONFIG"
    
    echo "✅ Cloudflare config updated to use NodePort $PORTFOLIO_NODEPORT"
    
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
        echo "The portfolio app is deployed but Cloudflare tunnel may need manual restart."
    fi
else
    echo "WARNING: Cloudflare config not found at $CLOUDFLARE_CONFIG"
    echo "Please manually update your Cloudflare tunnel to use:"
    echo "  https://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT"
fi

echo ""
echo "========================================="
echo "Portfolio Deployment Complete!"
echo "========================================="
echo ""
echo "Service Details:"
echo "  NodePort: $PORTFOLIO_NODEPORT"
echo "  Control Plane IP: $CONTROL_PLANE_IP"
echo "  External URL: https://$CONTROL_PLANE_IP:$PORTFOLIO_NODEPORT"
echo ""
echo "Check status with:"
echo "  kubectl get pods -n stefansportfolio -l app=portfolio"
echo "  kubectl get svc -n stefansportfolio -l app=portfolio"
echo ""
