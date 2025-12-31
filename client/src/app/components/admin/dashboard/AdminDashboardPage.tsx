import KpiGrid from "./KpiGrid";
import ChartsSection from "./ChartsSection";
import RecentSection from "./RecentSection";
import { ACTIVITIES, KPIS, RECENT_COURSES } from "./data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            7 ngày
          </button>
          <button
            type="button"
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            30 ngày
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Tải báo cáo
          </button>
        </div>
      </div>

      <KpiGrid kpis={KPIS} />
      <ChartsSection />
      <RecentSection recentCourses={RECENT_COURSES} activities={ACTIVITIES} />
    </div>
  );
}
