import Image from "next/image";
export default function AdminDashboardPage() {
  const kpis = [
    { label: "Tổng người dùng", value: "12,345", note: "+4.2% (7 ngày)" },
    { label: "Người dùng mới", value: "486", note: "7 ngày gần nhất" },
    { label: "Tổng bài giảng", value: "1,128", note: "+12 (tháng)" },
    { label: "Đăng ký/Doanh thu", value: "—", note: "tuỳ hệ thống" },
  ];

  const recentCourses = [
    {
      title: "Data Science for Beginners",
      author: "John Doe",
      status: "Published",
      date: "2025-12-31",
    },
    {
      title: "React Fundamentals",
      author: "Huy Phạm Nhật",
      status: "Pending",
      date: "2025-12-30",
    },
  ];

  const activities = [
    "Khoá user: user1@example.com",
    "Duyệt bài giảng: React Fundamentals",
    "Tạo bài giảng: Next.js Mastery",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
        </div>

        {/* Quick filter (UI-only) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-black/5 hover:bg-slate-50"
          >
            7 ngày
          </button>
          <button
            type="button"
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-black/5 hover:bg-slate-50"
          >
            30 ngày
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Tải báo cáo
          </button>
        </div>
      </div>

      {/* KPI (minimal) */}
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  {[
    { label: "Tổng người dùng", value: "12,345", note: "+4.2% (7 ngày)"},
    { label: "Người dùng mới", value: "486", note: "7 ngày gần nhất" },
    { label: "Tổng bài giảng", value: "1,128", note: "+12 (tháng)" },
    { label: "Đăng ký/Doanh thu", value: "—", note: "tuỳ hệ thống" },
  ].map((k) => (
    <div
      key={k.label}
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-slate-700">{k.label}</div>
      </div>

      <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
        {k.value}
      </div>

      <div className="mt-2 text-xs text-slate-500">{k.note}</div>
    </div>
  ))}
</div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Đăng ký mới theo ngày
              </div>
              <div className="mt-1 text-xs text-slate-500">
                So sánh 7 ngày / 30 ngày.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                New users
              </span>
            </div>
          </div>

          {/* skeleton chart */}
          <div className="rounded-2xl bg-[#F7F8FA] p-4">
            <div className="h-4 w-40 animate-pulse rounded bg-white/70" />
            <div className="mt-4 grid h-[210px] grid-cols-12 items-end gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl bg-white/70"
                  style={{ height: `${30 + (i % 6) * 22}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-3">
            <div className="text-sm font-semibold text-slate-900">
              Phân bổ vai trò
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Student / Instructor / Admin
            </div>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] p-4">
            <div className="mx-auto h-[180px] w-[180px] animate-pulse rounded-full bg-white/70" />
            <div className="mt-4 space-y-2">
              {[
                { name: "Student", w: "w-[70%]" },
                { name: "Instructor", w: "w-[45%]" },
                { name: "Admin", w: "w-[20%]" },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-600">{r.name}</div>
                    <div className="mt-1 h-2 rounded-full bg-white/70">
                      <div className={`h-2 rounded-full bg-slate-300 ${r.w}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Bài giảng mới tạo
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Danh sách cập nhật gần nhất.
              </div>
            </div>
            <button
              type="button"
              className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800"
            >
              Xem tất cả
            </button>
          </div>

          {/* Table wrapper without heavy borders */}
          <div className="overflow-hidden rounded-2xl bg-[#F7F8FA] p-2">
            <table className="w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr className="text-slate-600">
                  <th className="px-3 py-3 text-xs font-semibold">Tiêu đề</th>
                  <th className="px-3 py-3 text-xs font-semibold">Giảng viên</th>
                  <th className="px-3 py-3 text-xs font-semibold">Trạng thái</th>
                  <th className="px-3 py-3 text-xs font-semibold">Ngày tạo</th>
                </tr>
              </thead>

              <tbody className="[&>tr>td]:align-middle">
                {recentCourses.map((r) => (
                  <tr key={r.title}>
                    <td className="px-3 py-2">
                      <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-black/5">
                        <div className="font-medium text-slate-900">
                          {r.title}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-black/5 text-slate-700">
                        {r.author}
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-black/5">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                            r.status === "Published"
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700",
                          ].join(" ")}
                        >
                          {r.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 py-2">
                      <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-black/5 text-slate-600">
                        {r.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-3">
            <div className="text-sm font-semibold text-slate-900">
              Hoạt động gần đây
            </div>
          </div>

          <div className="space-y-3">
            {activities.map((t) => (
              <div
                key={t}
                className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5"
              >
                <div className="text-sm text-slate-700">{t}</div>
                <div className="mt-1 text-xs text-slate-500">Vừa xong</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
