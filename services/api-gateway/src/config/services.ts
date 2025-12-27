export const serviceConfig = {
  user: {
    url: process.env.USER_SERVICE_URL || "http://localhost:5000",
    path: "/api/users",
  },
  role: {
    url: process.env.ROLE_SERVICE_URL || "http://localhost:5001",
    path: "/api/roles",
  },
  enrollment: {
    url: process.env.ENROLLMENT_SERVICE_URL || "http://localhost:5002",
    path: "/api/enrollments",
  },
  course: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/courses",
  },
  category: {
    url: process.env.CATEGORY_SERVICE_URL || "http://localhost:5004",
    path: "/api/categories",
  },
  publishment: {
    url: process.env.PUBLISHMENT_SERVICE_URL || "http://localhost:5005",
    path: "/api/publishments",
  },
  lecture: {
    url: process.env.LECTURE_SERVICE_URL || "http://localhost:5006",
    path: "/api/lectures",
  },
  video: {
    url: process.env.VIDEO_SERVICE_URL || "http://localhost:5007",
    path: "/api/videos",
  },
  cart: {
    url: process.env.CART_SERVICE_URL || "http://localhost:5008",
    path: "/api/cart",
  },
  payment: {
    url: process.env.PAYMENT_SERVICE_URL || "http://localhost:5009",
    path: "/api/payments",
  },
  fileUpload: {
    url: process.env.FILE_UPLOAD_SERVICE_URL || "http://localhost:5010",
    path: "/api/upload",
  },
};
