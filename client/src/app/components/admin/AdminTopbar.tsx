"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";

export default function AdminTopbar() {
  const [q, setQ] = useState("");

  const placeholder = useMemo(() => "Tìm nhanh user / bài giảng...", []);

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-6">
        {/* Breadcrumb */}
        <div className="min-w-[220px]">
          <Breadcrumbs />
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center">
          <div className="flex w-full max-w-[680px] items-center gap-2 rounded-xl border bg-white px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            type="button"
            title="Thông báo"
          >
            Thông báo
          </button>

          {/* Avatar + dropdown (placeholder) */}
          <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <div className="h-7 w-7 rounded-full bg-slate-200" />
            <div className="text-left leading-tight">
              <div className="text-xs font-semibold text-slate-800">Admin</div>
              <div className="text-[11px] text-slate-500">Quản trị</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
