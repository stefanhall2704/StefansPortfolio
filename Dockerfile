# Use a stable LTS version for compatibility and security
FROM node:20-buster AS build

# Set working directory
WORKDIR /code

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies efficiently with caching
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
