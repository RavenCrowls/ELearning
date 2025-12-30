"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  users: "Quản lý người dùng",
  lectures: "Quản lý bài giảng",
};

export default function Breadcrumbs() {
  const pathname = usePathname() || "";
  const parts = pathname.split("/").filter(Boolean); // e.g. ["admin","users"]

  return (
    <div className="flex items-center gap-2 text-sm">
      {parts.map((p, idx) => {
        const href = "/" + parts.slice(0, idx + 1).join("/");
        const label = LABELS[p] ?? p;

        const isLast = idx === parts.length - 1;

        return (
          <div key={href} className="flex items-center gap-2">
            {idx > 0 && <span className="text-slate-300">/</span>}
            {isLast ? (
              <span className="font-medium text-slate-700">{label}</span>
            ) : (
              <Link href={href} className="text-slate-500 hover:text-slate-700">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
