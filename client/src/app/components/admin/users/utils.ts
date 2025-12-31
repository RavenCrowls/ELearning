import type { UserRole, UserStatus } from "./types";

export function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export function toDateNum(s: string) {
  const [y, m, d] = s.split("-").map((x) => parseInt(x, 10));
  return y * 10000 + m * 100 + d;
}

export function statusBadge(status: UserStatus) {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700";
    case "Locked":
      return "bg-red-50 text-red-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
  }
}

export function roleChip(_role: UserRole) {
  return "bg-white text-slate-700 ring-1 ring-slate-200";
}

export function exportUsersToCSV(rows: Array<Record<string, string>>) {
  const header = Object.keys(rows[0] ?? {}).join(",");
  const body = rows.map((r) => Object.values(r).join(",")).join("\n");
  const csv = [header, body].filter(Boolean).join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.csv";
  a.click();
  URL.revokeObjectURL(url);
}
