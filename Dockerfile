# Build stage
FROM --platform=linux/amd64 node:18-alpine AS build

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm build

# Production stage
FROM --platform=linux/amd64 nginx:1.24.0-alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx pid directory
RUN mkdir -p /var/run/nginx

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
