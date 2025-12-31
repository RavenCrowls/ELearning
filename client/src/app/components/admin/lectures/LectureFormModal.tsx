"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import type { Course, CourseStatus } from "./types";

export default function LectureFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial: Course | null;
  onClose: () => void;
  onSubmit: (payload: Pick<Course, "title" | "instructor" | "price" | "status" | "tags" | "isVisible">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [instructor, setInstructor] = useState(initial?.instructor ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [status, setStatus] = useState<CourseStatus>(initial?.status ?? "Draft");
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [isVisible, setIsVisible] = useState(initial?.isVisible ?? true);
  const [error, setError] = useState("");

  const tags = useMemo(
    () =>
      tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [tagsText]
  );

  function validate() {
    if (!title.trim()) return "Vui lòng nhập tiêu đề.";
    if (!instructor.trim()) return "Vui lòng nhập giảng viên.";
    if (Number.isNaN(price) || price < 0) return "Giá không hợp lệ.";
    return "";
  }

  return (
    <Modal title={initial ? "Sửa bài giảng" : "Tạo bài giảng"} onClose={onClose}>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-700">Tiêu đề</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Nhập tiêu đề..."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Giảng viên</label>
            <input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Tên giảng viên..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Giá (VND)</label>
            <input
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value || "0", 10))}
              type="number"
              min={0}
              className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-700">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CourseStatus)}
              className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <label className="flex w-full items-center justify-between rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
              <span className="text-sm text-slate-700">Hiển thị</span>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700">Tags (ngăn cách bằng dấu phẩy)</label>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Programming, Web development, ..."
          />
          <div className="mt-2 text-[11px] text-slate-500">
            Preview: {tags.length > 0 ? tags.join(" • ") : "—"}
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
            onSubmit({
              title: title.trim(),
              instructor: instructor.trim(),
              price: Number(price) || 0,
              status,
              tags,
              isVisible,
            });
          }}
        >
          Lưu
        </button>
      </div>
    </Modal>
  );
}
