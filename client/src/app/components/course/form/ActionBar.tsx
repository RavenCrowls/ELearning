"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { LoadingSpinner, PrimaryButton, SecondaryButton } from "@/app/components/course/form/ui";

export function CourseFormActionBar({
  percent,
  hasErrors,
  twoStep,
  step,
  onCancel,
  onBack,
  onNext,
  onSave,
  loading,
  saveLabel,
}: {
  percent: number;
  hasErrors: boolean;

  twoStep: boolean;
  step: "basic" | "lectures";

  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;

  loading: boolean;
  saveLabel: string;
}) {
  return (
    <div className="sticky bottom-0 mt-8 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600">{percent}% complete</span>
          {hasErrors && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              <AlertTriangle size={14} />
              Có lỗi cần sửa
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>

          {twoStep && step === "basic" ? (
            <PrimaryButton onClick={onNext}>Next: Lectures</PrimaryButton>
          ) : (
            <>
              {twoStep && <SecondaryButton onClick={onBack}>Back</SecondaryButton>}

              <PrimaryButton onClick={onSave} disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner />
                    Saving...
                  </>
                ) : (
                  <>{saveLabel}</>
                )}
              </PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
