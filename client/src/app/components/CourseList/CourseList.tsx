"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseCard from '../CourseCard/CourseCard';

export default function CourseList() {
    const router = useRouter();
    const [popularCourses, setPopularCourses] = useState<any[]>([]);
    const [newestCourses, setNewestCourses] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:5003/api/courses/popular')
            .then(res => res.json())
            .then(data => setPopularCourses(data))
            .catch(() => setPopularCourses([]));
        fetch('http://localhost:5003/api/courses/newest')
            .then(res => res.json())
            .then(data => setNewestCourses(data))
            .catch(() => setNewestCourses([]));
        fetch('http://localhost:5000/api/users/')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => setUsers([]));
        fetch('http://localhost:5004/api/categories/')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    function mapCourseData(course: any) {
        let instructorName = '';
        if (course.INSTRUCTOR_ID && Array.isArray(users)) {
            const user = (users as any[]).find((u) => u.USER_ID === course.INSTRUCTOR_ID || u.id === course.INSTRUCTOR_ID);
            instructorName = user && (user.NAME || user.name) ? (user.NAME || user.name) : '';
        }
        let tagNames: string[] = [];
        if (Array.isArray(categories)) {
            if (Array.isArray(course.CATEGORIES)) {
                course.CATEGORIES.forEach((catId: string) => {
                    const cat = (categories as any[]).find((c) => c.CATEGORY_ID === catId);
                    if (cat && cat.NAME) {
                        tagNames.push(cat.NAME);
                        if (Array.isArray(cat.SUB_CATEGORIES) && Array.isArray(course.SUB_CATEGORIES)) {
                            course.SUB_CATEGORIES.forEach((subId: string) => {
                                const sub = cat.SUB_CATEGORIES.find((s: any) => s.SUB_CATEGORY_ID === subId);
                                if (sub && sub.NAME) tagNames.push(sub.NAME);
                            });
                        }
                    }
                });
            }
        }
        return {
            id: course.COURSE_ID || course.id || '',
            title: course.TITLE || course.title || '',
            image: course.IMAGE_URL || course.image || '',
            price: course.PRICE !== undefined ? `${course.PRICE.toLocaleString()} ₫` : course.price || '',
            rating: course.RATING ? parseFloat(course.RATING[0]) : course.rating || 0,
            reviewCount: course.RATING ? parseInt(course.RATING[1]) : course.reviewCount || 0,
            instructor: instructorName || course.instructor || '',
            tags: tagNames.length > 0 ? tagNames : (course.tags || [])
        };
    }

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