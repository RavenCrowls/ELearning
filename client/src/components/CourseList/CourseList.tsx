import React from 'react';
import CourseCard from '../CourseCard/CourseCard';

const DEMO_COURSES = [
    {
        id: "1",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    {
        id: "2",
        title: "Introduction to Programming",
        image: "/course1.jpg",
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
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    {
        id: "4",
        title: "Introduction to Programming",
        image: "/course1.jpg",
        price: "279.000 ₫",
        rating: 5.0,
        reviewCount: 66,
        instructor: "Trinh Quang Hao",
        tags: ["Technique", "Programming", "C++"]
    },
    // Add more demo courses as needed
];

export default function CourseList() {
    return (
        <section className="py-8">
            <h2 className="text-2xl font-semibold mb-6">Khóa học của bạn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DEMO_COURSES.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </section>
        
    );
}
