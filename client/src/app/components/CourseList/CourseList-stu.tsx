"use client";
import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseCardProgress from '../CourseCard/CourseCard-progess';

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

const ENROLLED_COURSE = DEMO_COURSES; // Courses the user is enrolled in
const POPULAR_COURSE = DEMO_COURSES; // Popular courses (replace with real data)
const NEWEST_COURSE = DEMO_COURSES; // Newest courses (replace with real data)

export default function CourseListstu() {
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
        return {
            id: course.COURSE_ID || course.id || '',
            title: course.TITLE || course.title || '',
            image: course.IMAGE_URL || course.image || '',
            progress: progress ?? course.progress ?? 0, // Use progress from enrollment if provided
            price: course.PRICE !== undefined ? `${course.PRICE.toLocaleString()} ₫` : course.price || '',
            rating: course.RATING ? parseFloat(course.RATING[0]) : course.rating || 0,
            reviewCount: course.RATING ? parseInt(course.RATING[1]) : course.reviewCount || 0,
            instructor: instructorName || course.instructor || '',
            tags: course.tags || [] // You may want to map CATEGORIES/SUB_CATEGORIES to names using categories
        };
    }

    return (
        <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6">Khóa học của bạn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(enrolledCourseDetails as any[]).map((course, idx) => {
                    const enrollment = enrolledCourses.find((e: any) => e.COURSE_ID === course.COURSE_ID);
                    const progress = enrollment ? enrollment.PROGRESS : 0;
                    return course && typeof course === 'object' ? (
                        <CourseCardProgress key={course.COURSE_ID || course.id || idx} {...mapCourseData(course, progress)} />
                    ) : null;
                })}
            </div>

            <h2 className="text-2xl font-semibold mb-6">Khóa học bạn có thể sẽ hứng thú</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(popularCourses as any[]).map((course, idx) =>
                    course && typeof course === 'object' ? (
                        <CourseCard key={course.COURSE_ID || course.id || idx} {...mapCourseData(course)} />
                    ) : null
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-6">Khóa học nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(newestCourses as any[]).map((course, idx) =>
                    course && typeof course === 'object' ? (
                        <CourseCard key={course.COURSE_ID || course.id || idx} {...mapCourseData(course)} />
                    ) : null
                )}
            </div>
        </section>
    );
}