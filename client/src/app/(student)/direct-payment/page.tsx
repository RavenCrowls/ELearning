import React from 'react';
import DirectCoursePayment from '@/app/components/payment/DirectCoursePayment';
import Link from 'next/link';

export default function DirectPaymentPage() {
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
                    <li className='text-gray-500'>
                        <span className='text-blue-600 font-semibold'>Mua khóa học</span>
                    </li>
                </ol>
            </nav>
            <div className="max-w-7xl mx-auto p-4">
                <div className='flex flex-row gap-6 justify-center'>
                    <DirectCoursePayment />
                </div>
            </div>
        </div>
    );
}; 