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
