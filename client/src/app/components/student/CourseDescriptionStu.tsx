'use client'

// import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CourseInfo {
    id: number;
    progress: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    lessons: string;
    tags: string[];
}

export default function CourseDesStu({
    id,
    title,
    progress,
    description,
    image,
    duration,
    lessons,
    tags
}: CourseInfo) {

    return (
        <div className='w-full'>
            <div key={id} className='mb-6 bg-white rounded-lg overflow-hidden border border-gray-200'>
                <div className='flex flex-col md:flex-row'>
                    {/* Image Section - Reduced width */}
                    <div className='w-full md:w-1/4 flex-shrink-0'>
                        <Link href={`/coursecontent?id=${id}`}>
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

                    {/* Content Section - Increased width */}
                    <div className="flex-1 p-4">
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex-1">
                                <Link href={`/coursecontent?id=${id}`}>
                                    <h2 className="text-xl font-bold text-blue-600 hover:text-blue-800">
                                        {title}
                                    </h2>
                                </Link>
                                <p className="text-gray-700 mt-1">{description}</p>

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

                                {/* Progress bar */}
                                <div className='bg-gray-200 rounded-full h-2 mt-4'>
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>

                                {/* Progress Text */}
                                <div className='flex justify-between mt-3 text-gray-700'>
                                    <span>Tiến độ</span>
                                    <span>{progress}%</span>
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