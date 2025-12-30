export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tổng quan hoạt động hệ thống.
        </p>
      </div>

      {/* KPI */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Tổng người dùng", value: "12,345", note: "+4.2% (7 ngày)" },
          { label: "Người dùng mới", value: "486", note: "7 ngày gần nhất" },
          { label: "Tổng bài giảng", value: "1,128", note: "+12 (tháng)" },
          { label: "Đăng ký/Doanh thu", value: "—", note: "tuỳ hệ thống" },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="text-sm text-slate-500">{k.label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {k.value}
            </div>
            <div className="mt-2 text-xs text-slate-500">{k.note}</div>
          </div>
        ))}
      </div>

      {/* Charts placeholders */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">
              Đăng ký mới theo ngày
            </div>
            <div className="text-xs text-slate-500">7 ngày / 30 ngày</div>
          </div>
          <div className="h-[260px] rounded-xl border border-dashed bg-[#F7F8FA]" />
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-slate-900">
            Phân bổ vai trò
          </div>
          <div className="h-[260px] rounded-xl border border-dashed bg-[#F7F8FA]" />
        </div>
      </div>

      {/* Recent */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 text-sm font-semibold text-slate-900">
            Bài giảng mới tạo
          </div>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">Tiêu đề</th>
                  <th className="px-4 py-3">Giảng viên</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {[
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
                ].map((r) => (
                  <tr key={r.title} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {r.title}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.author}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2 py-1 text-xs",
                          r.status === "Published"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700",
                        ].join(" ")}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-slate-900">
            Hoạt động gần đây
          </div>

          <div className="space-y-3">
            {[
              "Khoá user: user1@example.com",
              "Duyệt bài giảng: React Fundamentals",
              "Tạo bài giảng: Next.js Mastery",
            ].map((t) => (
              <div key={t} className="rounded-xl border bg-white p-3">
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
