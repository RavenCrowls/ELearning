'use client'

import React, { useEffect, useState } from "react";
import CourseDesIns from "./CourseDescription";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CoursePageIns() {
  const { user } = useUser();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Fetch full categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5004/api/categories/');
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
        const res = await fetch(`http://localhost:5003/api/courses/instructor/${user.id}`);
        const data = await res.json();
        // Map API response to CourseDesIns props
        const mappedCourses = data.map((course: any) => {
          // Map main category and subcategory names
          let tags: string[] = [];
          if (Array.isArray(categories) && Array.isArray(course.CATEGORIES)) {
            course.CATEGORIES.forEach((catId: string) => {
              const cat = categories.find((c: any) => c.CATEGORY_ID === catId);
              if (cat && cat.NAME) {
                tags.push(cat.NAME);
                if (Array.isArray(cat.SUB_CATEGORIES) && Array.isArray(course.SUB_CATEGORIES)) {
                  course.SUB_CATEGORIES.forEach((subId: string) => {
                    const sub = cat.SUB_CATEGORIES.find((s: any) => s.SUB_CATEGORY_ID === subId);
                    if (sub && sub.NAME) tags.push(sub.NAME);
                  });
                }
              }
            });
          }
          return {
            id: course.COURSE_ID,
            title: course.TITLE,
            description: course.DESCRIPTION,
            image: course.IMAGE_URL || '/course1.jpg',
            price: course.PRICE,
            rating: parseFloat(course.RATING?.[0] || '0'),
            reviewCount: parseInt(course.RATING?.[1] || '0'),
            duration: course.DURATION + ' giờ',
            lessons: course.NUMBER_OF_VIDEOS + ' bài giảng',
            tags,
            instructor: user?.fullName || user?.username || course.INSTRUCTOR_ID,
          };
        });
        setCourses(mappedCourses);
      } catch (err) {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [user?.id, categories, user?.fullName, user?.username]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/edit-course?id=${courseId}`);
  };

  return (
    <div className='max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg object-cover'>
      <h1 className=' text-2xl font-bold text-blue-600 my-6'>Your Courses</h1>
      <div className='flex flex-col md:flex-row gap-6 justify-center '>
        <div className='flex flex-col w-full md:w-full'>
          {loading ? (
            <div>Loading...</div>
          ) : courses.length === 0 ? (
            <div>No courses found.</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseDesIns {...course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}