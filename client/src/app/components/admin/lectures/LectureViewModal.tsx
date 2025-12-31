"use client";

import Modal from "./Modal";
import type { Course } from "./types";
import { formatVND, statusBadge, tagChip } from "./utils";

export default function LectureViewModal({
  course,
  onClose,
  onEdit,
}: {
  course: Course;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal title="Chi tiết bài giảng" onClose={onClose}>
      <div className="space-y-3">
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">{course.title}</div>
          <div className="mt-1 text-xs text-slate-500">{course.instructor}</div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusBadge(course.status)}`}>
              {course.status}
            </span>
            <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
              {course.isVisible ? "Hiển thị" : "Đang ẩn"}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {course.tags.map((t) => (
              <span key={t} className={`inline-flex rounded-full px-2 py-1 text-xs ${tagChip()}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Info label="Giá" value={formatVND(course.price)} />
          <Info label="Rating" value={`${course.rating} (${course.reviews})`} />
          <Info label="Học viên" value={`${course.enrolled}`} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Info label="Ngày tạo" value={course.createdAt} />
          <Info label="ID" value={course.id} />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          className="rounded-2xl bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 cursor-pointer"
          onClick={onClose}
          type="button"
        >
          Đóng
        </button>
        <button
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
          onClick={onEdit}
          type="button"
        >
          Sửa
        </button>
      </div>
    </Modal>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="text-xs font-semibold text-slate-600">{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}
