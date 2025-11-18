"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '../CourseCard/CourseCard';
import { useCourseList } from '@/app/hooks/useCourseList';

export default function CourseList() {
    const router = useRouter();
    const { popularCourses, newestCourses, mapCourseData } = useCourseList();

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Khóa học phổ biến</h2>
                <button
                    onClick={() => router.push('/coursefilter')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularCourses.map((course, idx) => (
                    <div
                        key={course.COURSE_ID || course.id || idx}
                        onClick={() => router.push(`/coursedetail?id=${course.COURSE_ID || course.id}`)}
                        className="cursor-pointer"
                    >
                        <CourseCard {...mapCourseData(course)} />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-2xl font-semibold">Khóa học mới nhất</h2>
                <button
                    onClick={() => router.push('/coursefilter')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newestCourses.map((course, idx) => (
                    <div
                        key={course.COURSE_ID || course.id || idx}
                        onClick={() => router.push(`/coursedetail?id=${course.COURSE_ID || course.id}`)}
                        className="cursor-pointer"
                    >
                        <CourseCard {...mapCourseData(course)} />
                    </div>
                ))}
            </div>
        </section>
    );
}