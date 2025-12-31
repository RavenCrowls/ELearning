"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type NotificationItem = {
  id: string;
  title: string;
  time: string;
};

export default function AdminTopbar() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  // Search state (sync with ?q=)
  const initialQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const placeholder = useMemo(() => "Tìm user / bài giảng...", []);

  // Dropdown state
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const notifications: NotificationItem[] = [
    { id: "1", title: "Duyệt bài giảng: React Fundamentals", time: "Vừa xong" },
    { id: "2", title: "Khoá user: user1@example.com", time: "5 phút trước" },
    { id: "3", title: "Tạo bài giảng: Next.js Mastery", time: "Hôm nay" },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;

      if (notifOpen && notifRef.current && !notifRef.current.contains(t)) {
        setNotifOpen(false);
      }
      if (userOpen && userRef.current && !userRef.current.contains(t)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [notifOpen, userOpen]);

  // Escape: close dropdowns or clear search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;

      if (notifOpen) return setNotifOpen(false);
      if (userOpen) return setUserOpen(false);

      if (q) {
        setQ("");
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.delete("q");
        router.replace(`${pathname}${params.toString() ? `?${params}` : ""}`);
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [notifOpen, userOpen, q, pathname, router, searchParams]);

  function handleSubmit() {
    const value = q.trim();
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      params.delete("q");
      router.replace(`${pathname}${params.toString() ? `?${params}` : ""}`);
      return;
    }

    params.set("q", value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setQ("");
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("q");
    router.replace(`${pathname}${params.toString() ? `?${params}` : ""}`);
    searchRef.current?.focus();
  }

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur">
      <div className="border-b border-slate-200/70">
        <div className="mx-auto flex h-16 w-full max-w-full items-center gap-4 px-6">
          {/* Left: Logo + Brand */}
          <div className="flex min-w-[240px] items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ring-1 ring-slate-200">
              {/* Đổi src theo logo website của bạn */}
              <Image
                src="/images/Avatar.png"
                alt="ELearning"
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">ELearning</div>
            </div>
          </div>

          {/* Middle: Search */}
          <div className="flex flex-1 items-center">
            <div className="flex w-full max-w-[720px] items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-200">

              <input
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              {q.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                  title="Xóa"
                >
                  ×
                </button>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="h-9 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer"
                title="Tìm kiếm"
              >
                Tìm
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setUserOpen(false);
                }}
                className={[
                  "h-10 rounded-2xl bg-white px-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50",
                  notifOpen ? "ring-2 ring-blue-200" : "",
                ].join(" ")}
                title="Thông báo"
                aria-expanded={notifOpen}
                aria-haspopup="menu"
              >
                Thông báo
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 mt-2 w-[340px] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-sm font-semibold text-slate-900">
                      Thông báo
                    </div>
                    <button
                      type="button"
                      className="text-xs text-slate-500 hover:text-slate-900"
                      onClick={() => setNotifOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>

                  <div className="max-h-[320px] overflow-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-slate-500">
                        Không có thông báo.
                      </div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {notifications.map((n) => (
                          <li key={n.id} className="px-4 py-3 hover:bg-slate-50">
                            <div className="text-sm text-slate-800">{n.title}</div>
                            <div className="mt-1 text-xs text-slate-500">{n.time}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="px-4 py-3">
                    <button
                      type="button"
                      className="w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Xem tất cả
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div ref={userRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className={[
                  "flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50",
                  userOpen ? "ring-2 ring-blue-200" : "",
                ].join(" ")}
                title="Tài khoản"
                aria-expanded={userOpen}
                aria-haspopup="menu"
              >
                <Image
                  src="/images/noavatar.png"
                  alt="Avatar"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full ring-1 ring-slate-200"
                />
                <div className="hidden text-left leading-tight sm:block">
                  <div className="text-xs font-semibold text-slate-900">Admin</div>
                  <div className="text-[11px] text-slate-500">Quản trị</div>
                </div>
                <span className="ml-1 hidden text-slate-400 sm:block">▾</span>
              </button>

              {userOpen && (
                <div
                  className="absolute right-0 mt-2 w-[220px] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5"
                  role="menu"
                >
                  <div className="px-4 py-3">
                    <div className="text-sm font-semibold text-slate-900">Admin</div>
                    <div className="mt-1 text-xs text-slate-500">Quản trị hệ thống</div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <ul className="py-2">
                    <li>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => {
                          setUserOpen(false);
                          router.push("/admin/profile");
                        }}
                      >
                        Hồ sơ
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => {
                          setUserOpen(false);
                          router.push("/admin/change-password");
                        }}
                      >
                        Đổi mật khẩu
                      </button>
                    </li>
                  </ul>

                  <div className="h-px bg-slate-100" />

                  <div className="p-2">
                    <button
                      type="button"
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setUserOpen(false);
                        router.push("/sign-in");
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
