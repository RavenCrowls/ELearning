'use client'

// import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface CourseInfo {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    reviewCount: number;
    duration: string;
    lessons: string;
    instructor: string;
    tags: string[];
}

export default function CourseDesIns({
    id,
    title,
    description,
    image,
    price,
    rating,
    reviewCount,
    duration,
    lessons,
    instructor,
    tags
}: CourseInfo){

    return (
        
            <div className='w-full '>
                <div key={id} className='mb-6 bg-white rounded-lg overflow-hidden border border-gray-200'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-1/3'>
                        <Link href={`/course/${id}`}>
                            <div className='h-48 md:h-full relative'>
                            <Image
                                src={image}
                                alt={title}
                                layout='fill'
                                objectFit='cover'
                            />
                            </div>
                        </Link>
                        </div>
                        <div className="w-full md:w-2/3 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/courses/${id}`}>
                        <h2 className="text-xl font-bold text-blue-600 hover:text-blue-800">
                          {title}
                        </h2>
                      </Link>
                      <p className="text-gray-700 mt-1">{description}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center mt-2">
                        <span className="font-semibold mr-1">{rating.toFixed(1)}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
                      </div>
                      
                      {/* Thời lượng */}
                      <div className="text-gray-700 mt-2">
                        Thời lượng: {duration} • {lessons}
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Instructor */}
                      <div className="mt-3 text-gray-700">{instructor}</div>
                    </div>
                    
                    {/* Price */}
                    {/* <div className='w-1/3'></div> */}

                    <div className="text-right">
                      <div className="text-blue-700 font-bold">
                        {price.toLocaleString()} đ
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>

                {/* Divider between courses */}
                <div className="border-t border-gray-200 my-4"></div>
            </div>
    )
}