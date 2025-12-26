'use client'

import React from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import CourseForm from './CourseForm';

const CreateCourse: React.FC = () => {
  const { isLoaded, user } = useUser();
  const instructorId = user?.id;
  const router = useRouter();

  if (!isLoaded) return <div>Loading...</div>;

  const handleSave = (data: any) => {
    router.push('/course-instructor');
  };

  return (
    <CourseForm
      mode="create"
      onSave={handleSave}
      onCancel={() => router.push("/course-instructor")}
      showLecturesColumn={true}
      instructorId={instructorId}
      variant="embedded"
    />
  );
};

export default CreateCourse;