export type CourseStatus = "Draft" | "Pending" | "Published" | "Archived";

export type Course = {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  reviews: number;
  enrolled: number;
  status: CourseStatus;
  tags: string[];
  createdAt: string; // YYYY-MM-DD
  isVisible: boolean; // ẩn/hiện
};

export type SortKey = "newest" | "enrolled" | "rating";
