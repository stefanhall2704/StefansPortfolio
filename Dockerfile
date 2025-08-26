# Use a stable LTS version for compatibility and security
FROM node:18-bullseye

# Set working directory
WORKDIR /app
ENV NODE_ENV=production

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json  ./

# Install dependencies efficiently with caching
RUN npm config set engine-strict=false && npm ci --omit=dev --legacy-peer-deps

# Copy the rest of the application
COPY . .

USER node
# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
