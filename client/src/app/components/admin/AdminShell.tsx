"use client";

import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="pl-[260px]">
        <AdminTopbar />

        <main className="p-6">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
