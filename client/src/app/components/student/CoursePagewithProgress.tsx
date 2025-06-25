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