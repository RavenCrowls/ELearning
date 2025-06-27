'use client'

// import { useState } from 'react';
import React from "react";
import CourseDesIns from "./CourseDescription";
import Link from "next/link";
const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Course for beginners who want to learn how to program',
    image: '/course1.jpg',
    price: 250000,
    rating: 5.0,
    reviewCount: 66,
    duration: '50 giờ',
    lessons: '30 bài giảng',
    tags: ['Technique', 'Programming', 'C++'],
    instructor: 'Trình Quang Hạo'
  },
  {
    id: 2,
    title: 'Introduction to Programming',
    description: 'Course for beginners who want to learn how to program',
    image: '/course1.jpg',
    price: 250000,
    rating: 5.0,
    reviewCount: 66,
    duration: '50 giờ',
    lessons: '30 bài giảng',
    tags: ['Technique', 'Programming', 'C++'],
    instructor: 'Trình Quang Hạo'
  },
  // Thêm các khóa học khác tương tự nếu cần
];


export default function CoursePageIns() {

  return (
    <div className='container mx-auto p-4 bg-white shadow-md rounded-lg object-cover'>
      <h1 className=' text-2xl font-bold text-blue-600 my-6'>Your Courses</h1>

      <div className='flex flex-col md:flex-row gap-6 justify-center '>

        <div className='flex flex-col w-full md:w-full'>
          {courses.map((course) => (
            <CourseDesIns key={course.id} {...course} />
          ))}
        </div>


      </div>
    </div>
  )
}