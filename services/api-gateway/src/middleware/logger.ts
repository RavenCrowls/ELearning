import { Request, Response, NextFunction } from "express";
import morgan from "morgan";

// Custom logger middleware
export const loggerMiddleware = morgan("combined");

// Request timing middleware
export const requestTimer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${
        res.statusCode
      } - ${duration}ms`
    );
  });

  next();
};

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
      path: req.path,
      timestamp: new Date().toISOString(),
    },
  });
};
