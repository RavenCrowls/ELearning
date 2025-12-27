# API Gateway

A centralized API Gateway for the E-Learning microservices architecture. This gateway provides a single entry point for all client requests, handling routing, authentication, rate limiting, and request logging.

## Features

- **Request Routing**: Intelligent routing to appropriate microservices
- **Authentication**: Integration with Clerk for secure authentication
- **Rate Limiting**: Protection against abuse with configurable rate limits
- **Request Logging**: Comprehensive logging of all requests
- **Error Handling**: Centralized error handling and user-friendly error responses
- **CORS Support**: Configurable CORS for client applications
- **Security**: Helmet.js for security headers
- **Health Checks**: Health check endpoint for monitoring

## Architecture

The API Gateway proxies requests to the following microservices:

- **User Service** (`/api/users`) - User management and authentication
- **Course Service** (`/api/courses`) - Course CRUD operations
- **Category Service** (`/api/categories`) - Category management
- **Cart Service** (`/api/cart`) - Shopping cart operations
- **Enrollment Service** (`/api/enrollments`) - Course enrollments
- **Lecture Service** (`/api/lectures`) - Lecture management
- **Video Service** (`/api/videos`) - Video content management
- **Payment Service** (`/api/payments`) - Payment processing
- **Publishment Service** (`/api/publishments`) - Content publishing
- **Role Service** (`/api/roles`) - Role and permission management
- **File Upload Service** (`/api/upload`) - File uploads

## Installation

```bash
cd services/api-gateway
npm install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables with your configuration.

## Running the Gateway

### From Root Services Directory (Recommended)

Run all services including the gateway:

```bash
cd services
npm run dev
```

Run only the gateway:

```bash
cd services
npm run dev:gateway
```

Run only backend services (without gateway):

```bash
cd services
npm run dev:services
```

### Individual Service

```bash
cd services/api-gateway
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## API Routes

### Public Routes (No Authentication)

- `GET /health` - Health check endpoint
- `GET /api/categories` - List categories
- `GET /api/courses` - List courses (with optional auth)

### Protected Routes (Authentication Required)

- `/api/users/*` - User operations
- `/api/cart/*` - Cart operations
- `/api/enrollments/*` - Enrollment operations
- `/api/lectures/*` - Lecture operations
- `/api/videos/*` - Video operations
- `/api/publishments/*` - Publishing operations
- `/api/roles/*` - Role operations
- `/api/payments/*` - Payment operations (strict rate limit)
- `/api/upload/*` - File upload operations (upload rate limit)

## Rate Limiting

- **General Endpoints**: 100 requests per 15 minutes
- **Payment Endpoints**: 5 requests per 15 minutes
- **Upload Endpoints**: 10 requests per hour

## Authentication

The gateway uses Clerk for authentication. Include the session token in the Authorization header:

```
Authorization: Bearer <session_token>
```

The gateway verifies the token and forwards the user ID to downstream services via the `X-User-Id` header.

## Error Handling

All errors are returned in a consistent format:

```json
{
  "error": {
    "message": "Error description",
    "status": 500,
    "path": "/api/path",
    "timestamp": "2025-12-27T..."
  }
}
```

## Monitoring

Access the health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-27T...",
  "uptime": 123.456,
  "service": "api-gateway"
}
```

## Development

### Project Structure

```
api-gateway/
├── src/
│   ├── app.ts                    # Main application
│   ├── config/
│   │   └── services.ts           # Service configuration
│   ├── middleware/
│   │   ├── authMiddleware.ts     # Authentication middleware
│   │   ├── logger.ts             # Logging middleware
│   │   └── rateLimiter.ts        # Rate limiting
│   └── routes/
│       └── proxyRoutes.ts        # Proxy route definitions
├── package.json
├── tsconfig.json
└── Dockerfile
```

## License

MIT
