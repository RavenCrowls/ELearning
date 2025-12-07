'use client'

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchAllCategories } from '@/app/services/categoryService';
import { fetchEnrollmentsByUser } from '@/app/services/enrollmentService';
import { fetchCourse } from '@/app/services/courseService';

export function useStudentCoursesWithProgress() {
  const { user } = useUser();
  const [courses, setCourses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

  React.useEffect(() => {
    fetchAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  React.useEffect(() => {
    const loadCourses = async () => {
      if (!user?.id || categories.length === 0) return;
      setLoading(true);
      try {
        const enrollments = await fetchEnrollmentsByUser(user.id);
        if (!Array.isArray(enrollments) || enrollments.length === 0) {
          setCourses([]);
          setLoading(false);
          return;
        }
        const coursePromises = enrollments.map(async (enroll: any) => {
          const course = await fetchCourse(Number(enroll.COURSE_ID));
          if (!course) return null;
          const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
          const cat = categories.find((c: any) => c.CATEGORY_ID === mainCatId);
          const mainCatName = cat ? cat.NAME : null;
          const subTagNames = (() => {
            if (!cat || !cat.SUB_CATEGORIES) return [];
            return (course.SUB_CATEGORIES || []).map((subId: string) => {
              const subCat = cat.SUB_CATEGORIES.find((s: any) => s.SUB_CATEGORY_ID === subId);
              return subCat ? subCat.NAME : null;
            }).filter(Boolean);
          })();
          return {
            id: course.COURSE_ID,
            progress: enroll.PROGRESS,
            title: course.TITLE,
            description: course.DESCRIPTION,
            image: course.IMAGE_URL || '/course1.jpg',
            rating: course.RATING && course.RATING[0] ? parseFloat(course.RATING[0]) : 0,
            reviewCount: course.RATING && course.RATING[1] ? parseInt(course.RATING[1]) : 0,
            duration: course.DURATION ? `${course.DURATION} giờ` : '',
            lessons: course.NUMBER_OF_VIDEOS ? `${course.NUMBER_OF_VIDEOS} bài giảng` : '',
            tags: [mainCatName, ...subTagNames].filter(Boolean),
            subCategories: course.SUB_CATEGORIES || [],
            instructor: course.INSTRUCTOR_ID || '',
          };
        });
        let coursesWithProgress = (await Promise.all(coursePromises)).filter(Boolean) as any[];
        if (selectedCategory) {
          coursesWithProgress = coursesWithProgress.filter(course => course.tags.includes(selectedCategory));
        }
        if (selectedSubCategory) {
          coursesWithProgress = coursesWithProgress.filter(course => course.subCategories.includes(selectedSubCategory));
        }
        setCourses(coursesWithProgress);
      } catch {
        setCourses([]);
      }
      setLoading(false);
    };
    loadCourses();
  }, [user?.id, selectedCategory, selectedSubCategory, categories]);

  const subCategories = React.useMemo(() => {
    if (!selectedCategory) return [];
    const cat = categories.find((c: any) => c.CATEGORY_ID === selectedCategory);
    return cat ? cat.SUB_CATEGORIES : [];
  }, [selectedCategory, categories]);

  return {
    courses,
    loading,
    categories,
    selectedCategory, setSelectedCategory,
    selectedSubCategory, setSelectedSubCategory,
    subCategories,
  };
}
