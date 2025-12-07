'use client';

import { useEffect, useState } from 'react';
import { fetchNewestCourses, fetchPopularCourses } from '@/app/services/courseService';
import { listUsers } from '@/app/services/userService';
import { fetchAllCategories } from '@/app/services/categoryService';

export function useCourseList() {
    const [popularCourses, setPopularCourses] = useState<any[]>([]);
    const [newestCourses, setNewestCourses] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        fetchPopularCourses().then(setPopularCourses).catch(() => setPopularCourses([]));
        fetchNewestCourses().then(setNewestCourses).catch(() => setNewestCourses([]));
        listUsers().then(setUsers).catch(() => setUsers([]));
        fetchAllCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    function mapCourseData(course: any) {
        let instructorName = '';
        if (course?.INSTRUCTOR_ID && Array.isArray(users)) {
            const user = users.find((u: any) => u.USER_ID === course.INSTRUCTOR_ID || u.id === course.INSTRUCTOR_ID);
            instructorName = user && (user.NAME || user.name) ? (user.NAME || user.name) : '';
        }
        let tagNames: string[] = [];
        if (Array.isArray(categories)) {
            if (Array.isArray(course?.CATEGORIES)) {
                course.CATEGORIES.forEach((catId: string) => {
                    const cat = categories.find((c: any) => c.CATEGORY_ID === catId);
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
            id: course?.COURSE_ID || course?.id || '',
            title: course?.TITLE || course?.title || '',
            image: course?.IMAGE_URL || course?.image || '',
            price: course?.PRICE !== undefined ? `${course.PRICE.toLocaleString()} ₫` : (course?.price || ''),
            rating: course?.RATING ? parseFloat(course.RATING[0]) : (course?.rating || 0),
            reviewCount: course?.RATING ? parseInt(course.RATING[1]) : (course?.reviewCount || 0),
            instructor: instructorName || course?.instructor || '',
            tags: tagNames.length > 0 ? tagNames : (course?.tags || [])
        };
    }

    return {
        popularCourses,
        newestCourses,
        mapCourseData,
    };
}