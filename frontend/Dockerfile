# ---- Build Stage ----
# This stage builds the React application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
# Use npm ci for clean, reproducible builds in CI/CD environments
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
# This creates an optimized 'dist' folder
RUN npm run build

# ---- Production Stage ----
# This stage serves the built application using Nginx
FROM nginx:1.25-alpine

# Copy the static assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]