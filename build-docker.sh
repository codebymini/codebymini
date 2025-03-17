#!/bin/bash

# Set variables
IMAGE_NAME="codebymini/space-invaders"
PLATFORM="linux/amd64"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print step information
print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Function to print success message
print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Function to print warning message
print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to print error message
print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Print build information
print_step "Starting build process for ${IMAGE_NAME}"
print_step "Target platform: ${PLATFORM}"
print_step "Current directory: $(pwd)"
print_step "Node version: $(node -v)"
print_step "NPM version: $(npm -v)"
print_step "Docker version: $(docker -v)"

# Generate favicons
print_step "Generating favicons..."
if pnpm favicons; then
    print_success "Favicons generated successfully"
else
    print_error "Failed to generate favicons"
    exit 1
fi

# Install dependencies
print_step "Installing dependencies..."
if pnpm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build React application
print_step "Building React application..."
if pnpm build; then
    print_success "React application built successfully"
else
    print_error "Failed to build React application"
    exit 1
fi


# Build the image
print_step "Building Docker image..."
if docker build --platform $PLATFORM -t $IMAGE_NAME:latest .; then
    print_success "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Push to Docker Hub
print_step "Pushing to Docker Hub..."
if docker push $IMAGE_NAME:latest; then
    print_success "Successfully pushed to Docker Hub"
else
    print_error "Failed to push to Docker Hub"
    exit 1
fi

# Print final success message and image details
echo -e "\n${GREEN}=== Build Completed Successfully ===${NC}"
echo -e "${BLUE}Image Details:${NC}"
echo "Repository: $IMAGE_NAME"
echo "Tag: latest"
echo "Platform: $PLATFORM"
echo "Size: $(docker image inspect $IMAGE_NAME:latest --format='{{.Size}}' | numfmt --to=iec-i --suffix=B)"

# Print deployment instructions
echo -e "\n${BLUE}Deployment Instructions:${NC}"
echo "To pull and run this image:"
echo "docker pull $IMAGE_NAME:latest"
echo "docker run -p 80:80 $IMAGE_NAME:latest" 