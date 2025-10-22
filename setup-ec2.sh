#!/bin/bash
# Script setup ban đầu cho EC2 server
# Chạy một lần duy nhất khi setup server mới

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system
update_system() {
    log_info "Updating system packages..."
    sudo yum update -y
    log_success "System updated"
}

# Install Node.js
install_nodejs() {
    log_info "Installing Node.js..."
    
    # Install Node.js 18.x
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
    
    # Verify installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    
    log_success "Node.js installed: $node_version"
    log_success "npm installed: $npm_version"
}

# Install Nginx
install_nginx() {
    log_info "Installing Nginx..."
    
    sudo yum install -y nginx
    
    # Start and enable Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    log_success "Nginx installed and started"
}

# Install PM2 (optional, for process management)
install_pm2() {
    log_info "Installing PM2..."
    
    sudo npm install -g pm2
    
    log_success "PM2 installed"
}

# Setup firewall
setup_firewall() {
    log_info "Setting up firewall..."
    
    # Install firewalld if not present
    sudo yum install -y firewalld
    sudo systemctl start firewalld
    sudo systemctl enable firewalld
    
    # Open required ports
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --reload
    
    log_success "Firewall configured"
}

# Create application directory
create_app_directory() {
    log_info "Creating application directory..."
    
    sudo mkdir -p /home/ec2-user/inkverse
    sudo chown ec2-user:ec2-user /home/ec2-user/inkverse
    
    log_success "Application directory created"
}

# Setup SSL (Let's Encrypt)
setup_ssl() {
    log_info "Setting up SSL with Let's Encrypt..."
    
    # Install certbot
    sudo yum install -y certbot python3-certbot-nginx
    
    log_warning "SSL setup requires domain name. Run manually:"
    log_warning "sudo certbot --nginx -d inkverse.online -d www.inkverse.online"
    
    log_success "Certbot installed"
}

# Install additional tools
install_tools() {
    log_info "Installing additional tools..."
    
    # Install git, curl, wget, unzip
    sudo yum install -y git curl wget unzip
    
    # Install build tools
    sudo yum groupinstall -y "Development Tools"
    
    log_success "Additional tools installed"
}

# Setup log rotation
setup_log_rotation() {
    log_info "Setting up log rotation..."
    
    # Create logrotate config for application
    sudo tee /etc/logrotate.d/inkverse > /dev/null <<EOF
/home/ec2-user/inkverse/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 ec2-user ec2-user
    postrotate
        systemctl reload inkverse
    endscript
}
EOF
    
    log_success "Log rotation configured"
}

# Create systemd service
create_systemd_service() {
    log_info "Creating systemd service..."
    
    # Copy service file
    sudo cp inkverse.service /etc/systemd/system/
    
    # Reload systemd
    sudo systemctl daemon-reload
    
    # Enable service
    sudo systemctl enable inkverse
    
    log_success "Systemd service created and enabled"
}

# Setup Nginx configuration
setup_nginx_config() {
    log_info "Setting up Nginx configuration..."
    
    # Backup default config
    sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
    
    # Copy custom config
    sudo cp nginx-inkverse.conf /etc/nginx/conf.d/inkverse.conf
    
    # Test Nginx configuration
    sudo nginx -t
    
    if [ $? -eq 0 ]; then
        sudo systemctl reload nginx
        log_success "Nginx configuration updated"
    else
        log_error "Nginx configuration test failed"
        exit 1
    fi
}

# Setup monitoring
setup_monitoring() {
    log_info "Setting up basic monitoring..."
    
    # Install htop for monitoring
    sudo yum install -y htop
    
    # Create monitoring script
    cat > /home/ec2-user/monitor.sh << 'EOF'
#!/bin/bash
echo "=== System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "Memory: $(free -h)"
echo "Disk: $(df -h /)"
echo ""
echo "=== Services ==="
systemctl status inkverse --no-pager -l
echo ""
systemctl status nginx --no-pager -l
echo ""
echo "=== Application Logs (last 10 lines) ==="
journalctl -u inkverse --no-pager -l -n 10
EOF
    
    chmod +x /home/ec2-user/monitor.sh
    
    log_success "Monitoring setup completed"
}

# Main setup function
main() {
    echo "🚀 Setting up EC2 server for Inkverse"
    echo "====================================="
    
    # Check if running as ec2-user
    if [ "$USER" != "ec2-user" ]; then
        log_error "Please run this script as ec2-user"
        exit 1
    fi
    
    # Run setup steps
    update_system
    install_nodejs
    install_nginx
    install_pm2
    setup_firewall
    create_app_directory
    setup_ssl
    install_tools
    setup_log_rotation
    create_systemd_service
    setup_nginx_config
    setup_monitoring
    
    echo ""
    echo "🎉 Server setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update EC2_HOST in deploy.sh with your server IP"
    echo "2. Run: ./deploy.sh"
    echo "3. Setup SSL: sudo certbot --nginx -d inkverse.online"
    echo "4. Monitor: ./monitor.sh"
    echo ""
    echo "🔧 Useful commands:"
    echo "- Check service: sudo systemctl status inkverse"
    echo "- View logs: journalctl -u inkverse -f"
    echo "- Restart service: sudo systemctl restart inkverse"
    echo "- Check Nginx: sudo nginx -t"
    echo ""
}

# Run main function
main
