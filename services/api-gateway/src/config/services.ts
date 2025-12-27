export const serviceConfig = {
  user: {
    url: process.env.USER_SERVICE_URL || "http://localhost:5000",
    path: "/api/users",
  },
  role: {
    url: process.env.USER_SERVICE_URL || "http://localhost:5000",
    path: "/api/roles",
  },
  course: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/courses",
  },
  lecture: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/lectures",
  },
  video: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/videos",
  },
  enrollment: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/enrollments",
  },
  publishment: {
    url: process.env.COURSE_SERVICE_URL || "http://localhost:5003",
    path: "/api/publishments",
  },
  category: {
    url: process.env.CATEGORY_SERVICE_URL || "http://localhost:5004",
    path: "/api/categories",
  },
  cart: {
    url: process.env.CART_SERVICE_URL || "http://localhost:5008",
    path: "/api/carts",
  },
  payment: {
    url: process.env.CART_SERVICE_URL || "http://localhost:5008",
    path: "/api/payments",
  },
  fileUpload: {
    url: process.env.FILE_UPLOAD_SERVICE_URL || "http://localhost:5010",
    path: "/api/upload",
  },
};
