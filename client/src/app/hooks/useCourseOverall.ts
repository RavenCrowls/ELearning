'use client';

import { useEffect, useState } from 'react';
import { fetchCourse } from '@/app/services/courseService';

interface CourseOverallData {
    DESCRIPTION?: string;
    OUTPUT?: string[];
}

export function useCourseOverall(courseId: string) {
    const [data, setData] = useState<CourseOverallData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        setLoading(true);
        fetchCourse(Number(courseId))
            .then(res => {
                if (!cancelled) setData(res || null);
            })
            .catch(() => !cancelled && setData(null))
            .finally(() => !cancelled && setLoading(false));
        return () => { cancelled = true; };
    }, [courseId]);

    return {
        description: data?.DESCRIPTION,
        output: data?.OUTPUT ?? [],
        loading,
    };
}