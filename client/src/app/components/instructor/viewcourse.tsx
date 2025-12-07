'use client'

import React from "react";
import CourseDesIns from "./CourseDescription";
import { useInstructorCourses } from "@/app/hooks/useInstructorCourses";

export default function CoursePageIns() {
  const { courses, loading, handleCourseClick } = useInstructorCourses();

  return (
    <div className='max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg object-cover'>
      <h1 className=' text-2xl font-bold text-blue-600 my-6'>Your Courses</h1>
      <div className='flex flex-col md:flex-row gap-6 justify-center '>
        <div className='flex flex-col w-full md:w-full'>
          {loading ? (
            <div>Loading...</div>
          ) : courses.length === 0 ? (
            <div>No courses found.</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseDesIns {...course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}