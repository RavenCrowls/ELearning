"use client";
import React from 'react';
import Watch from '@/app/components/watchvideo/watch';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';



export default function PaymentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  // Giả lập dữ liệu khóa học
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className='bg-gray-100 py-3 px-4 pl-20 h-[5vh]'>
        <ol className='flex items-center text-sm'>
          <li className='text-gray-500 hover:text-blue-500'>
            <Link href="/" className='hover:text-blue-600'>Trang chủ</Link>
          </li>
          <li className='mx-2 text-gray-500'>/</li>
          <li className='text-gray-500 hover:text-blue-500'>
            <Link href="/coursefilter" className='hover:text-blue-600'>Khóa học</Link>
          </li>
          <li className='mx-2 text-gray-500'>/</li>
          <li className='text-gray-500 hover:text-blue-500'>
            <Link href={`/coursedetail?id=${id || ''}`} className='hover:text-blue-600'>Introduction to Programming</Link>
          </li>
          <li className='mx-2 text-gray-500'>/</li>
          <li className='text-gray-500'>
            <Link href="/coursefilter" className='text-blue-600 font-semibold'>Lesson</Link>
          </li>
        </ol>
      </nav>
      <Watch />

    </div>
  );
};