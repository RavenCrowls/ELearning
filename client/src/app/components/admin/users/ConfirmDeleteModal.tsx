"use client";

import Modal from "./Modal";

export default function ConfirmDeleteModal({
  count,
  onCancel,
  onConfirm,
}: {
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal title="Xác nhận xóa" onClose={onCancel}>
      <p className="text-sm text-slate-600">
        Bạn chắc chắn muốn xóa{" "}
        <span className="font-semibold text-slate-900">{count}</span> người dùng?
        Hành động này không thể hoàn tác.
      </p>

      <div className="mt-6 flex justify-end gap-2">
        <button
          className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          onClick={onCancel}
          type="button"
        >
          Hủy
        </button>
        <button
          className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
          onClick={onConfirm}
          type="button"
        >
          Xóa
        </button>
      </div>
    </Modal>
  );
}
