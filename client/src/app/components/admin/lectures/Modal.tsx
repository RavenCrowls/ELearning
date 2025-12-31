"use client";

import { useEffect } from "react";

export default function Modal({
  title,
  onClose,
  children,
  widthClass = "max-w-[720px]",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={[
          "relative w-full rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5",
          widthClass,
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-2 py-1 text-sm text-slate-500 hover:bg-slate-50"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
