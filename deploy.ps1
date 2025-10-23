# PowerShell Deploy Script cho inkverse.online
# Build ở máy local trước, sau đó push lên EC2

param(
    [string]$Action = "deploy",
    [string]$EC2Host = "your-ec2-ip",
    [string]$EC2User = "ec2-user"
)

# Colors
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Reset = "`e[0m"

function Write-Info {
    param([string]$Message)
    Write-Host "${Blue}[INFO]${Reset} $Message"
}

function Write-Success {
    param([string]$Message)
    Write-Host "${Green}[SUCCESS]${Reset} $Message"
}

function Write-Warning {
    param([string]$Message)
    Write-Host "${Yellow}[WARNING]${Reset} $Message"
}

function Write-Error {
    param([string]$Message)
    Write-Host "${Red}[ERROR]${Reset} $Message"
}

# Configuration
$ProjectName = "inkverse"
$EC2Path = "/home/$EC2User/inkverse"
$LocalBuildDir = "./build"
$BackupDir = "./backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

# Check dependencies
function Test-Dependencies {
    Write-Info "Checking dependencies..."
    
    if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not installed"
        exit 1
    }
    
    if (!(Get-Command ssh -ErrorAction SilentlyContinue)) {
        Write-Error "ssh is not installed"
        exit 1
    }
    
    Write-Success "All dependencies are available"
}

# Build React frontend
function Build-Frontend {
    Write-Info "Building React frontend..."
    
    Set-Location client
    
    # Install dependencies if needed
    if (!(Test-Path "node_modules")) {
        Write-Info "Installing frontend dependencies..."
        npm install
    }
    
    # Build production
    Write-Info "Building production bundle..."
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Frontend build completed"
    } else {
        Write-Error "Frontend build failed"
        exit 1
    }
    
    Set-Location ..
}

# Prepare server files
function Prepare-Server {
    Write-Info "Preparing server files..."
    
    # Create backup of current build
    if (Test-Path $LocalBuildDir) {
        Write-Info "Creating backup..."
        Copy-Item -Path $LocalBuildDir -Destination $BackupDir -Recurse
        Write-Success "Backup created: $BackupDir"
    }
    
    # Copy server files to build directory
    Write-Info "Copying server files..."
    New-Item -ItemType Directory -Path "$LocalBuildDir/server" -Force | Out-Null
    
    # Copy essential server files
    Copy-Item -Path "server/src" -Destination "$LocalBuildDir/server/" -Recurse
    Copy-Item -Path "server/package.json" -Destination "$LocalBuildDir/server/"
    Copy-Item -Path "server/package-lock.json" -Destination "$LocalBuildDir/server/"
    
    # Copy client build
    Copy-Item -Path "client/build/*" -Destination "$LocalBuildDir/" -Recurse
    
    Write-Success "Server files prepared"
}

# Deploy to EC2
function Deploy-ToEC2 {
    Write-Info "Deploying to EC2..."
    
    # Create deployment package
    Write-Info "Creating deployment package..."
    Compress-Archive -Path "$LocalBuildDir/*" -DestinationPath "$ProjectName-deploy.zip" -Force
    
    # Upload to EC2
    Write-Info "Uploading to EC2..."
    scp "$ProjectName-deploy.zip" "${EC2User}@${EC2Host}:/tmp/"
    
    # Deploy on EC2
    Write-Info "Deploying on EC2 server..."
    $deployScript = @"
set -e
echo "🔄 Starting deployment on EC2..."

# Backup current deployment
if [ -d "$EC2Path" ]; then
    echo "📦 Creating backup..."
    sudo cp -r "$EC2Path" "${EC2Path}-backup-`$(date +%Y%m%d-%H%M%S)"
fi

# Stop services
echo "⏹️ Stopping services..."
sudo systemctl stop $ProjectName || true
sudo systemctl stop nginx || true

# Extract new deployment
echo "📂 Extracting deployment..."
cd /tmp
sudo rm -rf "$EC2Path"
sudo mkdir -p "$EC2Path"
sudo unzip -o "$ProjectName-deploy.zip" -d "$EC2Path"

# Install server dependencies
echo "📥 Installing server dependencies..."
cd "$EC2Path/server"
sudo npm install --production

# Set permissions
echo "🔐 Setting permissions..."
sudo chown -R ${EC2User}:${EC2User} "$EC2Path"
sudo chmod -R 755 "$EC2Path"

# Start services
echo "▶️ Starting services..."
sudo systemctl start $ProjectName
sudo systemctl start nginx

# Check service status
echo "🔍 Checking service status..."
sudo systemctl status $ProjectName --no-pager -l

# Cleanup
echo "🧹 Cleaning up..."
rm -f "/tmp/$ProjectName-deploy.zip"

echo "✅ Deployment completed successfully!"
"@
    
    $deployScript | ssh "${EC2User}@${EC2Host}" bash
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Deployment to EC2 completed"
    } else {
        Write-Error "Deployment to EC2 failed"
        exit 1
    }
}

# Cleanup local files
function Remove-LocalFiles {
    Write-Info "Cleaning up local files..."
    
    Remove-Item -Path "$ProjectName-deploy.zip" -Force -ErrorAction SilentlyContinue
    
    Write-Success "Cleanup completed"
}

# Test deployment
function Test-Deployment {
    Write-Info "Testing deployment..."
    
    # Test API endpoint
    Write-Info "Testing API endpoint..."
    try {
        $response = Invoke-WebRequest -Uri "http://${EC2Host}/api/test" -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Success "API endpoint is working"
        }
    } catch {
        Write-Warning "API endpoint test failed"
    }
    
    # Test webhook endpoint
    Write-Info "Testing webhook endpoint..."
    try {
        $response = Invoke-WebRequest -Uri "http://${EC2Host}/api/webhooks/test" -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Success "Webhook endpoint is working"
        }
    } catch {
        Write-Warning "Webhook endpoint test failed"
    }
    
    Write-Success "Deployment testing completed"
}

# Main deployment function
function Start-Deployment {
    Write-Host "🚀 Starting deployment for $ProjectName"
    Write-Host "=================================="
    
    # Check if we're in the right directory
    if (!(Test-Path "package.json") -or !(Test-Path "client") -or !(Test-Path "server")) {
        Write-Error "Please run this script from the project root directory"
        exit 1
    }
    
    # Check configuration
    if ($EC2Host -eq "your-ec2-ip") {
        Write-Error "Please update EC2Host parameter with your actual EC2 IP"
        Write-Error "Example: .\deploy.ps1 -EC2Host '1.2.3.4'"
        exit 1
    }
    
    # Run deployment steps
    Test-Dependencies
    Build-Frontend
    Prepare-Server
    Deploy-ToEC2
    Remove-LocalFiles
    Test-Deployment
    
    Write-Host ""
    Write-Host "🎉 Deployment completed successfully!"
    Write-Host "🌐 Website: http://${EC2Host}"
    Write-Host "📊 Admin: http://${EC2Host}/admin"
    Write-Host "🔔 Webhooks: http://${EC2Host}/admin/webhooks"
    Write-Host ""
}

# Handle script actions
switch ($Action.ToLower()) {
    "build" {
        Write-Info "Building only..."
        Test-Dependencies
        Build-Frontend
        Write-Success "Build completed"
    }
    "deploy" {
        Write-Info "Deploying only..."
        Prepare-Server
        Deploy-ToEC2
        Remove-LocalFiles
        Test-Deployment
        Write-Success "Deploy completed"
    }
    "test" {
        Write-Info "Testing deployment..."
        Test-Deployment
    }
    "clean" {
        Write-Info "Cleaning up..."
        Remove-LocalFiles
        if (Test-Path $LocalBuildDir) {
            Remove-Item -Path $LocalBuildDir -Recurse -Force
        }
        Write-Success "Cleanup completed"
    }
    default {
        Start-Deployment
    }
}
