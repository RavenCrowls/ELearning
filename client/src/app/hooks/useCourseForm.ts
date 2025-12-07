'use client';

import React from 'react';
import { fetchAllCategories } from '@/app/services/categoryService';
import { createCourse, updateCourse } from '@/app/services/courseService';
import { fetchLecturesByCourse, getLectureById, postLecture, putLecture, deleteLecture } from '@/app/services/lectureService';
import { deleteVideo, fetchVideosByLecture, getVideoById, postVideo, putVideo } from '@/app/services/videoService';
import { uploadImage, uploadVideo } from '@/app/services/uploadService';

export interface VideoItem {
    id: string;
    name: string;
    order: number;
    isChecked: boolean;
    duration?: string;
    url?: string;
}

export interface Lecture {
    id: string;
    name: string;
    order: number;
    videos: VideoItem[];
}

export interface SubCategory {
    id: string;
    name: string;
}

export interface Output {
    id: string;
    name: string;
}

interface UseCourseFormParams {
    mode: 'create' | 'edit';
    initialData?: any;
    instructorId?: string;
    onSave: (data: any) => void;
}

export function useCourseForm({ mode, initialData, instructorId, onSave }: UseCourseFormParams) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const fileInputsRef = React.useRef<{ [key: string]: HTMLInputElement | null }>({});

    const [courseData, setCourseData] = React.useState({
        title: initialData?.TITLE || '',
        category: initialData?.CATEGORIES?.[0] || '',
        description: initialData?.DESCRIPTION || '',
        level: initialData?.LEVEL || '',
        image: initialData?.IMAGE_URL || '',
        price: initialData?.PRICE || 0,
        duration: initialData?.DURATION || ''
    });

    const [subCategories, setSubCategories] = React.useState<SubCategory[]>([]);
    const [outputs, setOutputs] = React.useState<Output[]>([]);
    const [lectures, setLectures] = React.useState<Lecture[]>([
        { id: '1', name: '', order: 1, videos: [{ id: '1-1', name: '', order: 1, isChecked: false }] }
    ]);

    const [categories, setCategories] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const [errorRight, setErrorRight] = React.useState<string | null>(null);
    const [successRight, setSuccessRight] = React.useState<string | null>(null);
    const [isLoadingRight, setIsLoadingRight] = React.useState(false);

    React.useEffect(() => {
        fetchAllCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    React.useEffect(() => {
        if (initialData && mode === 'edit') {
            if (initialData.SUB_CATEGORIES && initialData.SUB_CATEGORIES.length > 0) {
                const initialSubCategories = initialData.SUB_CATEGORIES.map((subCatId: string, index: number) => ({
                    id: (index + 1).toString(),
                    name: subCatId
                }));
                setSubCategories(initialSubCategories);
            }
            if (initialData.OUTPUT && initialData.OUTPUT.length > 0) {
                const initialOutputs = initialData.OUTPUT.map((o: string, index: number) => ({
                    id: (index + 1).toString(),
                    name: o
                }));
                setOutputs(initialOutputs);
            }
            if (initialData.COURSE_ID) {
                (async () => {
                    try {
                        const lecturesData = await fetchLecturesByCourse(initialData.COURSE_ID);
                        const lecturesWithVideos = await Promise.all(
                            lecturesData.map(async (lecture: any) => {
                                const videosData = await fetchVideosByLecture(String(lecture.LECTURE_ID));
                                return {
                                    id: lecture.LECTURE_ID,
                                    name: lecture.TITLE,
                                    order: lecture.ORDER,
                                    videos: videosData.map((video: any) => ({
                                        id: video.VIDEO_ID,
                                        name: video.TITLE,
                                        order: video.ORDER,
                                        isChecked: !!video.FREE_TRIAL,
                                        duration: video.DURATION,
                                        url: video.URL,
                                    }))
                                } as Lecture;
                            })
                        );
                        setLectures(lecturesWithVideos);
                    } catch {
                        setLectures([]);
                    }
                })();
            }
        } else if (mode === 'create') {
            setSubCategories([{ id: '1', name: '' }]);
            setOutputs([{ id: '1', name: '' }]);
            setLectures([{ id: '1', name: '', order: 1, videos: [{ id: '1-1', name: '', order: 1, isChecked: false }] }]);
        }
    }, [initialData, mode]);

    React.useEffect(() => {
        if (success) {
            const t = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(t);
        }
    }, [success]);

    const selectedCategory = React.useMemo(() => categories.find((cat) => cat.CATEGORY_ID === courseData.category), [categories, courseData.category]);
    const subCategoryOptions = selectedCategory?.SUB_CATEGORIES || [];

    const addSubCategory = () => setSubCategories((prev) => [...prev, { id: Date.now().toString(), name: '' }]);
    const removeSubCategory = (id: string) => setSubCategories((prev) => prev.filter((s) => s.id !== id));
    const updateSubCategory = (id: string, name: string) => setSubCategories((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));

    const addOutput = () => setOutputs((prev) => [...prev, { id: Date.now().toString(), name: '' }]);
    const removeOutput = (id: string) => setOutputs((prev) => prev.filter((o) => o.id !== id));
    const updateOutput = (id: string, name: string) => setOutputs((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)));

    const addVideo = (lectureId: string) => {
        setLectures((prev) =>
            prev.map((lecture) =>
                lecture.id === lectureId
                    ? { ...lecture, videos: [...lecture.videos, { id: `${lectureId}-${Date.now()}`, name: 'New video', order: lecture.videos.length + 1, isChecked: false }] }
                    : lecture
            )
        );
        updateVideoCount();
    };

    const removeVideo = async (lectureId: string, videoId: string) => {
        const lecture = lectures.find((l) => l.id === lectureId);
        const video = lecture?.videos.find((v) => v.id === videoId);
        if (!lecture || !video) return;
        if (!window.confirm('Are you sure you want to delete this video?')) return;
        if (videoId && videoId !== '' && videoId !== '1-1') {
            try {
                await deleteVideo(videoId);
            } catch { }
        }
        setLectures((prev) => prev.map((l) => (l.id === lectureId ? { ...l, videos: l.videos.filter((v) => v.id !== videoId) } : l)));
        await updateVideoCount();
    };

    const removeLecture = async (lectureId: string) => {
        const lecture = lectures.find((l) => l.id === lectureId);
        if (!lecture) return;
        if (!window.confirm('Are you sure you want to delete this lecture?')) return;
        if (lectureId && lectureId !== '' && lectureId !== '1') {
            try {
                await deleteLecture(lectureId);
            } catch { }
        }
        setLectures((prev) => prev.filter((l) => l.id !== lectureId));
    };

    const toggleVideoCheck = (lectureId: string, videoId: string) => {
        setLectures((prev) =>
            prev.map((lecture) =>
                lecture.id === lectureId
                    ? { ...lecture, videos: lecture.videos.map((v) => (v.id === videoId ? { ...v, isChecked: !v.isChecked } : v)) }
                    : lecture
            )
        );
    };

    const addNewLecture = () => {
        setLectures((prev) => [...prev, { id: Date.now().toString(), name: 'New Lecture', order: prev.length + 1, videos: [] }]);
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const formData = {
                TITLE: courseData.title,
                CATEGORIES: courseData.category ? [courseData.category] : [],
                SUB_CATEGORIES: subCategories.map((s) => s.name).filter((n) => n !== ''),
                DESCRIPTION: courseData.description,
                OUTPUT: outputs.map((o) => o.name).filter((n) => n !== ''),
                PRICE: courseData.price,
                LEVEL: courseData.level,
                DURATION: courseData.duration,
                IMAGE_URL: courseData.image,
                lectures,
            };
            if (mode === 'edit' && initialData?.COURSE_ID) {
                const result = await updateCourse(initialData.COURSE_ID, formData);
                setSuccess('Course updated successfully!');
                console.log('Course updated:', result);
            } else {
                const now = new Date();
                const createdDate = now.toISOString().split('T')[0];
                const newCourse = {
                    COURSE_ID: Date.now().toString(),
                    TITLE: formData.TITLE,
                    INSTRUCTOR_ID: instructorId,
                    IMAGE_URL: formData.IMAGE_URL,
                    CREATED_DATE: createdDate,
                    CATEGORIES: formData.CATEGORIES,
                    SUB_CATEGORIES: formData.SUB_CATEGORIES,
                    RATING: ['0', '0'],
                    DESCRIPTION: formData.DESCRIPTION,
                    OUTPUT: formData.OUTPUT,
                    PRICE: formData.PRICE,
                    LEVEL: formData.LEVEL,
                    DURATION: formData.DURATION,
                    NUMBER_OF_VIDEOS: 0,
                    ENROLLMENT_COUNT: 0,
                    APPROVAL_STATUS: 'Approved',
                    STATUS: 1,
                };
                const result = await createCourse(newCourse);
                setSuccess('Course created successfully!');
                onSave(result);
            }
        } catch (err: any) {
            setError(err?.message || 'An error occurred while saving the course');
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(file);
            if (result?.success) {
                setCourseData((prev) => ({ ...prev, image: result.data.url }));
                setSuccess('Image uploaded successfully!');
            } else {
                throw new Error(result?.message || 'Upload failed');
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleVideoUploadClick = (lectureId: string, videoId: string) => {
        const key = `${lectureId}-${videoId}`;
        if (fileInputsRef.current[key]) {
            fileInputsRef.current[key]!.value = '';
            fileInputsRef.current[key]!.click();
        }
    };

    function formatDuration(duration: string | undefined): string {
        if (!duration) return '';
        const totalSeconds = Math.round(Number(duration));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    const handleVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, lectureId: string, videoId: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const result = await uploadVideo(file);
            setLectures((prevLectures) =>
                prevLectures.map((lecture) =>
                    lecture.id === lectureId
                        ? {
                            ...lecture,
                            videos: lecture.videos.map((video) =>
                                video.id === videoId ? { ...video, url: result.data.url, duration: result.data.duration || '' } : video
                            ),
                        }
                        : lecture
                )
            );
            const lecture = lectures.find((l) => l.id === lectureId);
            const video = lecture?.videos.find((v) => v.id === videoId);
            if (video) {
                const formattedDuration = typeof video.duration === 'number' ? formatDuration(video.duration) : video.duration;
                const videoBody = {
                    LECTURE_ID: lectureId,
                    VIDEO_ID: videoId,
                    ORDER: video.order,
                    TITLE: video.name,
                    DURATION: formattedDuration,
                    URL: result.data.url,
                    FREE_TRIAL: !!video.isChecked,
                    STATUS: 1,
                };
                const exists = await getVideoById(videoId);
                if (exists) {
                    await putVideo(videoId, videoBody);
                } else {
                    await postVideo(videoBody);
                }
            }
            await updateVideoCount();
        } catch {
            setErrorRight('Failed to upload video');
        }
    };

    const updateVideoCount = async () => {
        if (!initialData?.COURSE_ID) return;
        try {
            const totalVideos = lectures.reduce((total, lecture) => total + lecture.videos.length, 0);
            await updateCourse(initialData.COURSE_ID, { NUMBER_OF_VIDEOS: totalVideos });
        } catch (err) {
            console.error('Failed to update video count:', err);
        }
    };

    const handleSaveLecturesAndVideos = async () => {
        setIsLoadingRight(true);
        setErrorRight(null);
        setSuccessRight(null);
        try {
            const hasFreeTrial = lectures.some((lecture) => lecture.videos.some((video) => video.isChecked));
            if (!hasFreeTrial) {
                setErrorRight('There must be at least one free trial video for the course.');
                setIsLoadingRight(false);
                return;
            }
            const courseId = initialData?.COURSE_ID || '';
            for (const lecture of lectures) {
                let LECTURE_ID = lecture.id;
                if (!LECTURE_ID || LECTURE_ID === '' || LECTURE_ID === '1') {
                    LECTURE_ID = (Date.now() + Math.floor(Math.random() * 1000)).toString();
                }
                const lectureBody = {
                    COURSE_ID: courseId,
                    LECTURE_ID,
                    TITLE: lecture.name,
                    ORDER: lecture.order,
                    STATUS: 1,
                };
                const exists = await getLectureById(LECTURE_ID);
                if (exists) {
                    await putLecture(LECTURE_ID, lectureBody);
                } else {
                    await postLecture(lectureBody);
                }
                for (const video of lecture.videos) {
                    let VIDEO_ID = video.id;
                    if (!VIDEO_ID || VIDEO_ID === '' || VIDEO_ID === '1-1') {
                        VIDEO_ID = (Date.now() + Math.floor(Math.random() * 1000)).toString();
                    }
                    const formattedDuration = typeof video.duration === 'number' ? formatDuration(video.duration) : video.duration;
                    const videoBody = {
                        LECTURE_ID,
                        VIDEO_ID,
                        ORDER: video.order,
                        TITLE: video.name,
                        DURATION: formattedDuration,
                        URL: video.url,
                        FREE_TRIAL: !!video.isChecked,
                        STATUS: 1,
                    };
                    const vExists = await getVideoById(VIDEO_ID);
                    if (vExists) {
                        await putVideo(VIDEO_ID, videoBody);
                    } else {
                        await postVideo(videoBody);
                    }
                }
            }
            setSuccessRight('Lectures and videos saved successfully!');
        } catch {
            setErrorRight('Failed to save lectures or videos');
        } finally {
            setIsLoadingRight(false);
        }
    };

    return {
        // state
        courseData,
        setCourseData,
        categories,
        subCategories,
        outputs,
        lectures,
        setLectures,
        isLoading,
        error,
        success,
        isUploading,
        errorRight,
        successRight,
        isLoadingRight,
        selectedCategory,
        subCategoryOptions,
        // refs
        fileInputRef,
        fileInputsRef,
        // handlers
        addSubCategory,
        removeSubCategory,
        updateSubCategory,
        addOutput,
        removeOutput,
        updateOutput,
        addVideo,
        removeVideo,
        removeLecture,
        toggleVideoCheck,
        addNewLecture,
        handleSave,
        triggerFileInput,
        handleFileSelect,
        handleSaveLecturesAndVideos,
        handleVideoUploadClick,
        handleVideoFileSelect,
        // helpers
        formatDuration,
        setSuccessRight,
        setErrorRight,
        setIsLoadingRight,
        setSuccess,
        setError,
    };
}