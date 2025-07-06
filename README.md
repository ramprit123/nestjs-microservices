# Reservation Microservice

This project is a Reservation Microservice built with [NestJS](https://nestjs.com/) and designed for scalable, distributed systems.

## Features

- Create, update, and cancel reservations
- Retrieve reservation details
- Microservice architecture (supports message brokers like RabbitMQ, Kafka, etc.)
- RESTful API endpoints
- Validation and error handling

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Docker (optional, for running message brokers)

### Installation

```bash
git clone https://github.com/your-org/reservation-microservice.git
cd reservation-microservice
npm install
```

### Running the Service

```bash
# Start the microservice
npm run start:dev
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
BROKER_URL=amqp://localhost
```

## API Endpoints

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/reservations`     | Create a reservation  |
| GET    | `/reservations/:id` | Get reservation by ID |
| PATCH  | `/reservations/:id` | Update a reservation  |
| DELETE | `/reservations/:id` | Cancel a reservation  |

## Microservice Communication

Supports message-based communication via brokers (e.g., RabbitMQ, Kafka).

## Folder Structure

```
src/
  reservations/
    reservations.controller.ts
    reservations.service.ts
    reservations.module.ts
  main.ts
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

## License

MIT

```
# Run in development mode with hot reload
pnpm run start:dev sleeper-api

# Run in debug mode
pnpm run start:debug sleeper-api

# Run in production mode
pnpm run start:prod sleeper-api

# Run with environment variables
docker run -p 4000:4000 -e MONGODB_URI="your-mongodb-connection-string" sleeper-api

# Run in detached mode (background)
docker run -d -p 4000:4000 -e MONGODB_URI="your-mongodb-connection-string" sleeper-api

# Run with volume mounting for development
docker run -p 4000:4000 -v $(pwd):/usr/src/app -e MONGODB_URI="your-mongodb-connection-string" sleeper-api
```

## Docker Commands

### Build the Docker image:

```bash
docker build -f apps/sleeper-api/Dockerfile -t sleeper-api .
```

### Run the Docker container:

**Option 1: With environment file (Recommended)**

```bash
docker run -p 4000:4000 --env-file apps/sleeper-api/.env sleeper-api
```

**Option 2: With inline environment variables**

```bash
docker run -p 4000:4000 -e MONGODB_URI="mongodb+srv://rampritfreelancer:hSHSxVNesprA0Ro9@cluster0.ofa493n.mongodb.net/reservation" sleeper-api
```

**Option 3: Run in detached mode (background)**

```bash
docker run -d -p 4000:4000 --env-file apps/sleeper-api/.env sleeper-api
```

### Verify the API is running:

```bash
curl http://localhost:4000
```

**Note**: The API will return a 404 for the root path `/` - this is expected. Use the specific API endpoints for your service.

## Docker Compose

Docker Compose provides an easier way to manage your application and its dependencies.

### Production Environment

**Build and start the services:**

```bash
docker-compose up --build
```

**Run in detached mode (background):**

```bash
docker-compose up -d --build
```

**Stop the services:**

```bash
docker-compose down
```

### Development Environment

For development with hot reload and local MongoDB:

**Start development services:**

```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Run in detached mode:**

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

**Stop development services:**

```bash
docker-compose -f docker-compose.dev.yml down
```

## Docker Development Setup

### Hot Reload Development

For development with hot reload, use the development Docker Compose file:

```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

This setup provides:

- **Hot reload**: Changes to source code are automatically reflected
- **Volume mounting**: Source code is mounted from host to container
- **Development dependencies**: All dev dependencies are installed
- **Debug mode**: Ready for debugging with `--inspect`

### Production Build

For production deployment:

```bash
# Build and run production containers
docker-compose up --build
```

### Docker Commands

```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f sleeper-api

# Stop services
docker-compose -f docker-compose.dev.yml down

# Rebuild containers
docker-compose -f docker-compose.dev.yml up --build --force-recreate
```

### Available Services

- **sleeper-api**: Your NestJS microservice (port 4000)
- **mongodb**: MongoDB database (port 27017, only in dev mode)

### Environment Variables

Make sure your `apps/sleeper-api/.env` file contains:

```env
PORT=4000
NODE_ENV=development
DEBUG=sleeper-api:*
MONGODB_URI=mongodb+srv://rampritfreelancer:hSHSxVNesprA0Ro9@cluster0.ofa493n.mongodb.net/reservation
```

```
docker-compose -f docker-compose.dev.yml up --build
```
