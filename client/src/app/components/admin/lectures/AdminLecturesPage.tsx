"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Course, CourseStatus, SortKey } from "./types";
import { SEED_COURSES } from "./data";
import { cn, formatVND, statusBadge, tagChip, toDateNum } from "./utils";

import LectureFormModal from "./LectureFormModal";
import LectureViewModal from "./LectureViewModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function AdminLecturesPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  // Sync q from topbar (?q=)
  const urlQ = (searchParams.get("q") ?? "").trim();
  const [courses, setCourses] = useState<Course[]>(SEED_COURSES);
  const [searchLocal, setSearchLocal] = useState(urlQ);

  const [statusFilter, setStatusFilter] = useState<CourseStatus | "">("");
  const [sort, setSort] = useState<SortKey>("newest");

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // modals
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);

  const [openView, setOpenView] = useState(false);
  const [viewing, setViewing] = useState<Course | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; ids: string[] }>({
    open: false,
    ids: [],
  });

  useEffect(() => {
    setSearchLocal(urlQ);
    setPage(1);
  }, [urlQ]);

  function setUrlQuery(nextQ: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const v = nextQ.trim();
    if (!v) params.delete("q");
    else params.set("q", v);
    router.replace(`${pathname}${params.toString() ? `?${params}` : ""}`);
  }

  const filtered = useMemo(() => {
    const q = searchLocal.trim().toLowerCase();

    let data = courses.filter((c) => {
      const hay = [
        c.title,
        c.instructor,
        c.status,
        c.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchQ = !q || hay.includes(q);
      const matchStatus = !statusFilter || c.status === statusFilter;
      return matchQ && matchStatus;
    });

    data = data.sort((a, b) => {
      if (sort === "newest") return toDateNum(b.createdAt) - toDateNum(a.createdAt);
      if (sort === "enrolled") return b.enrolled - a.enrolled;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

    return data;
  }, [courses, searchLocal, statusFilter, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([k]) => k),
    [selected]
  );

  const allOnPageSelected = useMemo(() => {
    if (paged.length === 0) return false;
    return paged.every((c) => selected[c.id]);
  }, [paged, selected]);

  function toggleSelectOne(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSelectAllOnPage() {
    setSelected((prev) => {
      const next = { ...prev };
      const nextVal = !allOnPageSelected;
      paged.forEach((c) => (next[c.id] = nextVal));
      return next;
    });
  }

  function clearFilters() {
    setStatusFilter("");
    setSort("newest");
    setSearchLocal("");
    setUrlQuery("");
    setSelected({});
    setPage(1);
  }

  function openCreate() {
    setEditing(null);
    setOpenForm(true);
  }

  function openEdit(c: Course) {
    setEditing(c);
    setOpenForm(true);
  }

  function openCourseView(c: Course) {
    setViewing(c);
    setOpenView(true);
  }

  function requestDelete(ids: string[]) {
    if (ids.length === 0) return;
    setConfirmDelete({ open: true, ids });
  }

  function doDelete() {
    const ids = confirmDelete.ids;
    setCourses((prev) => prev.filter((c) => !ids.includes(c.id)));
    setSelected((prev) => {
      const next = { ...prev };
      ids.forEach((id) => delete next[id]);
      return next;
    });
    setConfirmDelete({ open: false, ids: [] });
  }

  // Bulk actions
  function bulkSetStatus(next: CourseStatus) {
    if (selectedIds.length === 0) return;
    setCourses((prev) =>
      prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status: next } : c))
    );
  }

  function bulkToggleVisibility() {
    if (selectedIds.length === 0) return;
    setCourses((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) ? { ...c, isVisible: !c.isVisible } : c
      )
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600">Quản lý bài giảng</h1>
        </div>

        <button
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          type="button"
          onClick={openCreate}
        >
          + Tạo bài giảng
        </button>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <div className="flex w-full items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-200 md:max-w-[420px]">
              <input
                value={searchLocal}
                onChange={(e) => setSearchLocal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setUrlQuery(searchLocal);
                  if (e.key === "Escape") {
                    setSearchLocal("");
                    setUrlQuery("");
                  }
                }}
                placeholder="Tìm theo tiêu đề/giảng viên/tag..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              {searchLocal && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchLocal("");
                    setUrlQuery("");
                  }}
                  className="rounded-xl px-2 py-1 text-xs text-slate-500 hover:bg-slate-50"
                  title="Xóa"
                >
                  ×
                </button>
              )}
              <button
                type="button"
                onClick={() => setUrlQuery(searchLocal)}
                className="h-9 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer"
              >
                Tìm
              </button>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200 md:w-[220px]"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200 md:w-[220px]"
            >
              <option value="newest">Mới nhất</option>
              <option value="enrolled">Nhiều học viên</option>
              <option value="rating">Đánh giá cao</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          {/* Bulk actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm text-slate-500">
              {selectedIds.length > 0 ? (
                <span>
                  Đã chọn{" "}
                  <span className="font-semibold text-slate-900">{selectedIds.length}</span>
                </span>
              ) : (
                <span>
                  Tổng{" "}
                  <span className="font-semibold text-slate-900">{total}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => bulkSetStatus("Published")}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Duyệt
            </button>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => bulkSetStatus("Archived")}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Lưu trữ
            </button>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={bulkToggleVisibility}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Ẩn/Hiện
            </button>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => requestDelete(selectedIds)}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400 ring-1 ring-slate-200"
                  : "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200/70 p-4">
          <div className="text-sm font-semibold text-slate-900">Danh sách bài giảng</div>
          <div className="text-xs text-slate-500">Trang {page}/{totalPages}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="w-[44px] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={toggleSelectAllOnPage}
                    className="h-4 w-4 rounded border-slate-300"
                    aria-label="Chọn tất cả trong trang"
                  />
                </th>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Giảng viên</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Học viên</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hiển thị</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((c) => (
                <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selected[c.id]}
                      onChange={() => toggleSelectOne(c.id)}
                      className="h-4 w-4 rounded border-slate-300"
                      aria-label={`Chọn ${c.title}`}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{c.title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs", tagChip())}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-700">{c.instructor}</td>
                  <td className="px-4 py-3 text-slate-700">{formatVND(c.price)}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {c.rating} <span className="text-slate-400">({c.reviews})</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{c.enrolled}</td>

                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", statusBadge(c.status))}>
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs",
                      c.isVisible ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-700"
                    )}>
                      {c.isVisible ? "Hiển thị" : "Ẩn"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">{c.createdAt}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() => openCourseView(c)}
                      >
                        Xem
                      </button>

                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() => openEdit(c)}
                      >
                        Sửa
                      </button>

                      {c.status === "Pending" && (
                        <>
                          <button
                            className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
                            onClick={() =>
                              setCourses((prev) =>
                                prev.map((x) => (x.id === c.id ? { ...x, status: "Published" } : x))
                              )
                            }
                          >
                            Duyệt
                          </button>
                          <button
                            className="rounded-xl bg-white px-3 py-1.5 text-xs text-red-600 shadow-sm ring-1 ring-slate-200 hover:bg-red-50"
                            onClick={() =>
                              setCourses((prev) =>
                                prev.map((x) => (x.id === c.id ? { ...x, status: "Archived" } : x))
                              )
                            }
                          >
                            Từ chối
                          </button>
                        </>
                      )}

                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() =>
                          setCourses((prev) =>
                            prev.map((x) => (x.id === c.id ? { ...x, isVisible: !x.isVisible } : x))
                          )
                        }
                      >
                        Ẩn/Hiện
                      </button>

                      <button
                        className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                        onClick={() => requestDelete([c.id])}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={10}>
                    Không có dữ liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200/70 p-4">
          <div className="text-sm text-slate-500">
            Hiển thị {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} / {total}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={cn(
                "rounded-xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                page === 1 ? "cursor-not-allowed bg-slate-50 text-slate-400" : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              «
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={cn(
                "rounded-xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                page === 1 ? "cursor-not-allowed bg-slate-50 text-slate-400" : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Trước
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={cn(
                "rounded-xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                page === totalPages ? "cursor-not-allowed bg-slate-50 text-slate-400" : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Sau
            </button>
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className={cn(
                "rounded-xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                page === totalPages ? "cursor-not-allowed bg-slate-50 text-slate-400" : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openView && viewing && (
        <LectureViewModal
          course={viewing}
          onClose={() => setOpenView(false)}
          onEdit={() => {
            setOpenView(false);
            openEdit(viewing);
          }}
        />
      )}

      {openForm && (
        <LectureFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
          onSubmit={(payload) => {
            if (editing) {
              setCourses((prev) =>
                prev.map((c) => (c.id === editing.id ? { ...c, ...payload } : c))
              );
            } else {
              const now = new Date();
              const yyyy = now.getFullYear();
              const mm = String(now.getMonth() + 1).padStart(2, "0");
              const dd = String(now.getDate()).padStart(2, "0");
              const today = `${yyyy}-${mm}-${dd}`;

              const newCourse: Course = {
                id: `c_${Math.random().toString(16).slice(2)}`,
                title: payload.title,
                instructor: payload.instructor,
                price: payload.price,
                rating: 0,
                reviews: 0,
                enrolled: 0,
                status: payload.status,
                tags: payload.tags,
                createdAt: today,
                isVisible: payload.isVisible,
              };

              setCourses((prev) => [newCourse, ...prev]);
            }
            setOpenForm(false);
          }}
        />
      )}

      {confirmDelete.open && (
        <ConfirmDeleteModal
          count={confirmDelete.ids.length}
          onCancel={() => setConfirmDelete({ open: false, ids: [] })}
          onConfirm={doDelete}
        />
      )}
    </div>
  );
}
