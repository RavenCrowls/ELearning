"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quản lý người dùng", href: "/users" },
  { label: "Quản lý bài giảng", href: "/lectures" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AdminSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[260px] bg-white">
      {/* Top */}
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ring-1 ring-slate-200">
            <Image
              src="/images/Avatar.png"
              alt="ELearning Logo"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">ELearning</div>
            <div className="text-xs text-slate-500">Admin Panel</div>
          </div>
        </div>

        {/* subtle separator dot */}
        <div className="h-9 w-px bg-slate-200/70" />
      </div>

      {/* Divider */}
      <div className="px-5">
        <div className="h-px bg-slate-200/70" />
      </div>

      {/* Nav */}
      <nav className="px-3 py-4">

        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span className="font-medium">{item.label}</span>

                 
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="px-5">
          <div className="h-px bg-slate-200/70" />
        </div>

        <div className="px-5 py-4">
          {/* Admin mini card */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
            <Image
              src="/images/noavatar.png"
              alt="Admin Avatar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl"
            />
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-slate-900">
                Admin
              </div>
              <div className="truncate text-[11px] text-slate-500">
                Quản trị hệ thống
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-500">
            © {new Date().getFullYear()} ELearning
          </div>
        </div>
      </div>

      {/* Right border (soft) */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-slate-200/70" />
    </aside>
  );
}
