'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchLecturesByCourse } from '@/app/services/lectureService';
import { fetchVideosByLecture } from '@/app/services/videoService';
import { fetchEnrollmentsByUser, updateEnrollmentProgress } from '@/app/services/enrollmentService';

export interface VideoOption {
  id: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  freeTrial?: boolean;
  completed?: boolean;
}

export function useWatchVideo() {
  const { user } = useUser();
  const [currentLessonId, setCurrentLessonId] = React.useState<string>('');
  const [lessons, setLessons] = React.useState<VideoOption[]>([]);
  const [lectureSections, setLectureSections] = React.useState<Array<{ section: string; lessons: VideoOption[] }>>([]);
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({});
  const [watched, setWatched] = React.useState<string[]>([]);
  const [enrollmentId, setEnrollmentId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');
    const videoIdFromUrl = params.get('video');
    if (!courseId) return;
    (async () => {
      const lectures = await fetchLecturesByCourse(courseId);
      const allLessons: VideoOption[] = [];
      const sections: Array<{ section: string; lessons: VideoOption[] }> = [];
      for (const lecture of lectures) {
        const videos = await fetchVideosByLecture(String(lecture.LECTURE_ID));
        const videoOptions = videos.map((video: any) => ({
          id: video.VIDEO_ID,
          title: video.TITLE,
          videoUrl: video.URL,
          duration: video.DURATION,
          freeTrial: video.FREE_TRIAL,
        })) as VideoOption[];
        allLessons.push(...videoOptions);
        sections.push({ section: lecture.TITLE, lessons: videoOptions });
      }
      setLectureSections(sections);
      setLessons(allLessons);
      let initialLessonId: string | undefined = undefined;
      if (allLessons.length > 0) {
        if (videoIdFromUrl && allLessons.some(l => l.id === videoIdFromUrl)) {
          initialLessonId = videoIdFromUrl;
        } else {
          const firstSectionWithVideos = sections.find(sec => sec.lessons && sec.lessons.length > 0);
          initialLessonId = firstSectionWithVideos ? firstSectionWithVideos.lessons[0].id : allLessons[0].id;
        }
        setCurrentLessonId(initialLessonId);
      }
      if (sections.length > 0 && initialLessonId) {
        const sectionWithLesson = sections.find(sec => sec.lessons.some((l: any) => l.id === initialLessonId));
        setExpandedSections({ [sectionWithLesson ? sectionWithLesson.section : sections[0].section]: true });
      }
      if (user?.id) {
        const enrollments = await fetchEnrollmentsByUser(user.id);
        const enrollment = Array.isArray(enrollments)
          ? enrollments.find((e: any) => String(e.COURSE_ID) === String(courseId))
          : (enrollments?.COURSE_ID === courseId ? enrollments : null);
        const newWatched = enrollment?.WATCHED || [];
        setWatched(newWatched);
        setEnrollmentId(enrollment?.ENROLLMENT_ID || null);
        setLessons(prev => prev.map(l => ({ ...l, completed: newWatched.includes(String(l.id)) })));
        setLectureSections(prev =>
          prev.map(sec => ({
            ...sec,
            lessons: sec.lessons.map(l => ({ ...l, completed: newWatched.includes(String(l.id)) })),
          }))
        );
      } else {
        setEnrollmentId(null);
        setWatched([]);
        setLessons(prev => prev.map(l => ({ ...l, completed: false })));
        setLectureSections(prev => prev.map(sec => ({ ...sec, lessons: sec.lessons.map(l => ({ ...l, completed: false })) })));
      }
    })();
  }, [user]);

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId) || lessons[0];
  const isCurrentLessonLocked = currentLesson && !currentLesson.freeTrial && !enrollmentId;

  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleLessonComplete = async (lessonId: string) => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');
    if (!user?.id || !courseId || !enrollmentId) return;
    await updateEnrollmentProgress(enrollmentId, { VIDEO_ID: lessonId, COURSE_ID: courseId });
    const enrollments = await fetchEnrollmentsByUser(user.id);
    const enrollment = Array.isArray(enrollments)
      ? enrollments.find((e: any) => String(e.COURSE_ID) === String(courseId))
      : (enrollments?.COURSE_ID === courseId ? enrollments : null);
    const newWatched = enrollment?.WATCHED || [];
    setWatched(newWatched);
  };

  return {
    currentLessonId,
    lessons,
    lectureSections,
    expandedSections,
    watched,
    enrollmentId,
    currentLesson,
    isCurrentLessonLocked,
    handleLessonSelect,
    handleSectionToggle,
    toggleLessonComplete,
  };
}
