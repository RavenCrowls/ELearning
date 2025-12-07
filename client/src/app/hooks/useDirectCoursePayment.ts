'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchCourse } from '@/app/services/courseService';
import { createDirectPayment } from '@/app/services/paymentService';

export interface CourseData {
    courseId: string;
    title: string;
    price: number;
    imageUrl: string;
}

export function useDirectCoursePayment() {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const [courseData, setCourseData] = React.useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingCourse, setIsLoadingCourse] = React.useState(true);

    React.useEffect(() => {
        const fetchCourseData = async () => {
            const courseId = searchParams.get('courseId');
            if (!courseId) {
                alert('Không tìm thấy thông tin khóa học');
                setIsLoadingCourse(false);
                return;
            }
            try {
                const data = await fetchCourse(Number(courseId));
                if (!data) throw new Error('Failed to fetch course');
                setCourseData({
                    courseId: data.COURSE_ID,
                    title: data.TITLE,
                    price: data.PRICE,
                    imageUrl: data.IMAGE_URL || "/course1.jpg"
                });
            } catch {
                alert('Không thể tải thông tin khóa học');
            } finally {
                setIsLoadingCourse(false);
            }
        };
        fetchCourseData();
    }, [searchParams]);

    const formatPrice = (price: number) => price.toLocaleString('vi-VN') + ' đ';

    const handlePayment = async () => {
        if (!courseData || !user) {
            alert('Thiếu thông tin khóa học hoặc người dùng!');
            return;
        }
        setIsLoading(true);
        try {
            const data = await createDirectPayment({
                courseId: courseData.courseId,
                userId: user.id,
                price: courseData.price,
                courseTitle: courseData.title
            });
            if (data?.paymentUrl) {
                window.open(data.paymentUrl, '_blank');
            } else {
                alert('Không thể tạo link thanh toán');
            }
        } catch {
            alert('Có lỗi xảy ra khi tạo thanh toán');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        courseData,
        isLoading,
        isLoadingCourse,
        formatPrice,
        handlePayment,
    };
}