"use client";

import React from "react";
import { Plus, Upload } from "lucide-react";
import type { CourseFormErrors } from "@/app/components/course/types";
import {
  baseInput,
  Card,
  DashedButton,
  FieldError,
  Hint,
  IconDangerButton,
  Label,
} from "@/app/components/course/form/ui";

export function BasicInfoSection({
  courseData,
  setCourseData,
  categories,
  subCategories,
  subCategoryOptions,
  addSubCategory,
  removeSubCategory,
  updateSubCategory,
  errors,
  setErrors,
  titleRef,
  categoryRef,
  subCatRef,
  descRef,
}: {
  courseData: any;
  setCourseData: (next: any) => void;

  categories: Array<{ CATEGORY_ID: string; NAME: string }>;
  subCategories: Array<{ id: string; name: string }>;
  subCategoryOptions: Array<{ SUB_CATEGORY_ID: string; NAME: string }>;

  addSubCategory: () => void;
  removeSubCategory: (id: string) => void;
  updateSubCategory: (id: string, value: string) => void;

  errors: CourseFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<CourseFormErrors>>;

  titleRef: React.RefObject<HTMLInputElement | null>;
  categoryRef: React.RefObject<HTMLSelectElement | null>;
  subCatRef: React.RefObject<HTMLSelectElement | null>;
  descRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  return (
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
                    if (errors.subCategory)
                      setErrors((p) => ({ ...p, subCategory: undefined }));
                  }}
                  className={`${baseInput} flex-1`}
                  disabled={!courseData.category}
                >
                  {!courseData.category ? (
                    <option value="">Chọn category trước</option>
                  ) : (
                    <>
                      <option value="">Select a sub-category</option>
                      {subCategoryOptions.map((sub) => (
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
                if (errors.subCategory)
                  setErrors((p) => ({ ...p, subCategory: undefined }));
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
              if (errors.description)
                setErrors((p) => ({ ...p, description: undefined }));
            }}
            className={`${baseInput} min-h-[110px] resize-none`}
            placeholder="Enter course description"
          />
          <FieldError msg={errors.description} />
          <Hint>Mô tả rõ ràng giúp tăng tỷ lệ đăng ký.</Hint>
        </div>
      </div>
    </Card>
  );
}

export function DetailsSection({
  courseData,
  setCourseData,
  outputs,
  addOutput,
  removeOutput,
  updateOutput,
  errors,
  setErrors,
  levelRef,
  priceRef,
  durationRef,
  imageRef,
  imageOk,
  setImageOk,
  isUploading,
  triggerFileInput,
  fileInputRef,
  handleFileSelect,
  error,
  success,
}: {
  courseData: any;
  setCourseData: (next: any) => void;

  outputs: Array<{ id: string; name: string }>;
  addOutput: () => void;
  removeOutput: (id: string) => void;
  updateOutput: (id: string, value: string) => void;

  errors: CourseFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<CourseFormErrors>>;

  levelRef: React.RefObject<HTMLSelectElement | null>;
  priceRef: React.RefObject<HTMLInputElement | null>;
  durationRef: React.RefObject<HTMLInputElement | null>;
  imageRef: React.RefObject<HTMLInputElement | null>;

  imageOk: boolean;
  setImageOk: (v: boolean) => void;

  isUploading: boolean;
  triggerFileInput: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: string | null;
  success?: string | null;
}) {
  return (
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
                setImageOk(true);
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
                isUploading ? "cursor-not-allowed opacity-60" : ""
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
  );
}
