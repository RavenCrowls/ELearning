'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, X, Upload, AlertTriangle } from 'lucide-react';
import { useCourseForm } from '@/app/hooks/useCourseForm';
import LectureVideoManager from "@/app/components/course/LectureVideoManager";

interface VideoItem {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  duration?: string;
  url?: string;
}

interface Lecture {
  id: string;
  name: string;
  order: number;
  videos: VideoItem[];
}

interface CourseFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    _id?: string;
    COURSE_ID?: string;
    TITLE?: string;
    INSTRUCTOR_ID?: string;
    CREATED_DATE?: string;
    CATEGORIES?: string[];
    SUB_CATEGORIES?: string[];
    RATING?: string[];
    DESCRIPTION?: string;
    OUTPUT?: string[];
    PRICE?: number;
    LEVEL?: string;
    DURATION?: string;
    NUMBER_OF_VIDEOS?: number;
    ENROLLMENT_COUNT?: number;
    APPROVAL_STATUS?: string;
    STATUS?: boolean;
    IMAGE_URL?: string;
  };
  onSave: (data: any) => void;
  showLecturesColumn?: boolean;
  instructorId?: string;

  /** nếu bạn embed trong page riêng thì set embedded để bỏ wrapper full screen */
  variant?: 'standalone' | 'embedded';

  /** optional cancel */
  onCancel?: () => void;
}

/** ---------- UI helpers ---------- */
function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-slate-500">{children}</p>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600">{msg}</p>;
}

const baseInput =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

function Card({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function DashedButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
    >
      {children}
    </button>
  );
}

function IconDangerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-red-600 transition hover:bg-red-50"
      aria-label="Remove"
    >
      <X size={16} />
    </button>
  );
}

function PrimaryButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
        disabled ? 'cursor-not-allowed bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function LoadingSpinner() {
  return <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />;
}
/** -------------------------------- */

type Errors = Partial<Record<
  'title' | 'category' | 'subCategory' | 'description' | 'output' | 'level' | 'price' | 'duration' | 'image',
  string
>>;

export default function CourseForm({
  mode,
  initialData,
  onSave,
  showLecturesColumn = true,
  instructorId,
  variant = 'standalone',
  onCancel,
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
    error,
    success,
    isUploading,
    errorRight,
    successRight,
    isLoadingRight,
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
    handleSaveLecturesAndVideos,
    handleVideoUploadClick,
    handleVideoFileSelect,
    formatDuration,
  } = useCourseForm({ mode, initialData, instructorId, onSave });

  /** ---------- NEW: validation + scroll ---------- */
  const [errors, setErrors] = useState<Errors>({});
  const [imageOk, setImageOk] = useState(true);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const subCatRef = useRef<HTMLSelectElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const levelRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const firstSubCategorySelected = useMemo(() => {
    return subCategories.some((s) => !!s.name);
  }, [subCategories]);

  const hasAtLeastOneOutput = useMemo(() => {
    return outputs.some((o) => o.name.trim().length > 0);
  }, [outputs]);

  function validate(): Errors {
    const e: Errors = {};

    if (!courseData.title?.trim()) e.title = 'Title không được để trống.';
    if (!courseData.category) e.category = 'Vui lòng chọn category.';
    if (!firstSubCategorySelected) e.subCategory = 'Vui lòng chọn ít nhất 1 sub-category.';
    if (!courseData.description?.trim()) e.description = 'Description không được để trống.';
    if (!hasAtLeastOneOutput) e.output = 'Vui lòng thêm ít nhất 1 output.';
    if (!courseData.level) e.level = 'Vui lòng chọn level.';

    if (courseData.price === undefined || courseData.price === null || Number.isNaN(Number(courseData.price))) {
      e.price = 'Price không hợp lệ.';
    } else if (Number(courseData.price) < 0) {
      e.price = 'Price phải >= 0.';
    }

    if (!courseData.duration?.trim()) {
      e.duration = 'Vui lòng nhập duration.';
    } else {
      // chấp nhận "10" hoặc "10.5" hoặc "10 giờ" -> nếu bạn muốn strict hơn thì đổi regex
      const num = parseFloat(courseData.duration.replace(',', '.'));
      if (Number.isNaN(num) || num <= 0) e.duration = 'Duration nên là số > 0.';
    }

    if (!courseData.image?.trim()) {
      e.image = 'Vui lòng nhập Image URL hoặc upload ảnh.';
    } else if (!imageOk) {
      e.image = 'Image URL không tải được (hoặc sai định dạng).';
    }

    return e;
  }

  function scrollToFirstError(e: Errors) {
    const order: Array<keyof Errors> = [
      'title',
      'category',
      'subCategory',
      'description',
      'output',
      'level',
      'price',
      'duration',
      'image',
    ];

    for (const k of order) {
      if (!e[k]) continue;
      const map: Record<string, React.RefObject<any>> = {
        title: titleRef,
        category: categoryRef,
        subCategory: subCatRef,
        description: descRef,
        output: descRef, // output nằm dưới desc, focus desc để kéo xuống gần
        level: levelRef,
        price: priceRef,
        duration: durationRef,
        image: imageRef,
      };

      const ref = map[k as string];
      const el = ref?.current as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // focus nếu có
        (el as any).focus?.();
      }
      break;
    }
  }

  const handleSaveWithValidate = () => {
    const e = validate();
    setErrors(e);

    if (Object.keys(e).length > 0) {
      scrollToFirstError(e);
      return;
    }
    // ok -> gọi logic cũ
    handleSave();
  };

  /** ---------- NEW: progress meter ---------- */
  const completion = useMemo(() => {
    const items = [
      !!courseData.title?.trim(),
      !!courseData.category,
      firstSubCategorySelected,
      !!courseData.description?.trim(),
      hasAtLeastOneOutput,
      !!courseData.level,
      courseData.price !== undefined && courseData.price !== null && !Number.isNaN(Number(courseData.price)),
      !!courseData.duration?.trim(),
      !!courseData.image?.trim() && imageOk,
    ];
    const done = items.filter(Boolean).length;
    const total = items.length;
    const percent = Math.round((done / total) * 100);
    return { done, total, percent };
  }, [courseData, firstSubCategorySelected, hasAtLeastOneOutput, imageOk]);

  /** ---------- NEW: unsaved changes guard ---------- */
  const initialSnapshotRef = useRef<string>('');

  useEffect(() => {
    // set snapshot lần đầu sau khi hook load data xong
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
      ev.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);

  const handleCancel = () => {
    if (isDirty) {
      const ok = window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn thoát không?');
      if (!ok) return;
    }
    onCancel?.();
  };

  /** ---------- Layout rules ---------- */
  const gridCols = showLecturesColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-1';

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (variant === 'embedded') return <>{children}</>;
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  };

  return (
    <Wrapper>
      <div className={variant === 'embedded' ? '' : 'mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10'}>
        {variant === 'standalone' && (
          <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                {mode === 'create' ? 'Create course' : 'Edit course'}
              </h1>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {mode === 'create' ? 'New course' : 'Update'}
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Progress</div>
            <div className="text-xs text-slate-600">
              {completion.done}/{completion.total} • {completion.percent}%
            </div>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${completion.percent}%` }}
            />
          </div>
          {isDirty && (
            <div className="mt-2 flex items-center gap-2 text-xs text-amber-700">
              <AlertTriangle size={14} />
              Bạn có thay đổi chưa lưu.
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
          {/* Left: form */}
          <div className="space-y-6">
            <Card title="Basic information" subtitle="Những thông tin chính của khóa học.">
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <Label required>Title</Label>
                  <input
                    ref={titleRef}
                    type="text"
                    value={courseData.title}
                    onChange={(e) => {
                      setCourseData({ ...courseData, title: e.target.value });
                      if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
                    }}
                    className={baseInput}
                    placeholder="Enter course title"
                  />
                  <FieldError msg={errors.title} />
                </div>

                {/* Category */}
                <div>
                  <Label required>Category</Label>
                  <select
                    ref={categoryRef}
                    value={courseData.category}
                    onChange={(e) => {
                      setCourseData({ ...courseData, category: e.target.value });
                      if (errors.category) setErrors((p) => ({ ...p, category: undefined }));
                    }}
                    className={baseInput}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>
                        {cat.NAME}
                      </option>
                    ))}
                  </select>
                  <FieldError msg={errors.category} />
                </div>

                {/* Sub-category */}
                <div>
                  <Label required>Sub-category</Label>
                  <div className="space-y-2">
                    {subCategories.map((subCat, idx) => (
                      <div key={subCat.id} className="flex items-center gap-2">
                        <select
                          ref={idx === 0 ? subCatRef : undefined}
                          value={subCat.name}
                          onChange={(e) => {
                            updateSubCategory(subCat.id, e.target.value);
                            if (errors.subCategory) setErrors((p) => ({ ...p, subCategory: undefined }));
                          }}
                          className={`${baseInput} flex-1`}
                          disabled={!courseData.category}
                        >
                          {!courseData.category ? (
                            <option value="">Chọn category trước</option>
                          ) : (
                            <>
                              <option value="">Select a sub-category</option>
                              {subCategoryOptions.map((sub: any) => (
                                <option key={sub.SUB_CATEGORY_ID} value={sub.SUB_CATEGORY_ID}>
                                  {sub.NAME}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                        <IconDangerButton onClick={() => removeSubCategory(subCat.id)} />
                      </div>
                    ))}

                    <DashedButton
                      onClick={() => {
                        addSubCategory();
                        if (errors.subCategory) setErrors((p) => ({ ...p, subCategory: undefined }));
                      }}
                    >
                      <Plus size={16} />
                      Add new sub-category
                    </DashedButton>

                    <FieldError msg={errors.subCategory} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label required>Description</Label>
                  <textarea
                    ref={descRef}
                    value={courseData.description}
                    onChange={(e) => {
                      setCourseData({ ...courseData, description: e.target.value });
                      if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                    }}
                    className={`${baseInput} min-h-[110px] resize-none`}
                    placeholder="Enter course description"
                  />
                  <FieldError msg={errors.description} />
                  <Hint>Mô tả rõ ràng giúp tăng tỷ lệ đăng ký.</Hint>
                </div>
              </div>
            </Card>

            <Card title="Course details" subtitle="Output, level, giá, thời lượng và ảnh.">
              <div className="space-y-5">
                {/* Output */}
                <div>
                  <Label required>Output</Label>
                  <div className="space-y-2">
                    {outputs.map((output) => (
                      <div key={output.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={output.name}
                          onChange={(e) => {
                            updateOutput(output.id, e.target.value);
                            if (errors.output) setErrors((p) => ({ ...p, output: undefined }));
                          }}
                          className={`${baseInput} flex-1`}
                          placeholder="Enter output"
                        />
                        <IconDangerButton onClick={() => removeOutput(output.id)} />
                      </div>
                    ))}

                    <DashedButton
                      onClick={() => {
                        addOutput();
                        if (errors.output) setErrors((p) => ({ ...p, output: undefined }));
                      }}
                    >
                      <Plus size={16} />
                      Add new output
                    </DashedButton>
                    <FieldError msg={errors.output} />
                  </div>
                </div>

                {/* Level + Price */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label required>Level</Label>
                    <select
                      ref={levelRef}
                      value={courseData.level}
                      onChange={(e) => {
                        setCourseData({ ...courseData, level: e.target.value });
                        if (errors.level) setErrors((p) => ({ ...p, level: undefined }));
                      }}
                      className={baseInput}
                    >
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <FieldError msg={errors.level} />
                  </div>

                  <div>
                    <Label required>Price (VND)</Label>
                    <input
                      ref={priceRef}
                      type="number"
                      value={courseData.price}
                      onChange={(e) => {
                        setCourseData({ ...courseData, price: Number(e.target.value) });
                        if (errors.price) setErrors((p) => ({ ...p, price: undefined }));
                      }}
                      className={baseInput}
                      placeholder="Enter price"
                    />
                    <FieldError msg={errors.price} />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <Label required>Duration (hours)</Label>
                  <input
                    ref={durationRef}
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => {
                      setCourseData({ ...courseData, duration: e.target.value });
                      if (errors.duration) setErrors((p) => ({ ...p, duration: undefined }));
                    }}
                    className={baseInput}
                    placeholder="Enter duration"
                  />
                  <FieldError msg={errors.duration} />
                </div>

                {/* Image */}
                <div>
                  <Label required>Image URL</Label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={imageRef}
                      type="text"
                      value={courseData.image}
                      onChange={(e) => {
                        setCourseData({ ...courseData, image: e.target.value });
                        setImageOk(true); // reset, sẽ check lại bằng preview
                        if (errors.image) setErrors((p) => ({ ...p, image: undefined }));
                      }}
                      className={`${baseInput} flex-1`}
                      placeholder="Enter image URL or upload an image"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 ${
                        isUploading ? 'cursor-not-allowed opacity-60' : ''
                      }`}
                      aria-label="Upload image"
                      title="Upload image"
                    >
                      {isUploading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                      ) : (
                        <Upload size={18} />
                      )}
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Image preview */}
                  {courseData.image?.trim() && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={courseData.image}
                        alt="Course cover preview"
                        className="h-40 w-full object-cover"
                        onLoad={() => setImageOk(true)}
                        onError={() => setImageOk(false)}
                      />
                      {!imageOk && (
                        <div className="px-4 py-3 text-sm text-red-600">
                          Không tải được ảnh từ URL này.
                        </div>
                      )}
                    </div>
                  )}

                  <FieldError msg={errors.image} />
                  {isUploading && <Hint>Uploading image...</Hint>}
                </div>

                {/* Status messages from hook */}
                {(error || success) && (
                  <div className="space-y-2">
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {success}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right: lectures */}
          {showLecturesColumn && (
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
          )}

        {/* ---------- NEW: Sticky Action Bar ---------- */}
        <div className="sticky bottom-0 mt-8 border-t border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">
                {completion.percent}% complete
              </span>
              {Object.keys(errors).length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  <AlertTriangle size={14} />
                  Có lỗi cần sửa
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>

              <PrimaryButton
                onClick={handleSaveWithValidate}
                disabled={showLecturesColumn ? isLoading : isLoadingRight}
              >
                {(showLecturesColumn ? isLoading : isLoadingRight) ? (
                  <>
                    <LoadingSpinner />
                    {mode === 'create' ? 'Creating...' : 'Saving...'}
                  </>
                ) : (
                  <>{mode === 'create' ? 'Create course' : 'Save changes'}</>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Wrapper>
  );
}
