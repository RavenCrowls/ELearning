const USERS = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Student",
    status: "Active",
    createdAt: "2025-12-01",
    lastLogin: "2025-12-31",
  },
  {
    name: "Huy Phạm Nhật",
    email: "huy@example.com",
    role: "Instructor",
    status: "Locked",
    createdAt: "2025-11-18",
    lastLogin: "2025-12-20",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Quản lý người dùng
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tìm kiếm, phân quyền, khóa/mở tài khoản.
        </p>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              placeholder="Tìm theo tên/email..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 md:max-w-[360px]"
            />

            <select className="w-full rounded-xl border px-3 py-2 text-sm md:w-[200px]">
              <option value="">Tất cả vai trò</option>
              <option value="Student">Học viên</option>
              <option value="Instructor">Giảng viên</option>
              <option value="Admin">Admin</option>
            </select>

            <select className="w-full rounded-xl border px-3 py-2 text-sm md:w-[200px]">
              <option value="">Tất cả trạng thái</option>
              <option value="Active">Hoạt động</option>
              <option value="Locked">Bị khóa</option>
              <option value="Pending">Chờ xác minh</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              type="button"
            >
              Xuất CSV
            </button>
            <button
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              type="button"
            >
              + Tạo người dùng
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="text-sm font-semibold text-slate-900">
            Danh sách người dùng
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
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
              {USERS.map((u) => (
                <tr key={u.email} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-200" />
                      <div>
                        <div className="font-medium text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.role}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-700">{u.email}</td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-slate-700">
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        u.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700",
                      ].join(" ")}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">{u.createdAt}</td>
                  <td className="px-4 py-3 text-slate-600">{u.lastLogin}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        Xem
                      </button>
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        Sửa
                      </button>
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        {u.status === "Locked" ? "Mở khóa" : "Khóa"}
                      </button>
                      <button className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {USERS.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={7}>
                    Chưa có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
