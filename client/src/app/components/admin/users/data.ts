import type { User } from "./types";

export const SEED_USERS: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
    createdAt: "2025-12-01",
    lastLogin: "2025-12-31",
  },
  {
    id: "u2",
    name: "Huy Phạm Nhật",
    email: "huy@example.com",
    role: "Instructor",
    status: "Locked",
    createdAt: "2025-11-18",
    lastLogin: "2025-12-20",
  },
];
