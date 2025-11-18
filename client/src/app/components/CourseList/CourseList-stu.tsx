"use client";
import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseCardProgress from '../CourseCard/CourseCard-progess';
import { useStudentCourseLists } from '@/app/hooks/useStudentCourseLists';

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
    const { router, enrolledCourses, enrolledCourseDetails, popularCourses, newestCourses, mapCourseData } = useStudentCourseLists();

    return (
        <section className="py-8">
            {Array.isArray(enrolledCourseDetails) && enrolledCourseDetails.length > 0 && (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Khóa học của bạn</h2>
                        <button
                            onClick={() => router.push('/enrollment')}
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
                                    onClick={() => router.push(`/coursecontent?id=${course.COURSE_ID || course.id}`)}
                                    className="cursor-pointer"
                                >
                                    <CourseCardProgress {...mapCourseData(course, progress)} />
                                </div>
                            ) : null;
                        })}
                    </div>
                </>
            )}

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