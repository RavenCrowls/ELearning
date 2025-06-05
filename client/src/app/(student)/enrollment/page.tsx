import React from 'react';
import CoursePage from '@/app/components/student/CoursePage';
import Link from 'next/link';



export default function CoursesPage()  {
  // Giả lập dữ liệu khóa học
  return (    
    <div className="min-h-screen bg-gray-50">
      <nav className='bg-gray-100 py-3 px-4 pl-20 h-[5vh]'>
          <ol className='flex items-center text-sm'>
            <li className='text-gray-500 hover:text-blue-500'>
              <Link href="/homepage" className='hover:text-blue-600'>Trang chủ</Link>
            </li>
            <li className='mx-2 text-gray-500'>/</li>
            <li className='text-gray-500'>
              <Link href="/coursefilter" className='text-blue-600 font-semibold'>Khóa học</Link>
            </li>
          </ol>
      </nav>
      <CoursePage />
      
    </div>
  );
};