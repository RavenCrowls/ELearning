import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { serviceConfig } from "../config/services";

// Helper to create proxy with common options
const createServiceProxy = (
  target: string,
  pathRewrite?: any
): RequestHandler => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: pathRewrite || {},
    onProxyReq: (proxyReq, req: any) => {
      // Forward user ID from auth middleware to downstream services
      if (req.userId) {
        proxyReq.setHeader("X-User-Id", req.userId);
      }
      console.log(`Proxying ${req.method} ${req.path} to ${target}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received ${proxyRes.statusCode} from ${target}`);
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(502).json({
        error: "Bad Gateway",
        message: "The service is temporarily unavailable",
        service: target,
      });
    },
  });
};

// User service routes
export const userServiceProxy = createServiceProxy(serviceConfig.user.url, {
  "^/api/users": "/api/users",
});

// Course service routes
export const courseServiceProxy = createServiceProxy(serviceConfig.course.url, {
  "^/api/courses": "/api/courses",
});

// Category service routes
export const categoryServiceProxy = createServiceProxy(
  serviceConfig.category.url,
  { "^/api/categories": "/api/categories" }
);

// Cart service routes
export const cartServiceProxy = createServiceProxy(serviceConfig.cart.url, {
  "^/api/cart": "/api/cart",
});

// Enrollment service routes
export const enrollmentServiceProxy = createServiceProxy(
  serviceConfig.enrollment.url,
  { "^/api/enrollments": "/api/enrollments" }
);

// Lecture service routes
export const lectureServiceProxy = createServiceProxy(
  serviceConfig.lecture.url,
  { "^/api/lectures": "/api/lectures" }
);

// Video service routes
export const videoServiceProxy = createServiceProxy(serviceConfig.video.url, {
  "^/api/videos": "/api/videos",
});

// Payment service routes
export const paymentServiceProxy = createServiceProxy(
  serviceConfig.payment.url,
  { "^/api/payments": "/api/payments" }
);

// Publishment service routes
export const publishmentServiceProxy = createServiceProxy(
  serviceConfig.publishment.url,
  { "^/api/publishments": "/api/publishments" }
);

// Role service routes
export const roleServiceProxy = createServiceProxy(serviceConfig.role.url, {
  "^/api/roles": "/api/roles",
});

// File upload service routes
export const fileUploadServiceProxy = createServiceProxy(
  serviceConfig.fileUpload.url,
  { "^/api/upload": "/api/upload" }
);
