'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchEnrollmentsByUser } from '@/app/services/enrollmentService';
import { fetchCourse } from '@/app/services/courseService';

interface StudyCourse {
  id: string;
  title: string;
  progress: number;
  image: string;
}

export function useStudyTag() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<StudyCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;
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
          return {
            id: course.COURSE_ID,
            title: course.TITLE,
            progress: enroll.PROGRESS,
            image: course.IMAGE_URL || '/course1.jpg',
          } as StudyCourse;
        });
        const coursesWithProgress = (await Promise.all(coursePromises)).filter(Boolean) as StudyCourse[];
        setCourses(coursesWithProgress);
      } catch {
        setCourses([]);
      }
      setLoading(false);
    };
    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen, user?.id]);

  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && event.target && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return {
    isOpen,
    courses,
    loading,
    popupRef,
    handleOpenPopup,
    closePopup,
  };
}
