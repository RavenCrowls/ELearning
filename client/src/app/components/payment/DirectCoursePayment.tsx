"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

interface CourseData {
    courseId: string;
    title: string;
    price: number;
    imageUrl: string;
}

const DirectCoursePayment = () => {
    const { user } = useUser();
    const searchParams = useSearchParams();
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourse, setIsLoadingCourse] = useState(true);

    useEffect(() => {
        const fetchCourseData = async () => {
            const courseId = searchParams.get('courseId');
            if (!courseId) {
                alert('Không tìm thấy thông tin khóa học');
                return;
            }

            try {
                const res = await fetch(`http://localhost:5003/api/courses/${courseId}`);
                if (!res.ok) throw new Error('Failed to fetch course');
                const data = await res.json();

                setCourseData({
                    courseId: data.COURSE_ID,
                    title: data.TITLE,
                    price: data.PRICE,
                    imageUrl: data.IMAGE_URL || "/course1.jpg"
                });
            } catch (err) {
                console.error(err);
                alert('Không thể tải thông tin khóa học');
            } finally {
                setIsLoadingCourse(false);
            }
        };

        fetchCourseData();
    }, [searchParams]);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    const handlePayment = async () => {
        if (!courseData || !user) {
            alert('Thiếu thông tin khóa học hoặc người dùng!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5009/api/payment/create-qr-direct-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: courseData.courseId,
                    userId: user.id,
                    price: courseData.price,
                    courseTitle: courseData.title
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment');
            }

            const data = await response.json();

            // Open the payment link in a new tab
            if (data.paymentUrl) {
                window.open(data.paymentUrl, '_blank');
            } else {
                alert('Không thể tạo link thanh toán');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Có lỗi xảy ra khi tạo thanh toán');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingCourse) {
        return (
            <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Đang tải thông tin khóa học...</span>
                </div>
            </div>
        );
    }

    if (!courseData) {
        return (
            <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
                <div className="text-center py-8">
                    <p className="text-gray-600">Không tìm thấy thông tin khóa học</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Thanh toán khóa học</h1>

            {/* Course Information */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={courseData.imageUrl}
                            alt={courseData.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{courseData.title}</h3>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
                <span className="text-gray-600 font-medium">Khóa học</span>
                <span className="text-gray-600 font-medium">Giá tiền</span>
            </div>

            {/* Course Item */}
            <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-800">{courseData.title}</span>
                    <span className="text-gray-800 font-medium">{formatPrice(courseData.price)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">Tổng tiền</span>
                <span className="text-lg font-semibold text-gray-800">{formatPrice(courseData.price)}</span>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg mt-6 transition-colors duration-200"
            >
                {isLoading ? 'Đang xử lý...' : 'Thanh toán ngay'}
            </button>
        </div>
    )
}

export default DirectCoursePayment 