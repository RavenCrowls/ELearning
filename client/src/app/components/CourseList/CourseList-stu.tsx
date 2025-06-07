"use client";
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseCardProgress from '../CourseCard/CourseCard-progess';
import { useRouter } from 'next/navigation';

const DEMO_COURSES = [
    {
        id: "1",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        progress: 30,
        tags: ["Technique", "Programming", "C++"]
    },
    {
        id: "2",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        progress: 30,
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    {
        id: "3",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        progress: 30,
        rating: 5.0,
        reviewCount: 66,
        price: "279.000 ₫",
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    {
        id: "4",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        progress: 30,
        rating: 5.0,
        reviewCount: 66,
        price: "279.000 ₫",
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    // Add more demo courses as needed
];

export default function CourseListstu() {
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [enrolledCourseDetails, setEnrolledCourseDetails] = useState<any[]>([]); // Store detailed course info
    const [popularCourses, setPopularCourses] = useState([]);
    const [newestCourses, setNewestCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch enrolled courses for user 2
        fetch('http://localhost:5002/api/enrollments/user/2')
            .then(res => res.json())
            .then(data => setEnrolledCourses(data))
            .catch(() => setEnrolledCourses([]));
        // Fetch users
        fetch('http://localhost:5000/api/users/')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => setUsers([]));
        // Fetch categories
        fetch('http://localhost:5004/api/categories/')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
        // Fetch popular courses
        fetch('http://localhost:5003/api/courses/popular')
            .then(res => res.json())
            .then(data => setPopularCourses(data))
            .catch(() => setPopularCourses([]));
        // Fetch newest courses
        fetch('http://localhost:5003/api/courses/newest')
            .then(res => res.json())
            .then(data => setNewestCourses(data))
            .catch(() => setNewestCourses([]));
    }, []);

    // Fetch course details for each enrollment
    useEffect(() => {
        if (!enrolledCourses || enrolledCourses.length === 0) {
            setEnrolledCourseDetails([]);
            return;
        }
        let isMounted = true;
        Promise.all(
            (enrolledCourses as any[]).map((enroll) =>
                fetch(`http://localhost:5003/api/courses/${enroll.COURSE_ID}`)
                    .then(res => res.json())
                    .catch(() => null)
            )
        ).then((details) => {
            if (isMounted) {
                setEnrolledCourseDetails(details.filter(Boolean));
            }
        });
        return () => { isMounted = false; };
    }, [enrolledCourses]);

    // Helper to map API course data to CourseCard/CourseCardProgress props
    function mapCourseData(course: any, progress?: number) {
        // Find instructor name from users array
        let instructorName = '';
        if (course.INSTRUCTOR_ID && Array.isArray(users)) {
            const user = (users as any[]).find((u) => u.USER_ID === course.INSTRUCTOR_ID || u.id === course.INSTRUCTOR_ID);
            instructorName = user && (user.NAME || user.name) ? (user.NAME || user.name) : '';
        }
        // Map categories and subcategories to tag names
        let tagNames: string[] = [];
        if (Array.isArray(categories)) {
            // Only use categories that appear in course.CATEGORIES
            if (Array.isArray(course.CATEGORIES)) {
                course.CATEGORIES.forEach((catId: string) => {
                    const cat = (categories as any[]).find((c) => c.CATEGORY_ID === catId);
                    if (cat && cat.NAME) {
                        tagNames.push(cat.NAME);
                        // Only use subcategories that are inside this category and appear in course.SUB_CATEGORIES
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
            progress: progress ?? course.progress ?? 0, // Use progress from enrollment if provided
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
                <h2 className="text-2xl font-semibold">Khóa học của bạn</h2>
                <button
                    onClick={() => router.push('/coursefilter')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(enrolledCourseDetails as any[]).map((course, idx) => {
                    const enrollment = enrolledCourses.find((e: any) => e.COURSE_ID === course.COURSE_ID);
                    const progress = enrollment ? enrollment.PROGRESS : 0;
                    return course && typeof course === 'object' ? (
                        <div
                            key={course.COURSE_ID || course.id || idx}
                            onClick={() => router.push(`/coursedetail?id=${course.COURSE_ID || course.id}`)}
                            className="cursor-pointer"
                        >
                            <CourseCardProgress {...mapCourseData(course, progress)} />
                        </div>
                    ) : null;
                })}
            </div>

            <div className="flex justify-between items-center mb-6 mt-12">
                <h2 className="text-2xl font-semibold">Khóa học phổ biến</h2>
                <button
                    onClick={() => router.push('/coursefilter')}
                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                    Xem tất cả →
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(popularCourses as any[]).map((course, idx) =>
                    course && typeof course === 'object' ? (
                        <div
                            key={course.COURSE_ID || course.id || idx}
                            onClick={() => router.push(`/coursedetail?id=${course.COURSE_ID || course.id}`)}
                            className="cursor-pointer"
                        >
                            <CourseCard {...mapCourseData(course)} />
                        </div>
                    ) : null
                )}
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
                {(newestCourses as any[]).map((course, idx) =>
                    course && typeof course === 'object' ? (
                        <div
                            key={course.COURSE_ID || course.id || idx}
                            onClick={() => router.push(`/coursedetail?id=${course.COURSE_ID || course.id}`)}
                            className="cursor-pointer"
                        >
                            <CourseCard {...mapCourseData(course)} />
                        </div>
                    ) : null
                )}
            </div>
        </section>
    );
}