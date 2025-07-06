# Use official Node.js LTS image
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install all dependencies (including devDependencies for development)
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 4001

# Development command with hot reload
CMD ["pnpm", "run", "start:dev", "auth"]

# Production image
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=4001

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and only production dependencies
RUN npm install -g pnpm && \
    pnpm install --prod

# Copy source code and build
COPY . .
RUN pnpm run build

# Expose the port
EXPOSE 4001

CMD ["node", "dist/apps/auth/main.js"]