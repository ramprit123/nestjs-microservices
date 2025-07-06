# Use official Node.js LTS image
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN pnpm run build

# Production image
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=4000

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install only production dependencies
RUN npm install -g pnpm && \
    pnpm install --prod
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/sleeper-api/main.js"]