import rateLimit from "express-rate-limit";

// General rate limiter - 500 requests per 15 minutes (increased for development)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in development for localhost
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    return false;
  },
});

// Strict rate limiter for authentication endpoints - 20 requests per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Upload rate limiter - 50 uploads per hour (increased for development)
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: "Too many upload requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
