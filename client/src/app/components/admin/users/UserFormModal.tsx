"use client";

import { useState } from "react";
import Modal from "./Modal";
import type { User, UserRole, UserStatus } from "./types";

export default function UserFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial: User | null;
  onClose: () => void;
  onSubmit: (payload: Pick<User, "name" | "email" | "role" | "status">) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<UserRole>(initial?.role ?? "Student");
  const [status, setStatus] = useState<UserStatus>(initial?.status ?? "Active");
  const [error, setError] = useState<string>("");

  function validate() {
    if (!name.trim()) return "Vui lòng nhập họ tên.";
    if (!email.trim()) return "Vui lòng nhập email.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Email không hợp lệ.";
    return "";
  }

  return (
    <Modal title={initial ? "Sửa người dùng" : "Tạo người dùng"} onClose={onClose}>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-700">Họ tên</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Nhập họ tên..."
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="name@example.com"
            disabled={!!initial}
          />
          {initial && (
            <div className="mt-1 text-[11px] text-slate-500">
              Email bị khóa sửa để tránh trùng dữ liệu.
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Vai trò</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Student">Học viên</option>
              <option value="Instructor">Giảng viên</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as UserStatus)}
              className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Active">Hoạt động</option>
              <option value="Locked">Bị khóa</option>
              <option value="Pending">Chờ xác minh</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          onClick={onClose}
          type="button"
        >
          Hủy
        </button>
        <button
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          type="button"
          onClick={() => {
            const err = validate();
            if (err) return setError(err);
            setError("");
            onSubmit({ name: name.trim(), email: email.trim(), role, status });
          }}
        >
          Lưu
        </button>
      </div>
    </Modal>
  );
}
