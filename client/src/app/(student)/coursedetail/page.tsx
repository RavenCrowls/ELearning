"use client";
import React from 'react';
import CourseDetails from '@/app/components/Coursedetail/detail';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/app/components/Coursedetail/Breadcrumbs';
import { fetchCourse } from '@/app/services/courseService';



export default function CoursesPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id') || '1';
  const [courseTitle, setCourseTitle] = React.useState('');

  React.useEffect(() => {
    fetchCourse(Number(courseId)).then(data => {
      setCourseTitle(data?.TITLE || '');
    });
  }, [courseId]);
  // Giả lập dữ liệu khóa học
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs courseTitle={courseTitle} />
      <CourseDetails courseId={courseId} />

    </div>
  );
};