"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { SortKey, User, UserRole, UserStatus } from "./types";
import { SEED_USERS } from "./data";
import { cn, exportUsersToCSV, roleChip, statusBadge, toDateNum } from "./utils";

import UserFormModal from "./UserFormModal";
import UserViewModal from "./UserViewModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function AdminUsersPage() {
  const router = useRouter();
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  // URL query from topbar
  const urlQ = (searchParams.get("q") ?? "").trim();

  // Local UI state
  const [users, setUsers] = useState<User[]>(SEED_USERS);
  const [searchLocal, setSearchLocal] = useState<string>(urlQ);

  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");
  const [sort, setSort] = useState<SortKey>("createdAt_desc");

  // Selection
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  // Pagination (UI)
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Modals
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const [openView, setOpenView] = useState(false);
  const [viewing, setViewing] = useState<User | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; ids: string[] }>({
    open: false,
    ids: [],
  });

  // Keep local search sync with URL q
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

  // Derived: filtered + sorted
  const filtered = useMemo(() => {
    const q = searchLocal.trim().toLowerCase();

    let data = users.filter((u) => {
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole = !roleFilter || u.role === roleFilter;
      const matchStatus = !statusFilter || u.status === statusFilter;
      return matchQ && matchRole && matchStatus;
    });

    data = data.sort((a, b) => {
      if (sort === "createdAt_desc") return toDateNum(b.createdAt) - toDateNum(a.createdAt);
      if (sort === "createdAt_asc") return toDateNum(a.createdAt) - toDateNum(b.createdAt);
      if (sort === "lastLogin_desc") return toDateNum(b.lastLogin) - toDateNum(a.lastLogin);
      if (sort === "name_asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return data;
  }, [users, searchLocal, roleFilter, statusFilter, sort]);

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
    return paged.every((u) => selected[u.id]);
  }, [paged, selected]);

  function clearFilters() {
    setRoleFilter("");
    setStatusFilter("");
    setSort("createdAt_desc");
    setSearchLocal("");
    setUrlQuery("");
    setSelected({});
    setPage(1);
  }

  function toggleSelectOne(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSelectAllOnPage() {
    setSelected((prev) => {
      const next = { ...prev };
      const nextValue = !allOnPageSelected;
      paged.forEach((u) => (next[u.id] = nextValue));
      return next;
    });
  }

  function openCreate() {
    setEditing(null);
    setOpenForm(true);
  }

  function openEdit(u: User) {
    setEditing(u);
    setOpenForm(true);
  }

  function openUserView(u: User) {
    setViewing(u);
    setOpenView(true);
  }

  function bulkUpdateStatus(status: UserStatus) {
    if (selectedIds.length === 0) return;
    setUsers((prev) => prev.map((u) => (selectedIds.includes(u.id) ? { ...u, status } : u)));
  }

  function requestDelete(ids: string[]) {
    if (ids.length === 0) return;
    setConfirmDelete({ open: true, ids });
  }

  function doDelete() {
    const ids = confirmDelete.ids;
    setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
    setSelected((prev) => {
      const next = { ...prev };
      ids.forEach((id) => delete next[id]);
      return next;
    });
    setConfirmDelete({ open: false, ids: [] });
  }

  function exportCSV() {
    const rows = filtered.map((u) => ({
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin,
    }));
    exportUsersToCSV(rows);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Quản lý người dùng</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 cursor-pointer"
            type="button"
            onClick={exportCSV}
          >
            Xuất CSV
          </button>
          <button
            className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
            type="button"
            onClick={openCreate}
          >
            + Tạo người dùng
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <div className="flex w-full items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-200 md:max-w-[360px]">
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
                placeholder="Tìm theo tên/email..."
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
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value as any);
                setPage(1);
              }}
              className="w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200 md:w-[200px]"
            >
              <option value="">Tất cả vai trò</option>
              <option value="Student">Học viên</option>
              <option value="Instructor">Giảng viên</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(1);
              }}
              className="w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200 md:w-[200px]"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Active">Hoạt động</option>
              <option value="Locked">Bị khóa</option>
              <option value="Pending">Chờ xác minh</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="w-full rounded-2xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-200 md:w-[220px]"
            >
              <option value="createdAt_desc">Mới tạo (giảm dần)</option>
              <option value="createdAt_asc">Mới tạo (tăng dần)</option>
              <option value="lastLogin_desc">Đăng nhập gần nhất</option>
              <option value="name_asc">Tên (A → Z)</option>
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
                  Đã chọn <span className="font-semibold text-slate-900">{selectedIds.length}</span>
                </span>
              ) : (
                <span>
                  Tổng <span className="font-semibold text-slate-900">{total}</span>
                </span>
              )}
            </div>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => bulkUpdateStatus("Active")}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Mở khóa
            </button>

            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => bulkUpdateStatus("Locked")}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200",
                selectedIds.length === 0
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              Khóa
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
          <div className="text-sm font-semibold text-slate-900">Danh sách người dùng</div>
          <div className="text-xs text-slate-500">
            Trang {page}/{totalPages}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
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
                <th className="px-4 py-3">Người dùng</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Đăng nhập gần nhất</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paged.map((u) => (
                <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selected[u.id]}
                      onChange={() => toggleSelectOne(u.id)}
                      className="h-4 w-4 rounded border-slate-300"
                      aria-label={`Chọn ${u.name}`}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200 ring-1 ring-slate-200" />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-700">{u.email}</td>

                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs", roleChip(u.role))}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", statusBadge(u.status))}>
                      {u.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">{u.createdAt}</td>
                  <td className="px-4 py-3 text-slate-600">{u.lastLogin}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() => openUserView(u)}
                      >
                        Xem
                      </button>
                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() => openEdit(u)}
                      >
                        Sửa
                      </button>
                      <button
                        className="rounded-xl bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                        onClick={() =>
                          setUsers((prev) =>
                            prev.map((x) =>
                              x.id === u.id
                                ? { ...x, status: x.status === "Locked" ? "Active" : "Locked" }
                                : x
                            )
                          )
                        }
                      >
                        {u.status === "Locked" ? "Mở khóa" : "Khóa"}
                      </button>
                      <button
                        className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                        onClick={() => requestDelete([u.id])}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={8}>
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
        <UserViewModal
          user={viewing}
          onClose={() => setOpenView(false)}
          onEdit={() => {
            setOpenView(false);
            openEdit(viewing);
          }}
        />
      )}

      {openForm && (
        <UserFormModal
          initial={editing}
          onClose={() => setOpenForm(false)}
          onSubmit={(payload) => {
            if (editing) {
              setUsers((prev) => prev.map((u) => (u.id === editing.id ? { ...u, ...payload } : u)));
            } else {
              const now = new Date();
              const yyyy = now.getFullYear();
              const mm = String(now.getMonth() + 1).padStart(2, "0");
              const dd = String(now.getDate()).padStart(2, "0");
              const today = `${yyyy}-${mm}-${dd}`;

              const newUser: User = {
                id: `u_${Math.random().toString(16).slice(2)}`,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                status: payload.status,
                createdAt: today,
                lastLogin: today,
              };

              setUsers((prev) => [newUser, ...prev]);
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
