'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCourse } from '@/app/services/courseService';
import { fetchLecturesByCourse } from '@/app/services/lectureService';
import { fetchVideosByLecture } from '@/app/services/videoService';

interface CourseInfo {
    NUMBER_OF_VIDEOS?: number;
    DURATION?: string;
}

interface SectionItem {
    title: string;
    audioItems: Array<{
        title: string;
        duration: string;
        locked: boolean;
        VIDEO_ID: string;
    }>;
}

export function useLessonSections() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('id');

    const [openSections, setOpenSections] = useState<number[]>([0]);
    const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
    const [sections, setSections] = useState<SectionItem[]>([]);

    // Load course info for header text
    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        fetchCourse(Number(courseId))
            .then((data) => {
                if (!cancelled) {
                    setCourseInfo({
                        NUMBER_OF_VIDEOS: data?.NUMBER_OF_VIDEOS,
                        DURATION: data?.DURATION,
                    });
                }
            })
            .catch(() => !cancelled && setCourseInfo(null));
        return () => { cancelled = true; };
    }, [courseId]);

    // Load lectures and videos
    useEffect(() => {
        if (!courseId) return;
        let cancelled = false;
        (async () => {
            try {
                const lectures = await fetchLecturesByCourse(courseId);
                const sectionPromises = lectures.map(async (lecture: any) => {
                    const videos = await fetchVideosByLecture(String(lecture.LECTURE_ID));
                    return {
                        title: lecture.TITLE,
                        audioItems: videos.map((video: any) => ({
                            title: video.TITLE,
                            duration: video.DURATION,
                            locked: !video.FREE_TRIAL,
                            VIDEO_ID: String(video.VIDEO_ID),
                        })),
                    } as SectionItem;
                });
                const sectionsData = await Promise.all(sectionPromises);
                if (!cancelled) setSections(sectionsData);
            } catch {
                if (!cancelled) setSections([]);
            }
        })();
        return () => { cancelled = true; };
    }, [courseId]);

    const toggleSection = (index: number) => {
        setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    return {
        courseId,
        courseInfo,
        sections,
        openSections,
        toggleSection,
    };
}