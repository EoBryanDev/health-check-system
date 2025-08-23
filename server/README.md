# Health Check System Backend

## Overview
This project is a backend for monitoring services and jobs, developed in Node.js with TypeScript, Drizzle ORM, Redis, and a modular architecture. It allows creating groups, users, jobs, services, and logs, as well as executing scheduled jobs via cron.

## Folder structure
The project structure follows best practices for separation of domains, infrastructure, and tests. See the summary of the main structure:

```
server/
├── src/
│   ├── domain/           # Business logic, entities, interfaces, helpers, services
│   ├── infrastructure/   # Technical implementations: database, DTOs, HTTP, jobs, middlewares, repositories
│   ├── server.ts         # Server entry point
│
├── docker-compose.yml    # Container orchestration
├── Dockerfile            # Docker application build
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
```

### Main Folders Overview
- **domain/**: Contains business entities (e.g., User, Job), interfaces, helpers, and domain services (e.g., encryption, JWT, caching).
- **infrastructure/db/**: Database configuration, Drizzle schemas, and migrations.
- **infrastructure/dto/**:  Data Transfer Objects for API input and output.
- **infrastructure/http/**: Controllers, routes, middlewares, and factories for the Express server.
- **infrastructure/jobs/**: Scheduled job runner using node-cron.
- **infrastructure/repository/**: Repository implementations (InMemory, DrizzlePostgre).

## How to Run the Application

### Prerequisites
- Node.js >= 20
- pnpm
- Docker (optional, recommended for production environments)

### Running Locally
1. Install dependencies:
	```bash
	pnpm install
	```
2. Set up the database and environment variables:
	- Edit the `.env` file as needed.
	- Run migrations:
	  ```bash
	  pnpm db:migrate
	  ```
3. Start the serve in dev mode
	```bash
	pnpm dev
	```

4. Setup build (optional)
    ```bash
	pnpm build
    ``` 

5. Start the server builded:
    ```bash
    pnpm start
    ```

### Running with Docker
1. Edit the `.env` file as needed
2. Build the image:
	```bash
	docker build -t health-check-system-server .
	```
3. Start the containers:
	```bash
	docker-compose up
	```

## Useful Scripts
- `pnpm lint`        # Runs the linter
- `pnpm lint:fix`    # Automatically fixes linting issues
- `pnpm test`        # Runs tests
- `pnpm db:migrate`  # Applies database migrations

