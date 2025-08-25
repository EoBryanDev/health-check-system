# Health Check System Frontend
## Overview
This project is the frontend for a health check system, developed in Next.js with TypeScript and Tailwind CSS. It provides a user interface for monitoring services and jobs, allowing users to create groups, users, jobs, services, and view logs.

## Folder structure
the project structure follows best practices for separation of concerns and maintainability. See the summary of the main structure:

```
front/
├── src/
│   ├── public/           # Static assets (images, fonts, etc.)
│   ├── app/              # Main application files
|   |   ├── api/          # API route handlers
│   ├── components/       # Reusable UI components
|   ├── dto/              # Data Transfer Objects
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces
|   ├── pages/            # Next.js pages
|   ├── providers/        # Global providers
|   ├── schemas/          # Validation schemas (e.g., Zod)
│   ├── context/          # React context for state management
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions and helpers
│   ├── middleware.ts     # Middleware for handling requests
│   ├── next.config.js    # Next.js configuration
│   ├── tailwind.config.js# Tailwind CSS configuration
│   ├── tsconfig.json     # TypeScript configuration
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
```

### Main Folders Overview
- **src/app/(private)**: Contains private routes that require authentication.
- **src/app/(public)**: Contains public routes that do not require authentication.
- **src/api/**: API route handlers for Next.js.

## How to Run the Application

### Prerequisites
- Node.js >= 20
- pnpm
- Next.js >= 15

### Running Locally
1. Install dependencies:
	```bash
	pnpm install
	```
2. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. Example:
   ```
    PORT=3000
    NEXT_PUBLIC_WS=http://localhost:80
    JWT_SECRET=your_jwt_secret
   ```
3. Start the serve in dev mode
	```bash
	pnpm dev
	```
