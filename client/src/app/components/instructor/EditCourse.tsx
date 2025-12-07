'use client'

import React from 'react';
import CourseForm from './CourseForm';
import { useEditCourse } from '@/app/hooks/useEditCourse';

interface CourseData {
  _id: string;
  COURSE_ID: string;
  TITLE: string;
  INSTRUCTOR_ID: string;
  CREATED_DATE: string;
  CATEGORIES: string[];
  SUB_CATEGORIES: string[];
  RATING: string[];
  DESCRIPTION: string;
  OUTPUT: string[];
  PRICE: number;
  LEVEL: string;
  DURATION: string;
  NUMBER_OF_VIDEOS: number;
  ENROLLMENT_COUNT: number;
  APPROVAL_STATUS: string;
  STATUS: boolean;
  IMAGE_URL: string;
}

const EditCourse: React.FC = () => {
  const { courseData, loading, error } = useEditCourse();

  const handleSave = (data: any) => {
    // Handle course update logic here
    console.log('Updating course with data:', data);
    // You can add API call here to update the course
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading course data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <CourseForm
      mode="edit"
      initialData={courseData}
      onSave={handleSave}
    />
  );
};

export default EditCourse;