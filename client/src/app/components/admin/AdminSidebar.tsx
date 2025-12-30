"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quản lý người dùng", href: "/users" },
  { label: "Quản lý bài giảng", href: "/lectures" },
  // optional:
  // { label: "Danh mục", href: "/admin/categories" },
  // { label: "Báo cáo/Thống kê", href: "/admin/reports" },
  // { label: "Cài đặt", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] border-r bg-white">
      <div className="flex h-16 items-center px-5">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-600" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">ELearning</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
        </div>
      </div>

      <nav className="px-3 py-3">
        <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Menu
        </div>

        <ul className="space-y-1">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      active ? "bg-blue-600" : "bg-slate-300",
                    ].join(" ")}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 w-full border-t bg-white p-4">
        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} ELearning
        </div>
      </div>
    </aside>
  );
}
