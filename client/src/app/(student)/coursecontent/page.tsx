import React from 'react';
import Payment from '@/app/components/payment/Payment';
import Link from 'next/link';



export default function PaymentPage()  {
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
              <Link href="/coursefilter" className='text-blue-600 font-semibold'>Khóa học</Link>
            </li>
            <li className='mx-2 text-gray-500'>/</li>
            <li className='text-gray-500'>
              <Link href="/coursefilter" className='text-blue-600 font-semibold'>Introduction to Programming</Link>
            </li>
            <li className='mx-2 text-gray-500'>/</li>
            <li className='text-gray-500'>
              <Link href="/coursefilter" className='text-blue-600 font-semibold'>Introduction</Link>
            </li>
          </ol>
      </nav>
      <Payment />
      
    </div>
  );
};