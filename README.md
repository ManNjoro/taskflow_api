# TaskFlow API

TaskFlow API is a TypeScript-based backend for a task management platform with authentication, role-based access, banner management, and background image processing. It is structured as a capstone-style application that combines REST APIs, PostgreSQL storage, Redis-backed queues, Google OAuth, and Cloudinary media uploads.

## What the project includes

The current implementation supports:

- Email and password registration/login with JWT authentication
- Google OAuth login flow for quick sign-in
- Authenticated task creation, listing, updating, and deletion
- Admin-only task viewing and status updates
- Admin banner management with image upload and deletion
- Cloudinary integration for storing banner images
- Redis and BullMQ-based background jobs for asynchronous image cleanup
- Caching for banner data to improve repeated reads

## Tech stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Redis
- BullMQ
- Cloudinary
- Google OAuth
- Docker Compose
- JWT and bcryptjs
- pino for logging

## Project structure

```text
src/
  app.ts                  # Express app factory
  server.ts               # Server entry point
  config/                 # Environment configuration
  constants/              # Shared constants
  errors/                 # Custom error handling
  lib/                    # JWT, database, Redis, Cloudinary, Google, logger utilities
  middlewares/            # Auth, admin, upload, error, and not-found middleware
  repositories/           # Database access layer
  routes/                 # API route definitions
  services/               # Business logic layer
  queues/                 # BullMQ queue definitions
  workers/                # Background worker processes
  scripts/                # Migration runner
  types/                  # Shared TypeScript types
migrations/               # SQL migration files
```

## Prerequisites

Before running the project, ensure that you have:

- Node.js 18 or newer
- npm
- Docker and Docker Compose
- Redis running locally or via Docker on port 6379

## Environment configuration

Create a `.env` file in the project root based on the values in `.env.example`:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

DATABASE_URL=postgresql://postgres:postgres@localhost:5435/nodejs-capstone
JWT_SECRET=super_secret_jwt
JWT_ACCESS_EXPIRES_IN=30m

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

## Getting started

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

### 5. Start the background worker (for Cloudinary cleanup jobs)

```bash
npm run worker
```

## API endpoints

### Health

- `GET /api/health` — checks whether the API is running

### Authentication

- `POST /api/auth/register` — register a new user with email and password
- `POST /api/auth/login` — sign in and receive an access token
- `GET /api/auth/me` — retrieve the currently authenticated user
- `GET /api/auth/google` — start the Google OAuth flow
- `GET /api/auth/google/callback` — handle the OAuth callback and return a JWT

### User tasks

Protected routes for authenticated users.

- `POST /api/tasks` — create a task
- `GET /api/tasks` — list tasks for the current user
- `GET /api/tasks/:taskId` — fetch one task by ID
- `PATCH /api/tasks/:taskId` — update a task title
- `DELETE /api/tasks/:taskId` — delete a task

### Admin tasks

Admin-only routes.

- `GET /api/admin/tasks` — list tasks with optional search and status filters
- `PATCH /api/admin/tasks/:taskId` — update task status

### Admin banners

Admin-only routes for banner image management.

- `POST /api/admin/banners` — upload a banner image
- `GET /api/admin/banners` — list banner records
- `DELETE /api/admin/banners/:bannerId` — delete a banner and queue Cloudinary cleanup

## Example requests

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

### Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete project documentation"}'
```

### Upload a banner image

```bash
curl -X POST http://localhost:3000/api/admin/banners \
  -H "Authorization: Bearer <access_token>" \
  -F "image=@/path/to/banner.png"
```

## Database and background services

- PostgreSQL is used for users, tasks, and banner records.
- SQL migrations live in the `migrations/` directory.
- Redis and BullMQ handle asynchronous deletion jobs for Cloudinary assets.
- Banner reads use a simple cache layer to reduce repeated database fetches.

## Available scripts

- `npm run dev` — start the API in development mode with hot reload
- `npm run build` — compile the TypeScript project
- `npm run start` — start the production build
- `npm run docker:up` — start PostgreSQL with Docker Compose
- `npm run docker:down` — stop the PostgreSQL container
- `npm run migrate` — run database migrations
- `npm run worker` — start the BullMQ worker for image cleanup jobs

## Notes

This project has evolved from a simple task API into a broader backend service with media handling, OAuth authentication, and background job processing. It is suitable for further expansion into richer admin features, notifications, analytics, and more sophisticated content management workflows.

## License

This project is licensed under the ISC license.
