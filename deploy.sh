#!/bin/bash
# Script deploy tự động cho inkverse.online
# Build ở máy local trước, sau đó push lên EC2

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="inkverse"
EC2_USER="ec2-user"
EC2_HOST="your-ec2-ip"
EC2_PATH="/home/ec2-user/inkverse"
LOCAL_BUILD_DIR="./build"
BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"

# Functions
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

# Check if required tools are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    if ! command -v rsync &> /dev/null; then
        log_error "rsync is not installed"
        exit 1
    fi
    
    if ! command -v ssh &> /dev/null; then
        log_error "ssh is not installed"
        exit 1
    fi
    
    log_success "All dependencies are available"
}

# Build React frontend
build_frontend() {
    log_info "Building React frontend..."
    
    cd client
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        log_info "Installing frontend dependencies..."
        npm install
    fi
    
    # Build production
    log_info "Building production bundle..."
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "Frontend build completed"
    else
        log_error "Frontend build failed"
        exit 1
    fi
    
    cd ..
}

# Prepare server files
prepare_server() {
    log_info "Preparing server files..."
    
    # Create backup of current build
    if [ -d "$LOCAL_BUILD_DIR" ]; then
        log_info "Creating backup..."
        cp -r "$LOCAL_BUILD_DIR" "$BACKUP_DIR"
        log_success "Backup created: $BACKUP_DIR"
    fi
    
    # Copy server files to build directory
    log_info "Copying server files..."
    mkdir -p "$LOCAL_BUILD_DIR/server"
    
    # Copy essential server files
    cp -r server/src "$LOCAL_BUILD_DIR/server/"
    cp server/package.json "$LOCAL_BUILD_DIR/server/"
    cp server/package-lock.json "$LOCAL_BUILD_DIR/server/"
    
    # Copy client build
    cp -r client/build/* "$LOCAL_BUILD_DIR/"
    
    log_success "Server files prepared"
}

# Deploy to EC2
deploy_to_ec2() {
    log_info "Deploying to EC2..."
    
    # Create deployment package
    log_info "Creating deployment package..."
    tar -czf "${PROJECT_NAME}-deploy.tar.gz" -C "$LOCAL_BUILD_DIR" .
    
    # Upload to EC2
    log_info "Uploading to EC2..."
    scp "${PROJECT_NAME}-deploy.tar.gz" "${EC2_USER}@${EC2_HOST}:/tmp/"
    
    # Deploy on EC2
    log_info "Deploying on EC2 server..."
    ssh "${EC2_USER}@${EC2_HOST}" << EOF
        set -e
        
        echo "🔄 Starting deployment on EC2..."
        
        # Backup current deployment
        if [ -d "$EC2_PATH" ]; then
            echo "📦 Creating backup..."
            sudo cp -r "$EC2_PATH" "${EC2_PATH}-backup-\$(date +%Y%m%d-%H%M%S)"
        fi
        
        # Stop services
        echo "⏹️ Stopping services..."
        sudo systemctl stop ${PROJECT_NAME} || true
        sudo systemctl stop nginx || true
        
        # Extract new deployment
        echo "📂 Extracting deployment..."
        cd /tmp
        sudo rm -rf "$EC2_PATH"
        sudo mkdir -p "$EC2_PATH"
        sudo tar -xzf "${PROJECT_NAME}-deploy.tar.gz" -C "$EC2_PATH"
        
        # Install server dependencies
        echo "📥 Installing server dependencies..."
        cd "$EC2_PATH/server"
        sudo npm install --production
        
        # Set permissions
        echo "🔐 Setting permissions..."
        sudo chown -R ec2-user:ec2-user "$EC2_PATH"
        sudo chmod -R 755 "$EC2_PATH"
        
        # Start services
        echo "▶️ Starting services..."
        sudo systemctl start ${PROJECT_NAME}
        sudo systemctl start nginx
        
        # Check service status
        echo "🔍 Checking service status..."
        sudo systemctl status ${PROJECT_NAME} --no-pager -l
        
        # Cleanup
        echo "🧹 Cleaning up..."
        rm -f "/tmp/${PROJECT_NAME}-deploy.tar.gz"
        
        echo "✅ Deployment completed successfully!"
EOF
    
    if [ $? -eq 0 ]; then
        log_success "Deployment to EC2 completed"
    else
        log_error "Deployment to EC2 failed"
        exit 1
    fi
}

# Cleanup local files
cleanup() {
    log_info "Cleaning up local files..."
    
    rm -f "${PROJECT_NAME}-deploy.tar.gz"
    
    log_success "Cleanup completed"
}

# Test deployment
test_deployment() {
    log_info "Testing deployment..."
    
    # Test API endpoint
    log_info "Testing API endpoint..."
    if curl -f -s "http://${EC2_HOST}/api/test" > /dev/null; then
        log_success "API endpoint is working"
    else
        log_warning "API endpoint test failed"
    fi
    
    # Test webhook endpoint
    log_info "Testing webhook endpoint..."
    if curl -f -s "http://${EC2_HOST}/api/webhooks/test" > /dev/null; then
        log_success "Webhook endpoint is working"
    else
        log_warning "Webhook endpoint test failed"
    fi
    
    log_success "Deployment testing completed"
}

# Main deployment function
main() {
    echo "🚀 Starting deployment for ${PROJECT_NAME}"
    echo "=================================="
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ] || [ ! -d "client" ] || [ ! -d "server" ]; then
        log_error "Please run this script from the project root directory"
        exit 1
    fi
    
    # Check configuration
    if [ "$EC2_HOST" = "your-ec2-ip" ]; then
        log_error "Please update EC2_HOST in the script with your actual EC2 IP"
        exit 1
    fi
    
    # Run deployment steps
    check_dependencies
    build_frontend
    prepare_server
    deploy_to_ec2
    cleanup
    test_deployment
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Website: http://${EC2_HOST}"
    echo "📊 Admin: http://${EC2_HOST}/admin"
    echo "🔔 Webhooks: http://${EC2_HOST}/admin/webhooks"
    echo ""
}

# Handle script arguments
case "${1:-}" in
    "build")
        log_info "Building only..."
        check_dependencies
        build_frontend
        log_success "Build completed"
        ;;
    "deploy")
        log_info "Deploying only..."
        prepare_server
        deploy_to_ec2
        cleanup
        test_deployment
        log_success "Deploy completed"
        ;;
    "test")
        log_info "Testing deployment..."
        test_deployment
        ;;
    "clean")
        log_info "Cleaning up..."
        cleanup
        rm -rf "$LOCAL_BUILD_DIR"
        log_success "Cleanup completed"
        ;;
    *)
        main
        ;;
esac
