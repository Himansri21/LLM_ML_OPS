# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the frontend
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy server logic and build artifacts from build stage
COPY server.js ./
COPY --from=build /app/dist ./dist

# Expose the unified port
EXPOSE 3001

# Start the unified server
CMD ["node", "server.js"]
