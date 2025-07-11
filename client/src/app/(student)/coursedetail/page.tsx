"use client";
import React from 'react';
import CourseDetails from '@/app/components/Coursedetail/detail';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';



export default function CoursesPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id') || '1';
  const [courseTitle, setCourseTitle] = React.useState('');

  React.useEffect(() => {
    fetch(`http://localhost:5003/api/courses/${courseId}`)
      .then(res => res.json())
      .then(data => setCourseTitle(data?.TITLE || ''));
  }, [courseId]);
  // Giả lập dữ liệu khóa học
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className='bg-gray-100 py-3 px-4 pl-20 h-[5vh]'>
        <ol className='flex items-center text-sm'>
          <li className='text-gray-500 hover:text-blue-500'>
            <Link href="/" className='hover:text-blue-600'>Trang chủ</Link>
          </li>
          <li className='mx-2 text-gray-500'>/</li>
          <li className='text-gray-500'>
            <Link href="/coursefilter" className='hover:text-blue-600'>Khóa học</Link>
          </li>
          <li className='mx-2 text-gray-500'>/</li>
          <li>
            <Link href="" className='text-blue-600 font-semibold'>{courseTitle || 'Introduction to Programming'}</Link>
          </li>
        </ol>
      </nav>
      <CourseDetails courseId={courseId} />

    </div>
  );
};