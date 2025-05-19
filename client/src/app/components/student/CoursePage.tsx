'use client'

// import { useState } from 'react';
import React from "react";
import CourseDes from "./CourseDescription";
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


export default function CoursePage(){

    return (
        <div className='container mx-auto p-4'>
        <h1 className='text-start text-2xl font-bold text-blue-600 my-6'>Tất cả khóa học</h1>    
        
        <div className='flex flex-col md:flex-row gap-6'>
            {/* Phần bộ lọc bên trái */}
            <div className='w-full md:w-1/4 bg-white p-6 border border-gray-200 rounded-lg shadow-sm'>
                <div className='flex itemts-center justify-center text-blue-600 mb-4'>
                    <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'></path>
                    </svg>
                    <span className='font-medium'>Bộ lọc tìm kiếm</span>
                </div>

                {/* Ô tìm kiếm theo tên giảng viên */}
                <div className='mb-6'>
                    <div className='relative'>
                        <input 
                            type="text"
                            placeholder='Tên giảng viên'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Lọc theo giá */}
                <div className='mb-6'>
                    <div className='flex items-center text-blue-600 mb-3'>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">Giá khóa học</span>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='w-1/2'>
                            <input 
                                type="text"
                                placeholder='Từ'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='w-1/2'>
                            <input 
                                type="text"
                                placeholder='Đến'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                </div>

                {/* Lọc theo danh mục */}
                <div className='mb-6'>
                    <h3 className='text-blue-600 font-medium mb-3'>Thể loại</h3>
                    <div className='mb-3'>
                        <select className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value="">Chọn thể loại</option>
                            <option value="programming">Programming</option>
                            <option value="design">Desgin</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Chọn thể loại con</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="desktop">Desktop Development</option>
                        </select>
                    </div>

                    <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>
                        Áp dụng bộ lọc
                    </button>
                </div>
            </div>
            <div className='flex flex-col w-full md:w-3/4'>
                {courses.map((course) => (
                <CourseDes key={course.id} {...course}/>
            ))}
            </div>
            
                
            </div>
        </div>
    )
}