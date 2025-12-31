"use client";

import type { User } from "./types";
import Modal from "./Modal";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function UserViewModal({
  user,
  onClose,
  onEdit,
}: {
  user: User;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal title="Thông tin người dùng" onClose={onClose}>
      <div className="space-y-3">
        <InfoRow label="Họ tên" value={user.name} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Vai trò" value={user.role} />
        <InfoRow label="Trạng thái" value={user.status} />
        <InfoRow label="Ngày tạo" value={user.createdAt} />
        <InfoRow label="Đăng nhập gần nhất" value={user.lastLogin} />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          onClick={onClose}
          type="button"
        >
          Đóng
        </button>
        <button
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          onClick={onEdit}
          type="button"
        >
          Sửa
        </button>
      </div>
    </Modal>
  );
}
