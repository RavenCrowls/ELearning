import type { Kpi } from "./data";

export default function KpiGrid({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
        >
          <div className="text-sm font-medium text-slate-700">{k.label}</div>

          <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
            {k.value}
          </div>

          <div className="mt-2 text-xs text-slate-500">{k.note}</div>
        </div>
      ))}
    </div>
  );
}
