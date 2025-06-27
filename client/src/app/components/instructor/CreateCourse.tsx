'use client'

import React from 'react';
import CourseForm from './CourseForm';

const CreateCourse: React.FC = () => {
  const handleSave = (data: any) => {
    // Handle course creation logic here
    console.log('Creating course with data:', data);
    // You can add API call here to create the course
  };

  return (
    <CourseForm
      mode="create"
      onSave={handleSave}
    />
  );
};

export default CreateCourse;