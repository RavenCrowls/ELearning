import type { CourseStatus } from "./types";

export function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export function toDateNum(s: string) {
  const [y, m, d] = s.split("-").map((x) => parseInt(x, 10));
  return y * 10000 + m * 100 + d;
}

export function formatVND(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " ₫";
}

export function statusBadge(status: CourseStatus) {
  switch (status) {
    case "Published":
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    case "Draft":
      return "bg-slate-100 text-slate-700";
    case "Archived":
      return "bg-slate-100 text-slate-700";
  }
}

export function tagChip() {
  return "bg-white text-slate-700 ring-1 ring-slate-200";
}
