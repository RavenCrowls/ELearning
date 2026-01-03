import { Request, Response, NextFunction } from "express";
import { clerkClient, verifyToken } from "@clerk/clerk-sdk-node";

export const clerkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.error("No authorization header provided");
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      console.error("Token is empty after removing Bearer prefix");
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid token format" });
    }

    console.log("Attempting to verify token:", token.substring(0, 20) + "...");

    // Verify the JWT session token with Clerk
    // Extract the issuer from your Clerk publishable key (unique-mustang-33.clerk.accounts.dev)
    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
      issuer: (iss) => iss.startsWith("https://") && iss.includes("clerk.accounts.dev"),
    });

    if (!decoded || !decoded.sub) {
      console.error("Token verification failed - invalid token");
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    console.log("Token verified successfully for user:", decoded.sub);

    // Attach user ID to request for downstream services
    (req as any).userId = decoded.sub;
    next();
  } catch (error: any) {
    console.error("Authentication error:", error.message || error);
    return res
      .status(401)
      .json({
        error: "Unauthorized - Authentication failed",
        details: error.message,
      });
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
