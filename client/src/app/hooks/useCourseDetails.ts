'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { fetchCourse } from '@/app/services/courseService';
import { getUserById } from '@/app/services/userService';
import { fetchCategoryById } from '@/app/services/categoryService';
import { fetchEnrollmentsByUser } from '@/app/services/enrollmentService';
import { createCart, getUserCarts, updateCart } from '@/app/services/cartService';

export interface MappedCourse {
    title: string;
    instructor: string;
    date: string;
    rating: number;
    totalRatings: number;
    price: number;
    originalPrice: number;
    level: string;
    duration: string;
    lessons: number;
    students: number;
    tags: string[];
    imageUrl: string;
}

export function useCourseDetails(courseId: string) {
    const { user } = useUser();
    const router = useRouter();

    const [courseData, setCourseData] = useState<any>(null);
    const [instructorData, setInstructorData] = useState<any>(null);
    const [categoryData, setCategoryData] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    // Fetch course, instructor, category
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await fetchCourse(Number(courseId));
                if (cancelled) return;
                setCourseData(data);

                if (data?.INSTRUCTOR_ID) {
                    getUserById(String(data.INSTRUCTOR_ID))
                        .then(userRes => !cancelled && setInstructorData(userRes))
                        .catch(() => { /* ignore */ });
                }
                if (data?.CATEGORIES && data.CATEGORIES.length > 0) {
                    fetchCategoryById(String(data.CATEGORIES[0]))
                        .then(cat => !cancelled && setCategoryData(cat))
                        .catch(() => { /* ignore */ });
                }
            } catch {
                // ignore
            }
        })();
        return () => { cancelled = true; };
    }, [courseId]);

    // Check enrollment
    useEffect(() => {
        if (!user) return;
        let cancelled = false;
        fetchEnrollmentsByUser(user.id)
            .then(data => {
                if (cancelled) return;
                if (Array.isArray(data)) {
                    setIsEnrolled(data.some((enr: any) => String(enr.COURSE_ID) === String(courseId)));
                } else {
                    setIsEnrolled(false);
                }
            })
            .catch(() => setIsEnrolled(false));
        return () => { cancelled = true; };
    }, [user, courseId]);

    const mappedCourse: MappedCourse = useMemo(() => {
        if (!courseData) {
            return {
                title: 'Introduction to Programming',
                instructor: 'Trình Quang Hạo',
                date: '01/01/2025',
                rating: 4.0,
                totalRatings: 66,
                price: 200000,
                originalPrice: 200000,
                level: 'Người mới bắt đầu',
                duration: '60h 72m',
                lessons: 12,
                students: 30000,
                tags: ['Technique', 'Programming', 'C++'],
                imageUrl: '/course1.jpg',
            };
        }
        const tags = categoryData
            ? [
                categoryData.NAME,
                ...((categoryData.SUB_CATEGORIES || [])
                    .filter((sub: any) => (courseData.SUB_CATEGORIES || []).includes(sub.SUB_CATEGORY_ID))
                    .map((sub: any) => sub.NAME))
            ]
            : [];
        return {
            title: courseData.TITLE,
            instructor: instructorData?.NAME || '',
            date: courseData.CREATED_DATE ? new Date(courseData.CREATED_DATE).toLocaleDateString('vi-VN') : '',
            rating: courseData.RATING ? parseFloat(courseData.RATING[0]) : 0,
            totalRatings: courseData.RATING ? parseInt(courseData.RATING[1]) : 0,
            price: courseData.PRICE,
            originalPrice: courseData.PRICE,
            level: courseData.LEVEL,
            duration: courseData.DURATION,
            lessons: courseData.NUMBER_OF_VIDEOS,
            students: courseData.ENROLLMENT_COUNT,
            tags,
            imageUrl: courseData.IMAGE_URL,
        };
    }, [courseData, instructorData, categoryData]);

    const generateCartId = () => 'C' + Date.now() + Math.floor(Math.random() * 1000);

    const handleAddToCart = async () => {
        if (!user) return;
        setIsAdding(true);
        try {
            const cartData = await getUserCarts(user.id);
            let activeCarts: any[] = [];
            if (cartData && Array.isArray(cartData)) {
                activeCarts = cartData.filter((cart: any) => cart.PAYMENT_STATUS === 'pending' && cart.STATUS === true);
            }
            let activeCart: any = null;
            if (activeCarts.length > 0) {
                activeCart = activeCarts.reduce((latest, cart) => {
                    return cart.CART_ID > latest.CART_ID ? cart : latest;
                }, activeCarts[0]);
            }
            if (activeCart && activeCart.CART_ID) {
                const updatedItems = [
                    ...(activeCart.ITEMS || []),
                    {
                        COURSE_ID: courseId,
                        TITLE: mappedCourse.title,
                        PRICE: mappedCourse.price
                    }
                ];
                await updateCart(activeCart.CART_ID, {
                    ITEMS: updatedItems,
                    TOTAL_PRICE: (activeCart.TOTAL_PRICE || 0) + mappedCourse.price
                });
            } else {
                await createCart({
                    CART_ID: generateCartId(),
                    USER_ID: user.id,
                    ITEMS: [{ COURSE_ID: courseId, TITLE: mappedCourse.title, PRICE: mappedCourse.price }],
                    TOTAL_PRICE: mappedCourse.price,
                    STATUS: true,
                    PAYMENT_STATUS: 'pending'
                });
            }
        } catch {
            // ignore
        } finally {
            setIsAdding(false);
        }
    };

    const handleDirectPayment = () => {
        if (isEnrolled) return;
        router.push(`/direct-payment?courseId=${courseId}`);
    };

    return {
        mappedCourse,
        instructorData,
        isAdding,
        isEnrolled,
        handleAddToCart,
        handleDirectPayment,
    };
}