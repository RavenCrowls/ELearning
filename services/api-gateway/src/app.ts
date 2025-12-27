import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import {
  loggerMiddleware,
  requestTimer,
  errorHandler,
} from "./middleware/logger";
import {
  generalLimiter,
  authLimiter,
  uploadLimiter,
} from "./middleware/rateLimiter";
import { clerkAuth, optionalAuth } from "./middleware/authMiddleware";
import {
  userServiceProxy,
  courseServiceProxy,
  categoryServiceProxy,
  cartServiceProxy,
  enrollmentServiceProxy,
  lectureServiceProxy,
  videoServiceProxy,
  paymentServiceProxy,
  publishmentServiceProxy,
  roleServiceProxy,
  fileUploadServiceProxy,
} from "./routes/proxyRoutes";

// Load environment variables
dotenv.config({ path: "../../.env" });

const app: Application = express();
const PORT: number = Number(process.env.GATEWAY_PORT) || 4000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Logging middleware
app.use(loggerMiddleware);
app.use(requestTimer);

// Body parsing middleware (for non-proxied routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: "api-gateway",
  });
});

// API routes with appropriate middleware

// Public routes (no authentication required)
app.use("/api/categories", optionalAuth, categoryServiceProxy);
app.use("/api/courses", optionalAuth, courseServiceProxy);

// Protected routes (authentication required)
app.use("/api/users", clerkAuth, userServiceProxy);
app.use("/api/cart", clerkAuth, cartServiceProxy);
app.use("/api/enrollments", clerkAuth, enrollmentServiceProxy);
app.use("/api/lectures", clerkAuth, lectureServiceProxy);
app.use("/api/videos", clerkAuth, videoServiceProxy);
app.use("/api/publishments", clerkAuth, publishmentServiceProxy);
app.use("/api/roles", clerkAuth, roleServiceProxy);

// Payment routes with strict rate limiting
app.use("/api/payments", clerkAuth, authLimiter, paymentServiceProxy);

// File upload routes with upload rate limiting
app.use("/api/upload", clerkAuth, uploadLimiter, fileUploadServiceProxy);
app.use("/api/roles", clerkAuth, roleServiceProxy);

// Payment routes with strict rate limiting
app.use("/api/payments", clerkAuth, authLimiter, paymentServiceProxy);

// File upload routes with upload rate limiting
app.use("/api/upload", clerkAuth, uploadLimiter, fileUploadServiceProxy);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`
        API Gateway is running                 
        Port: ${PORT}                        
        Environment: ${process.env.NODE_ENV || "development"}       
        Time: ${new Date().toLocaleString()}   
    `);
  });
}

export default app;
