# TaskFlow API

TaskFlow API is a Node.js and TypeScript backend service for managing user tasks with authentication, role-based access, and admin task oversight. The project is designed as a practical capstone backend with a clean layered architecture, PostgreSQL persistence, and RESTful endpoints.

## Project Overview

This application provides:

- User registration and login with JWT-based authentication
- Secure task creation, retrieval, update, and deletion for authenticated users
- Admin access to view and manage tasks across users
- PostgreSQL-backed data storage with migration support
- Structured error handling and logging for API reliability

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Docker Compose
- JWT for authentication
- bcryptjs for password hashing
- pino for logging

## Project Structure

```text
src/
  app.ts
  server.ts
  config/
  constants/
  errors/
  lib/
  middlewares/
  repositories/
  routes/
  services/
  scripts/
  types/
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js 18+ or newer
- Docker and Docker Compose
- npm

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=postgresql://postgres:postgres@localhost:5435/nodejs-capstone
JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=15m
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL with Docker

```bash
npm run docker:up
```

### 3. Run database migrations

```bash
npm run migrate
```

### 4. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

### Health

- `GET /api/health` — checks API health status

### Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive an access token
- `GET /api/auth/me` — fetch the authenticated user profile

### User Tasks

All task routes require authentication.

- `POST /api/tasks` — create a task
- `GET /api/tasks` — list tasks for the authenticated user
- `GET /api/tasks/:taskId` — retrieve a specific task
- `PATCH /api/tasks/:taskId` — update a task title
- `DELETE /api/tasks/:taskId` — delete a task

### Admin Tasks

Admin-only routes.

- `GET /api/admin/tasks` — list tasks with optional query filters
- `PATCH /api/admin/tasks/:taskId` — update a task status

## Example Request

### Register a user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Database

The project uses PostgreSQL with SQL migration files stored in the `migrations/` directory. The Docker setup exposes PostgreSQL on port `5435`.

## Scripts

- `npm run dev` — start the development server with hot reload
- `npm run build` — compile the TypeScript project
- `npm run start` — run the built application
- `npm run docker:up` — start PostgreSQL in Docker
- `npm run docker:down` — stop and remove Docker containers
- `npm run migrate` — run database migrations

## Notes

This repository is currently structured as a backend foundation for a task-management application and can be extended with features such as:

- task assignment and priorities
- comments and notifications
- role-based dashboards
- improved admin reporting

## License

This project is licensed under the ISC license.
