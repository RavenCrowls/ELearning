// app/coursecreate/CourseCreateScreen.tsx
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CourseForm from "./CourseForm";
import CourseCreateSidePanel from "./CourseCreateSidePanel";

export default function CourseCreateScreen() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const instructorId = user?.id;

  if (!isLoaded) {
    return <div className="p-6 text-slate-600">Loading...</div>;
  }

  const handleSave = () => {
    router.push("/course-instructor");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: form */}
          <div className="lg:col-span-2">
            <CourseForm
              mode="create"
              onSave={handleSave}
              showLecturesColumn={false}
              instructorId={instructorId}
              // variant="embedded"
            />
          </div>

          {/* Right: side panel */}
          <div className="lg:col-span-1">
            <CourseCreateSidePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
