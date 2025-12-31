export type Kpi = { label: string; value: string; note: string };

export type RecentCourse = {
  title: string;
  author: string;
  status: "Published" | "Pending";
  date: string;
};

export const KPIS: Kpi[] = [
  { label: "Tổng người dùng", value: "12,345", note: "+4.2% (7 ngày)" },
  { label: "Người dùng mới", value: "486", note: "7 ngày gần nhất" },
  { label: "Tổng bài giảng", value: "1,128", note: "+12 (tháng)" },
  { label: "Đăng ký/Doanh thu", value: "—", note: "tuỳ hệ thống" },
];

export const RECENT_COURSES: RecentCourse[] = [
  {
    title: "Data Science for Beginners",
    author: "John Doe",
    status: "Published",
    date: "2025-12-31",
  },
  {
    title: "React Fundamentals",
    author: "Huy Phạm Nhật",
    status: "Pending",
    date: "2025-12-30",
  },
];

export const ACTIVITIES: string[] = [
  "Khoá user: user1@example.com",
  "Duyệt bài giảng: React Fundamentals",
  "Tạo bài giảng: Next.js Mastery",
];
