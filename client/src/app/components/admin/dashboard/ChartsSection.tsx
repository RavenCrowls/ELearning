"use client";

import { useMemo, useState } from "react";

type RangeKey = "7d" | "30d";

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function genSeries(range: RangeKey) {
  const len = range === "7d" ? 7 : 30;

  return Array.from({ length: len }, (_, i) => {
    const base = range === "7d" ? 42 : 55;
    const wave = Math.sin((i / (range === "7d" ? 6 : 10)) * Math.PI) * 20;
    const trend = (i / (len - 1)) * 18;
    const v = base + wave + trend + (i % 4) * 3;
    return Math.round(clamp(v, 10, 140));
  });
}

function chunkSum(arr: number[], size: number) {
  const out: number[] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size).reduce((a, b) => a + b, 0));
  }
  return out;
}

// 5 tick: 0/25/50/75/100% theo max (đặt đúng vị trí)
function makeTicks(max: number) {
  const m = Math.max(max, 1);
  return [0, 0.25, 0.5, 0.75, 1].map((p) => Math.round(m * p));
}

export default function ChartsSection() {
  const [range, setRange] = useState<RangeKey>("7d");

  const series = useMemo(() => genSeries(range), [range]);

  const bars = useMemo(() => {
    return range === "7d"
      ? series.map((v, i) => ({ label: `D${i + 1}`, value: v }))
      : chunkSum(series, 6).map((v, i) => ({ label: `W${i + 1}`, value: v }));
  }, [series, range]);

  const maxBar = useMemo(() => Math.max(...bars.map((b) => b.value), 1), [bars]);
  const ticks = useMemo(() => makeTicks(maxBar), [maxBar]);
  const total = useMemo(() => series.reduce((a, b) => a + b, 0), [series]);

  const roles = [
    { name: "Student", value: 70 },
    { name: "Instructor", value: 20 },
    { name: "Admin", value: 10 },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* ===== NEW USERS CHART ===== */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Đăng ký mới theo ngày
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Thống kê số lượng người dùng đăng ký mới.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-xs text-slate-500">Tổng</div>
              <div className="text-sm font-semibold text-slate-900">
                {total.toLocaleString("vi-VN")}
              </div>
            </div>

            <div className="flex items-center rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
              <button
                type="button"
                onClick={() => setRange("7d")}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-semibold",
                  range === "7d"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                7 ngày
              </button>
              <button
                type="button"
                onClick={() => setRange("30d")}
                className={cn(
                  "rounded-xl px-3 py-1.5 text-xs font-semibold",
                  range === "30d"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                30 ngày
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4 rounded-2xl bg-[#F7F8FA] p-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              New users
            </div>
            <div className="text-xs text-slate-500">
              {range === "7d" ? "Theo ngày" : "Gộp theo tuần"}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[44px_1fr] gap-3">
            {/* Y axis */}
            <div className="relative h-[240px]">
              {ticks.map((t) => {
                const top = (1 - t / maxBar) * 100;
                return (
                  <div
                    key={t}
                    className="absolute right-0 text-[11px] text-slate-500"
                    style={{ top: `${top}%`, transform: "translateY(-50%)" }}
                  >
                    {t}
                  </div>
                );
              })}
            </div>

            {/* Plot */}
            <div className="relative h-[240px]">
              {/* grid lines theo ticks */}
              {ticks.map((t) => {
                const top = (1 - t / maxBar) * 100;
                return (
                  <div
                    key={`grid-${t}`}
                    className="absolute left-0 right-0 border-t border-slate-200/70"
                    style={{ top: `${top}%` }}
                  />
                );
              })}

              <div
                className="absolute inset-0 grid items-end gap-3"
                style={{
                  gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))`,
                  paddingBottom: 24, // chỗ cho label D1..D7/W1..W5
                }}
              >
                {bars.map((b, i) => {
                  const h = Math.round((b.value / maxBar) * 100);

                  return (
                    <div
                      key={i}
                      className="group relative flex h-full flex-col items-center justify-end"
                    >
                      {/* value bubble */}
                      <div className="mb-2 rounded-lg bg-blue-600 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                        {b.value}
                      </div>

                      {/* bar track full height */}
                      <div className="relative w-full flex-1 rounded-xl bg-white ring-1 ring-slate-200">
                        <div
                          className="absolute bottom-0 left-0 w-full rounded-xl bg-blue-600/20"
                          style={{ height: `${Math.max(2, h)}%` }}
                        />
                      </div>

                      {/* x label */}
                      <div className="mt-2 text-[11px] text-slate-500">
                        {b.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              {range === "7d"
                ? "7 ngày gần nhất"
                : "30 ngày gần nhất (gộp 6 ngày/tuần)"}
            </span>
            <span>Hover để xem chi tiết</span>
          </div>
        </div>
      </div>

      {/* ===== ROLE DISTRIBUTION ===== */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Phân bổ vai trò
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Tỷ lệ người dùng theo vai trò.
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#F7F8FA] p-4">
          <div className="mx-auto flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
            <div className="text-center">
              <div className="text-xs text-slate-500">Tổng</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                100%
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {roles.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-700">{r.name}</div>
                    <div className="text-xs font-semibold text-slate-700">
                      {r.value}%
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white ring-1 ring-slate-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${r.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            Dữ liệu minh hoạ (sẽ thay bằng API).
          </div>
        </div>
      </div>
    </div>
  );
}
