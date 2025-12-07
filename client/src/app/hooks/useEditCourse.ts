'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCourse } from '@/app/services/courseService';

export function useEditCourse() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');

  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!courseId) {
        setError('No course ID provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchCourse(Number(courseId));
        if (!data) throw new Error('Failed to fetch course data');
        setCourseData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  return { courseId, courseData, loading, error };
}