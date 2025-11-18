'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { fetchEnrollmentsByUser } from '@/app/services/enrollmentService';
import { fetchCourse, fetchNewestCourses, fetchPopularCourses } from '@/app/services/courseService';
import { listUsers } from '@/app/services/userService';
import { fetchAllCategories } from '@/app/services/categoryService';

export function useStudentCourseLists() {
    const router = useRouter();
    const { user } = useUser();
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [enrolledCourseDetails, setEnrolledCourseDetails] = useState<any[]>([]);
    const [popularCourses, setPopularCourses] = useState<any[]>([]);
    const [newestCourses, setNewestCourses] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        fetchEnrollmentsByUser(user.id)
            .then(data => setEnrolledCourses(Array.isArray(data) ? data : []))
            .catch(() => setEnrolledCourses([]));
        listUsers().then(setUsers).catch(() => setUsers([]));
        fetchAllCategories().then(setCategories).catch(() => setCategories([]));
        fetchPopularCourses().then(setPopularCourses).catch(() => setPopularCourses([]));
        fetchNewestCourses().then(setNewestCourses).catch(() => setNewestCourses([]));
    }, [user]);

    useEffect(() => {
        if (!enrolledCourses || enrolledCourses.length === 0) {
            setEnrolledCourseDetails([]);
            return;
        }
        let isMounted = true;
        Promise.all(
            enrolledCourses.map((enroll: any) =>
                fetchCourse(Number(enroll.COURSE_ID)).catch(() => null)
            )
        ).then((details) => {
            if (isMounted) {
                setEnrolledCourseDetails(Array.isArray(details) ? details.filter(Boolean) : []);
            }
        });
        return () => { isMounted = false; };
    }, [enrolledCourses]);

    function mapCourseData(course: any, progress?: number) {
        let instructorName = '';
        if (course?.INSTRUCTOR_ID && Array.isArray(users)) {
            const u = users.find((usr: any) => usr.USER_ID === course.INSTRUCTOR_ID || usr.id === course.INSTRUCTOR_ID);
            instructorName = u && (u.NAME || u.name) ? (u.NAME || u.name) : '';
        }
        let tagNames: string[] = [];
        if (Array.isArray(categories)) {
            if (Array.isArray(course?.CATEGORIES)) {
                course.CATEGORIES.forEach((catId: string) => {
                    const cat = categories.find((c: any) => c.CATEGORY_ID === catId);
                    if (cat?.NAME) {
                        tagNames.push(cat.NAME);
                        if (Array.isArray(cat.SUB_CATEGORIES) && Array.isArray(course.SUB_CATEGORIES)) {
                            course.SUB_CATEGORIES.forEach((subId: string) => {
                                const sub = cat.SUB_CATEGORIES.find((s: any) => s.SUB_CATEGORY_ID === subId);
                                if (sub?.NAME) tagNames.push(sub.NAME);
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
            progress: progress ?? course?.progress ?? 0,
            price: course?.PRICE !== undefined ? `${course.PRICE.toLocaleString()} ₫` : (course?.price || ''),
            rating: course?.RATING ? parseFloat(course.RATING[0]) : (course?.rating || 0),
            reviewCount: course?.RATING ? parseInt(course.RATING[1]) : (course?.reviewCount || 0),
            instructor: instructorName || course?.instructor || '',
            tags: tagNames.length > 0 ? tagNames : (course?.tags || []),
        };
    }

    return {
        router,
        enrolledCourses,
        enrolledCourseDetails,
        popularCourses,
        newestCourses,
        mapCourseData,
    };
}