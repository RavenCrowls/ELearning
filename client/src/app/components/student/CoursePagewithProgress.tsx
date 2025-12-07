'use client'

import CourseDesStu from "./CourseDescriptionStu";
import React from "react";
import { useStudentCoursesWithProgress } from "@/app/hooks/useStudentCoursesWithProgress";

export default function CoursePage() {
    const {
        courses,
        loading,
        categories,
        selectedCategory, setSelectedCategory,
        selectedSubCategory, setSelectedSubCategory,
        subCategories
    } = useStudentCoursesWithProgress();

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-start text-2xl font-bold text-blue-600 my-6'>Tất cả khóa học của bạn</h1>

            <div className='flex flex-col md:flex-row gap-6'>

                <div className='flex flex-col w-full'>
                    {loading ? (
                        <div className="text-center text-gray-500 py-8">Đang tải...</div>
                    ) : courses.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">Bạn chưa đăng ký khóa học nào</div>
                    ) : (
                        courses.map((course) => (
                            <CourseDesStu key={course.id} {...course} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}