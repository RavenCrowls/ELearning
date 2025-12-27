import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const clerkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    // Verify the session token with Clerk
    const session = await clerkClient.sessions.verifySession(token, token);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Attach user ID to request for downstream services
    (req as any).userId = session.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized - Authentication failed" });
  }
};

// Optional auth - doesn't fail if no token provided
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const session = await clerkClient.sessions.verifySession(token, token);
      if (session) {
        (req as any).userId = session.userId;
      }
    }
    next();
  } catch (error) {
    console.error("Optional authentication error:", error);
    next();
  }
};
