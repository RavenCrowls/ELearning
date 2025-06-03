"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '../CourseCard/CourseCard';

const DEMO_COURSES = [
    {
        id: "1",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++","..."]
    },
    {
        id: "2",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++","..."]
    },
    {
        id: "3",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++","..."]
    },
    {
        id: "4",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++","..."]
    },
];

export default function CourseList() {
    const router = useRouter();

    const handleCourseClick = (courseId: string) => {
        router.push(`/coursedetail?id=${courseId}`);
    };

    const handleViewAllCourses = (category:string) => {
        router.push(`/courses?category=${category}`);
    };

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Khóa học của bạn</h2>
                <button 
                    onClick={() => handleViewAllCourses('my-courses')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DEMO_COURSES.map((course) => (
                    <div 
                        key={course.id} 
                        onClick={() => handleCourseClick(course.id)}
                        className="cursor-pointer"
                    >
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>
            
            <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-2xl font-semibold">Khóa học bạn có thể sẽ hứng thú</h2>
                <button 
                    onClick={() => handleViewAllCourses('recommended')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DEMO_COURSES.map((course) => (
                    <div 
                        key={course.id} 
                        onClick={() => handleCourseClick(course.id)}
                        className="cursor-pointer"
                    >
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-2xl font-semibold">Khóa học nổi bật</h2>
                <button 
                    onClick={() => handleViewAllCourses('featured')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DEMO_COURSES.map((course) => (
                    <div 
                        key={course.id} 
                        onClick={() => handleCourseClick(course.id)}
                        className="cursor-pointer"
                    >
                        <CourseCard {...course} />
                    </div>
                ))}
            </div>
        </section>
    );
}