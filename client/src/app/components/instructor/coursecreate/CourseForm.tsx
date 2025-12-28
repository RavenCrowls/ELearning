"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useCourseForm } from "@/app/hooks/useCourseForm";
import LectureVideoManager from "@/app/components/course/LectureVideoManager";
import type { CourseFormErrors } from "@/app/components/course/types";
import { BasicInfoSection, DetailsSection } from "@/app/components/course/form/sections";
import { CourseFormActionBar } from "@/app/components/course/form/ActionBar";

interface CourseFormProps {
  mode: "create" | "edit";
  initialData?: any;
  onSave: (data: any) => void;
  showLecturesColumn?: boolean;
  instructorId?: string;

  /** nếu bạn embed trong page riêng thì set embedded để bỏ wrapper full screen */
  variant?: "standalone" | "embedded";

  /** optional cancel */
  onCancel?: () => void;

  /** ✅ NEW: bật 2 màn hình theo step */
  twoStep?: boolean;
}

export default function CourseForm({
  mode,
  initialData,
  onSave,
  showLecturesColumn = true,
  instructorId,
  variant = "standalone",
  onCancel,
  twoStep = false,
}: CourseFormProps) {
  const {
    fileInputRef,
    fileInputsRef,
    courseData,
    setCourseData,
    categories,
    subCategories,
    outputs,
    lectures,
    setLectures,
    isLoading,
    isLoadingRight,
    error,
    success,
    isUploading,
    subCategoryOptions,
    addSubCategory,
    removeSubCategory,
    updateSubCategory,
    addOutput,
    removeOutput,
    updateOutput,
    addVideo,
    removeVideo,
    addNewLecture,
    removeLecture,
    toggleVideoCheck,
    handleSave,
    triggerFileInput,
    handleFileSelect,
    handleVideoUploadClick,
    handleVideoFileSelect,
    formatDuration,
  } = useCourseForm({ mode, initialData, instructorId, onSave });

  const [errors, setErrors] = useState<CourseFormErrors>({});
  const [imageOk, setImageOk] = useState(true);

  // ✅ step state
  const [step, setStep] = useState<"basic" | "lectures">("basic");

  // refs for scroll-to-error
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const subCatRef = useRef<HTMLSelectElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const levelRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const firstSubCategorySelected = useMemo(
    () => subCategories.some((s: any) => !!s.name),
    [subCategories]
  );

  const hasAtLeastOneOutput = useMemo(
    () => outputs.some((o: any) => o.name.trim().length > 0),
    [outputs]
  );

  function validate(): CourseFormErrors {
    const e: CourseFormErrors = {};

    if (!courseData.title?.trim()) e.title = "Title không được để trống.";
    if (!courseData.category) e.category = "Vui lòng chọn category.";
    if (!firstSubCategorySelected) e.subCategory = "Vui lòng chọn ít nhất 1 sub-category.";
    if (!courseData.description?.trim()) e.description = "Description không được để trống.";
    if (!hasAtLeastOneOutput) e.output = "Vui lòng thêm ít nhất 1 output.";
    if (!courseData.level) e.level = "Vui lòng chọn level.";

    if (
      courseData.price === undefined ||
      courseData.price === null ||
      Number.isNaN(Number(courseData.price))
    ) {
      e.price = "Price không hợp lệ.";
    } else if (Number(courseData.price) < 0) {
      e.price = "Price phải >= 0.";
    }

    if (!courseData.duration?.trim()) {
      e.duration = "Vui lòng nhập duration.";
    } else {
      const num = parseFloat(String(courseData.duration).replace(",", "."));
      if (Number.isNaN(num) || num <= 0) e.duration = "Duration nên là số > 0.";
    }

    if (!courseData.image?.trim()) {
      e.image = "Vui lòng nhập Image URL hoặc upload ảnh.";
    } else if (!imageOk) {
      e.image = "Image URL không tải được (hoặc sai định dạng).";
    }

    return e;
  }

  function scrollToFirstError(e: CourseFormErrors) {
    const order: Array<keyof CourseFormErrors> = [
      "title",
      "category",
      "subCategory",
      "description",
      "output",
      "level",
      "price",
      "duration",
      "image",
    ];

    for (const k of order) {
      if (!e[k]) continue;

      const map: Record<string, React.RefObject<any>> = {
        title: titleRef,
        category: categoryRef,
        subCategory: subCatRef,
        description: descRef,
        output: descRef,
        level: levelRef,
        price: priceRef,
        duration: durationRef,
        image: imageRef,
      };

      const el = map[k as string]?.current as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as any).focus?.();
      }
      break;
    }
  }

  const handleSaveWithValidate = () => {
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length > 0) {
      // nếu đang ở step lectures mà lỗi thuộc basic => đá về step basic
      if (twoStep && step === "lectures") setStep("basic");
      scrollToFirstError(e);
      return;
    }
    handleSave();
  };

  const goNext = () => {
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length > 0) {
      scrollToFirstError(e);
      return;
    }
    setStep("lectures");
  };

  const goBack = () => setStep("basic");

  // progress
  const completion = useMemo(() => {
    const items = [
      !!courseData.title?.trim(),
      !!courseData.category,
      firstSubCategorySelected,
      !!courseData.description?.trim(),
      hasAtLeastOneOutput,
      !!courseData.level,
      courseData.price !== undefined &&
        courseData.price !== null &&
        !Number.isNaN(Number(courseData.price)),
      !!courseData.duration?.trim(),
      !!courseData.image?.trim() && imageOk,
    ];
    const done = items.filter(Boolean).length;
    const total = items.length;
    const percent = Math.round((done / total) * 100);
    return { done, total, percent };
  }, [courseData, firstSubCategorySelected, hasAtLeastOneOutput, imageOk]);

  // dirty guard
  const initialSnapshotRef = useRef<string>("");

  useEffect(() => {
    if (!initialSnapshotRef.current) {
      initialSnapshotRef.current = JSON.stringify({
        courseData,
        subCategories,
        outputs,
        lectures: showLecturesColumn ? lectures : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDirty = useMemo(() => {
    const now = JSON.stringify({
      courseData,
      subCategories,
      outputs,
      lectures: showLecturesColumn ? lectures : undefined,
    });
    return initialSnapshotRef.current ? now !== initialSnapshotRef.current : false;
  }, [courseData, subCategories, outputs, lectures, showLecturesColumn]);

  useEffect(() => {
    const onBeforeUnload = (ev: BeforeUnloadEvent) => {
      if (!isDirty) return;
      ev.preventDefault();
      ev.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const handleCancel = () => {
    if (isDirty) {
      const ok = window.confirm("Bạn có thay đổi chưa lưu. Bạn có chắc muốn thoát không?");
      if (!ok) return;
    }
    onCancel?.();
  };

  // grid
  const gridCols = showLecturesColumn ? "lg:grid-cols-2" : "lg:grid-cols-1";
  const gridClass = twoStep ? "grid grid-cols-1 gap-6" : `grid grid-cols-1 gap-6 ${gridCols}`;

  const loading = showLecturesColumn ? isLoading : !!isLoadingRight;
  const hasErrors = Object.keys(errors).length > 0;

  // ✅ FIX: không dùng Wrapper component khai báo trong function (tránh remount -> mất focus)
  const content = (
    <div className={variant === "embedded" ? "" : "mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10"}>
      {variant === "standalone" && (
        <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {mode === "create" ? "Create course" : "Edit course"}
            </h1>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {mode === "create" ? "New course" : "Update"}
          </span>
        </div>
      )}

      {/* Progress */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-900">Progress</div>
          <div className="text-xs text-slate-600">
            {completion.done}/{completion.total} • {completion.percent}%
          </div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${completion.percent}%` }} />
        </div>
        {isDirty && (
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-700">
            <AlertTriangle size={14} />
            Bạn có thay đổi chưa lưu.
          </div>
        )}
      </div>

      {/* ✅ Step tabs */}
      {twoStep && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStep("basic")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              step === "basic"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            1) Thông tin khóa học
          </button>

          <button
            type="button"
            onClick={() => {
              // ✅ click step 2 => validate trước
              if (!showLecturesColumn) return;
              goNext();
            }}
            disabled={!showLecturesColumn}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              !showLecturesColumn
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : step === "lectures"
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            2) Lectures & Preview
          </button>
        </div>
      )}

      <div className={gridClass}>
        {/* STEP 1 (hoặc non-step) */}
        {(!twoStep || step === "basic") && (
          <div className="space-y-6">
            <BasicInfoSection
              courseData={courseData}
              setCourseData={setCourseData}
              categories={categories}
              subCategories={subCategories}
              subCategoryOptions={subCategoryOptions}
              addSubCategory={addSubCategory}
              removeSubCategory={removeSubCategory}
              updateSubCategory={updateSubCategory}
              errors={errors}
              setErrors={setErrors}
              titleRef={titleRef}
              categoryRef={categoryRef}
              subCatRef={subCatRef}
              descRef={descRef}
            />

            <DetailsSection
              courseData={courseData}
              setCourseData={setCourseData}
              outputs={outputs}
              addOutput={addOutput}
              removeOutput={removeOutput}
              updateOutput={updateOutput}
              errors={errors}
              setErrors={setErrors}
              levelRef={levelRef}
              priceRef={priceRef}
              durationRef={durationRef}
              imageRef={imageRef}
              imageOk={imageOk}
              setImageOk={setImageOk}
              isUploading={isUploading}
              triggerFileInput={triggerFileInput}
              fileInputRef={fileInputRef}
              handleFileSelect={handleFileSelect}
              error={error}
              success={success}
            />
          </div>
        )}

        {/* STEP 2 (hoặc non-step) */}
        {showLecturesColumn && (!twoStep || step === "lectures") && (
          <div className="space-y-6">
            <LectureVideoManager
              lectures={lectures}
              setLectures={setLectures}
              addNewLecture={addNewLecture}
              removeLecture={removeLecture}
              addVideo={addVideo}
              removeVideo={removeVideo}
              toggleVideoCheck={toggleVideoCheck}
              handleVideoUploadClick={handleVideoUploadClick}
              handleVideoFileSelect={handleVideoFileSelect}
              fileInputsRef={fileInputsRef}
              formatDuration={formatDuration}
            />
          </div>
        )}
      </div>

      <CourseFormActionBar
        percent={completion.percent}
        hasErrors={hasErrors}
        twoStep={twoStep}
        step={twoStep ? step : "lectures"}
        onCancel={handleCancel}
        onBack={goBack}
        onNext={goNext}
        onSave={handleSaveWithValidate}
        loading={loading}
        saveLabel={mode === "create" ? "Create course" : "Save changes"}
      />
    </div>
  );

  return variant === "embedded" ? content : <div className="min-h-screen bg-slate-50">{content}</div>;
}
