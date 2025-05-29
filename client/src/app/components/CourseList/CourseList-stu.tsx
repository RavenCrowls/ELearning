"use client";
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseCardProgress from '../CourseCard/CourseCard-progess';

// Define a type for the course data
interface Course {
    id: string;
    title: string;
    image: string;
    price: string;
    rating: number;
    reviewCount: number;
    instructor: string;
    progress: number;
    tags: string[];
}

function mapApiCourseToCard(course: any): Course {
    return {
        id: course.COURSE_ID || course.id || '',
        title: course.TITLE || course.title || '',
        image: course.IMAGE_URL || course.image || '/course1.jpg',
        price: course.PRICE ? `${course.PRICE.toLocaleString()} ₫` : (course.price || '0 ₫'),
        rating: typeof course.RATING === 'number' ? course.RATING : (Array.isArray(course.RATING) ? Number(course.RATING[0]) : 5.0),
        reviewCount: course.ENROLLMENT_COUNT || course.reviewCount || 0,
        instructor: course.INSTRUCTOR_ID || course.instructor || 'Unknown',
        progress: typeof course.progress === 'number' ? course.progress : 0,
        tags: course.CATEGORIES || course.tags || [],
    };
}

export default function CourseListstu() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Record<string, string>>({});
    const [instructors, setInstructors] = useState<Record<string, string>>({});

    useEffect(() => {
        // Fetch all data in parallel
        Promise.all([
            fetch('http://localhost:5003/api/courses').then(res => res.json()),
            fetch('http://localhost:5004/api/categories').then(res => res.json()),
            fetch('http://localhost:5000/api/users').then(res => res.json()),
        ])
            .then(([coursesData, categoriesData, usersData]) => {
                console.log('Categories Data:', categoriesData);
                console.log('Users Data:', usersData);

                // Map category id to name
                const catMap: Record<string, string> = {};
                categoriesData.forEach((cat: any) => {
                    catMap[cat.CATEGORY_ID] = cat.NAME;
                });
                console.log('Category Map:', catMap);
                setCategories(catMap);

                // Map user id to name
                const userMap: Record<string, string> = {};
                usersData.forEach((user: any) => {
                    userMap[user.USER_ID] = user.NAME;
                });
                console.log('User Map:', userMap);
                setInstructors(userMap);

                // Build subcategory map
                const subCategoryMap: Record<string, string> = {};
                categoriesData.forEach((cat: any) => {
                    if (Array.isArray(cat.SUB_CATEGORIES)) {
                        cat.SUB_CATEGORIES.forEach((sub: any) => {
                            subCategoryMap[sub.SUB_CATEGORY_ID] = sub.NAME;
                        });
                    }
                });
                // Map courses
                setCourses(Array.isArray(coursesData) ? coursesData.map((course: any) => {
                    const instructorName = userMap[course.INSTRUCTOR_ID] || 'Unknown';
                    const categoryNames = Array.isArray(course.CATEGORIES)
                        ? course.CATEGORIES.map((id: string) => catMap[id] || id)
                        : [];
                    // For each category, find subcategories that belong to it and are in course.SUB_CATEGORIES
                    let subCategoryNames: string[] = [];
                    if (Array.isArray(course.CATEGORIES) && Array.isArray(course.SUB_CATEGORIES)) {
                        course.CATEGORIES.forEach((catId: string) => {
                            const cat = categoriesData.find((c: any) => c.CATEGORY_ID === catId);
                            if (cat && Array.isArray(cat.SUB_CATEGORIES)) {
                                cat.SUB_CATEGORIES.forEach((sub: any) => {
                                    if (course.SUB_CATEGORIES.includes(sub.SUB_CATEGORY_ID)) {
                                        subCategoryNames.push(sub.NAME);
                                    }
                                });
                            }
                        });
                    }
                    return {
                        id: course.COURSE_ID || course.id || '',
                        title: course.TITLE || course.title || '',
                        image: course.IMAGE_URL || course.image || '/course1.jpg',
                        price: course.PRICE ? `${course.PRICE.toLocaleString()} ₫` : (course.price || '0 ₫'),
                        rating: Array.isArray(course.RATING) ? Number(course.RATING[0]) : (typeof course.RATING === 'number' ? course.RATING : 5.0),
                        reviewCount: Array.isArray(course.RATING) && course.RATING.length > 1 ? Number(course.RATING[1]) : (course.ENROLLMENT_COUNT || 0),
                        instructor: instructorName,
                        progress: typeof course.progress === 'number' ? course.progress : 0,
                        tags: [...categoryNames, ...subCategoryNames],
                    };
                }) : []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6">Khóa học của bạn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <CourseCardProgress key={course.id} {...course} />
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-6">Khóa học bạn có thể sẽ hứng thú</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-6">Khóa học nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </section>
    );
}
