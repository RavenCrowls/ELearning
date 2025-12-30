const COURSES = [
  {
    title: "Data Science for Beginners",
    instructor: "John Doe",
    price: 90000,
    rating: 4.5,
    reviews: 600,
    enrolled: 1240,
    status: "Published",
    tags: ["Programming", "Web development", "Mobile development"],
    createdAt: "2025-12-10",
  },
  {
    title: "React Fundamentals",
    instructor: "Huy Phạm Nhật",
    price: 200000,
    rating: 3.5,
    reviews: 60,
    enrolled: 310,
    status: "Pending",
    tags: ["Business", "Marketing"],
    createdAt: "2025-12-28",
  },
];

function formatVND(v: number) {
  return new Intl.NumberFormat("vi-VN").format(v) + " ₫";
}

export default function AdminLecturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Quản lý bài giảng
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Quản trị khóa học/bài giảng: duyệt, ẩn/hiện, chỉnh sửa.
        </p>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              placeholder="Tìm theo tiêu đề/giảng viên/tag..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 md:max-w-[420px]"
            />
            <select className="w-full rounded-xl border px-3 py-2 text-sm md:w-[220px]">
              <option value="">Tất cả trạng thái</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
            <select className="w-full rounded-xl border px-3 py-2 text-sm md:w-[220px]">
              <option value="">Sắp xếp</option>
              <option value="newest">Mới nhất</option>
              <option value="enrolled">Nhiều học viên</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>

          <button
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            type="button"
          >
            + Tạo bài giảng
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b p-4">
          <div className="text-sm font-semibold text-slate-900">
            Danh sách bài giảng
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Giảng viên</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Học viên</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Ngày tạo</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {COURSES.map((c) => (
                <tr key={c.title} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{c.title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full border px-2 py-1 text-xs text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-700">{c.instructor}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {formatVND(c.price)}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {c.rating} <span className="text-slate-400">({c.reviews})</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{c.enrolled}</td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-1 text-xs",
                        c.status === "Published"
                          ? "bg-green-50 text-green-700"
                          : c.status === "Pending"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-700",
                      ].join(" ")}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-600">{c.createdAt}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        Xem
                      </button>
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        Sửa
                      </button>
                      {c.status === "Pending" && (
                        <>
                          <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                            Duyệt
                          </button>
                          <button className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                            Từ chối
                          </button>
                        </>
                      )}
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-white">
                        Ẩn/Hiện
                      </button>
                      <button className="rounded-lg border px-2 py-1 text-xs text-red-600 hover:bg-red-50">
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {COURSES.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={8}>
                    Chưa có bài giảng nào.
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
