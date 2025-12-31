import type { Course } from "./types";

export const SEED_COURSES: Course[] = [
  {
    id: "c1",
    title: "Data Science for Beginners",
    instructor: "John Doe",
    price: 90000,
    rating: 4.5,
    reviews: 600,
    enrolled: 1240,
    status: "Published",
    tags: ["Programming", "Web development", "Mobile development"],
    createdAt: "2025-12-10",
    isVisible: true,
  },
  {
    id: "c2",
    title: "React Fundamentals",
    instructor: "Huy Phạm Nhật",
    price: 200000,
    rating: 3.5,
    reviews: 60,
    enrolled: 310,
    status: "Pending",
    tags: ["Business", "Marketing"],
    createdAt: "2025-12-28",
    isVisible: true,
  },
];
