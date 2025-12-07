'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { fetchAllCategories } from '@/app/services/categoryService';
import { fetchCoursesByInstructor } from '@/app/services/courseService';

export function useInstructorCourses() {
  const { user } = useUser();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchAllCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const data = await fetchCoursesByInstructor(user.id);
        const mappedCourses = (data || []).map((course: any) => {
          let tags: string[] = [];
          if (Array.isArray(categories) && Array.isArray(course.CATEGORIES)) {
            course.CATEGORIES.forEach((catId: string) => {
              const cat = categories.find((c: any) => c.CATEGORY_ID === catId);
              if (cat?.NAME) {
                tags.push(cat.NAME);
                if (Array.isArray(cat.SUB_CATEGORIES) && Array.isArray(course.SUB_CATEGORIES)) {
                  course.SUB_CATEGORIES.forEach((subId: string) => {
                    const sub = cat.SUB_CATEGORIES.find((s: any) => s.SUB_CATEGORY_ID === subId);
                    if (sub?.NAME) tags.push(sub.NAME);
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
      } catch {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [user?.id, categories, user?.fullName, user?.username]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/edit-course?id=${courseId}`);
  };

  return {
    courses,
    loading,
    handleCourseClick,
  };
}