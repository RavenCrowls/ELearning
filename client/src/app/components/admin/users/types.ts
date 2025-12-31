export type UserRole = "Student" | "Instructor" | "Admin";
export type UserStatus = "Active" | "Locked" | "Pending";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // YYYY-MM-DD
  lastLogin: string; // YYYY-MM-DD
};

export type SortKey =
  | "createdAt_desc"
  | "createdAt_asc"
  | "lastLogin_desc"
  | "name_asc";
