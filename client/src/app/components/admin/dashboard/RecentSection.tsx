import type { RecentCourse } from "./data";

export default function RecentSection({
  recentCourses,
  activities,
}: {
  recentCourses: RecentCourse[];
  activities: string[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
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
            className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Xem tất cả
          </button>
        </div>

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
                    <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-200">
                      <div className="font-medium text-slate-900">{r.title}</div>
                    </div>
                  </td>

                  <td className="px-3 py-2">
                    <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-200 text-slate-700">
                      {r.author}
                    </div>
                  </td>

                  <td className="px-3 py-2">
                    <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-200">
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
                    <div className="rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-200 text-slate-600">
                      {r.date}
                    </div>
                  </td>
                </tr>
              ))}

              {recentCourses.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-sm text-slate-500"
                    colSpan={4}
                  >
                    Chưa có bài giảng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="mb-3">
          <div className="text-sm font-semibold text-slate-900">
            Hoạt động gần đây
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((t) => (
            <div
              key={t}
              className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
            >
              <div className="text-sm text-slate-700">{t}</div>
              <div className="mt-1 text-xs text-slate-500">Vừa xong</div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
              Chưa có hoạt động nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
