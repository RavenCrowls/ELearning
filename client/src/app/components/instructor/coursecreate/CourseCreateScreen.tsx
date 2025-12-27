// app/coursecreate/CourseCreateScreen.tsx
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CourseForm from "./CourseForm";

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
        <CourseForm
          mode="create"
          onSave={handleSave}
          instructorId={instructorId}
          showLecturesColumn={true}
          variant="embedded"
        />
      </div>
    </div>
  );
}
