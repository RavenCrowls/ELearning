'use client'

import CourseDesStu from "./CourseDescriptionStu";
import React, { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';

export default function CoursePage() {
    const { user } = useUser();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5004/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!user?.id) return;
            setLoading(true);
            try {
                const enrollRes = await fetch(`http://localhost:5002/api/enrollments/user/${user.id}`);
                const enrollments = await enrollRes.json();
                if (!Array.isArray(enrollments) || enrollments.length === 0) {
                    setCourses([]);
                    setLoading(false);
                    return;
                }
                const coursePromises = enrollments.map(async (enroll: any) => {
                    const courseRes = await fetch(`http://localhost:5003/api/courses/${enroll.COURSE_ID}`);
                    const course = await courseRes.json();
                    return {
                        id: course.COURSE_ID,
                        progress: enroll.PROGRESS,
                        title: course.TITLE,
                        description: course.DESCRIPTION,
                        image: course.IMAGE_URL || '/course1.jpg',
                        rating: course.RATING && course.RATING[0] ? parseFloat(course.RATING[0]) : 0,
                        reviewCount: course.RATING && course.RATING[1] ? parseInt(course.RATING[1]) : 0,
                        duration: course.DURATION ? `${course.DURATION} giờ` : '',
                        lessons: course.NUMBER_OF_VIDEOS ? `${course.NUMBER_OF_VIDEOS} bài giảng` : '',
                        tags: [
                            (() => {
                                // Get the main category name from the first CATEGORY_ID in course.CATEGORIES
                                const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
                                const cat = categories.find((c: any) => c.CATEGORY_ID === mainCatId);
                                return cat ? cat.NAME : null;
                            })(),
                            // Only subcategory names that belong to the main category
                            ...(() => {
                                const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
                                const cat = categories.find((c: any) => c.CATEGORY_ID === mainCatId);
                                if (!cat || !cat.SUB_CATEGORIES) return [];
                                return (course.SUB_CATEGORIES || []).map((subId: string) => {
                                    const subCat = cat.SUB_CATEGORIES.find((sub: any) => sub.SUB_CATEGORY_ID === subId);
                                    return subCat ? subCat.NAME : null;
                                }).filter(Boolean);
                            })()
                        ].filter(Boolean),
                        subCategories: course.SUB_CATEGORIES || [],
                        instructor: course.INSTRUCTOR_ID || '',
                    };
                });
                let coursesWithProgress = await Promise.all(coursePromises);
                // Filter by selected category and subcategory if selected
                if (selectedCategory) {
                    coursesWithProgress = coursesWithProgress.filter(course =>
                        course.tags.includes(selectedCategory)
                    );
                }
                if (selectedSubCategory) {
                    coursesWithProgress = coursesWithProgress.filter(course =>
                        course.subCategories.includes(selectedSubCategory)
                    );
                }
                setCourses(coursesWithProgress);
            } catch (err) {
                setCourses([]);
            }
            setLoading(false);
        };
        fetchCourses();
    }, [user?.id, selectedCategory, selectedSubCategory]);

    // Get subcategories for selected category
    const subCategories = React.useMemo(() => {
        if (!selectedCategory) return [];
        const cat = categories.find((c: any) => c.CATEGORY_ID === selectedCategory);
        return cat ? cat.SUB_CATEGORIES : [];
    }, [selectedCategory, categories]);

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

                    {/* Lọc theo danh mục */}
                    <div className='mb-6'>
                        <h3 className='text-blue-600 font-medium mb-3'>Thể loại</h3>
                        <div className='mb-3'>
                            <select
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={selectedCategory}
                                onChange={e => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedSubCategory('');
                                }}
                            >
                                <option value="">Chọn thể loại</option>
                                {categories.map((cat: any) => (
                                    <option key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>{cat.NAME}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedSubCategory}
                                onChange={e => setSelectedSubCategory(e.target.value)}
                                disabled={!selectedCategory}
                            >
                                <option value="">Chọn thể loại con</option>
                                {subCategories.map((sub: any) => (
                                    <option key={sub.SUB_CATEGORY_ID} value={sub.SUB_CATEGORY_ID}>{sub.NAME}</option>
                                ))}
                            </select>
                        </div>
                        <button className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200' onClick={() => { }}>
                            Áp dụng bộ lọc
                        </button>
                    </div>
                </div>
                <div className='flex flex-col w-full md:w-3/4'>
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