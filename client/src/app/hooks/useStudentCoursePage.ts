'use client'

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchAllCourses, filterCourses, searchCourses } from '@/app/services/courseService';
import { listUsers } from '@/app/services/userService';
import { fetchAllCategories } from '@/app/services/categoryService';

export function useStudentCoursePage() {
    const [courses, setCourses] = React.useState<any[]>([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [category, setCategory] = React.useState('');
    const [subCategory, setSubCategory] = React.useState('');
    const [subCategories, setSubCategories] = React.useState<any[]>([]);
    const [instructor, setInstructor] = React.useState('');
    const [minPrice, setMinPrice] = React.useState('');
    const [maxPrice, setMaxPrice] = React.useState('');

    const searchParams = useSearchParams();
    const router = useRouter();

    // Search by name
    React.useEffect(() => {
        const search = searchParams.get('search');
        if (!search) return;
        (async function fetchSearchResults() {
            try {
                const [data, usersData, categoriesData] = await Promise.all([
                    searchCourses(search ?? ''),
                    listUsers(),
                    fetchAllCategories(),
                ]);
                const userMap: Record<string, string> = {};
                (usersData || []).forEach((user: any) => {
                    userMap[user.USER_ID] = user.NAME;
                });
                const categoryMap: Record<string, any> = {};
                (categoriesData || []).forEach((cat: any) => {
                    categoryMap[cat.CATEGORY_ID] = cat;
                });
                const mappedCourses = (data || []).map((course: any) => {
                    const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
                    const cat = categoryMap[mainCatId];
                    const mainCatName = cat ? cat.NAME : null;
                    let subCategoryNames: string[] = [];
                    if (cat && cat.SUB_CATEGORIES && course.SUB_CATEGORIES) {
                        subCategoryNames = course.SUB_CATEGORIES.map((subId: string) => {
                            const subCat = cat.SUB_CATEGORIES.find((sub: any) => sub.SUB_CATEGORY_ID === subId);
                            return subCat ? subCat.NAME : null;
                        }).filter(Boolean);
                    }
                    return {
                        id: course.COURSE_ID,
                        title: course.TITLE,
                        description: course.DESCRIPTION,
                        image: course.IMAGE_URL,
                        price: course.PRICE,
                        rating: course.RATING && course.RATING[0] ? parseFloat(course.RATING[0]) : 0,
                        reviewCount: course.RATING && course.RATING[1] ? parseInt(course.RATING[1]) : 0,
                        duration: course.DURATION ? `${course.DURATION} giờ` : '',
                        lessons: course.NUMBER_OF_VIDEOS ? `${course.NUMBER_OF_VIDEOS} bài giảng` : '',
                        tags: [mainCatName, ...subCategoryNames].filter(Boolean),
                        instructor: userMap[course.INSTRUCTOR_ID] || course.INSTRUCTOR_ID
                    };
                });
                setCourses(mappedCourses);
            } catch (err) {
                setCourses([]);
            }
        })();
    }, [searchParams]);

    // Preload categories
    React.useEffect(() => {
        fetchAllCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);

    // Initialize category/subCategory from URL and apply filter
    React.useEffect(() => {
        if (categories.length === 0) return;
        const search = searchParams.get('search');
        if (search) return;
        const cat = searchParams.get('category');
        const subCat = searchParams.get('subcategory');
        if (cat) setCategory(cat);
        if (subCat) setSubCategory(subCat);
        if (cat) {
            handleApplyFilter(cat, subCat || undefined);
        }
    }, [searchParams, categories.length]);

    // Fetch all when no filter present
    React.useEffect(() => {
        const search = searchParams.get('search');
        if (search) return;
        const cat = searchParams.get('category');
        const subCat = searchParams.get('subcategory');
        if (cat || subCat) return;
        (async function fetchAll() {
            try {
                const [coursesData, usersData, categoriesData] = await Promise.all([
                    fetchAllCourses(),
                    listUsers(),
                    fetchAllCategories(),
                ]);
                const userMap: Record<string, string> = {};
                (usersData || []).forEach((user: any) => {
                    userMap[user.USER_ID] = user.NAME;
                });
                const categoryMap: Record<string, any> = {};
                (categoriesData || []).forEach((cat: any) => {
                    categoryMap[cat.CATEGORY_ID] = cat;
                });
                const mappedCourses = (coursesData || []).map((course: any) => {
                    const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
                    const cat = categoryMap[mainCatId];
                    const mainCatName = cat ? cat.NAME : null;
                    let subCategoryNames: string[] = [];
                    if (cat && cat.SUB_CATEGORIES && course.SUB_CATEGORIES) {
                        subCategoryNames = course.SUB_CATEGORIES.map((subId: string) => {
                            const subCat = cat.SUB_CATEGORIES.find((sub: any) => sub.SUB_CATEGORY_ID === subId);
                            return subCat ? subCat.NAME : null;
                        }).filter(Boolean);
                    }
                    return {
                        id: course.COURSE_ID,
                        title: course.TITLE,
                        description: course.DESCRIPTION,
                        image: course.IMAGE_URL,
                        price: course.PRICE,
                        rating: course.RATING && course.RATING[0] ? parseFloat(course.RATING[0]) : 0,
                        reviewCount: course.RATING && course.RATING[1] ? parseInt(course.RATING[1]) : 0,
                        duration: course.DURATION ? `${course.DURATION} giờ` : '',
                        lessons: course.NUMBER_OF_VIDEOS ? `${course.NUMBER_OF_VIDEOS} bài giảng` : '',
                        tags: [mainCatName, ...subCategoryNames].filter(Boolean),
                        instructor: userMap[course.INSTRUCTOR_ID] || course.INSTRUCTOR_ID
                    };
                });
                setCourses(mappedCourses);
            } catch {
                setCourses([]);
            }
        })();
    }, [searchParams, categories]);

    // Update subcategories when category changes
    React.useEffect(() => {
        if (!category) {
            setSubCategories([]);
            setSubCategory('');
            return;
        }
        const cat = categories.find((c: any) => c.CATEGORY_ID === category);
        setSubCategories(cat && cat.SUB_CATEGORIES ? cat.SUB_CATEGORIES : []);
        const urlSubCat = searchParams.get('subcategory');
        if (
            urlSubCat &&
            cat &&
            cat.SUB_CATEGORIES &&
            cat.SUB_CATEGORIES.some((sub: any) => sub.SUB_CATEGORY_ID === urlSubCat)
        ) {
            setSubCategory(urlSubCat);
        } else {
            setSubCategory('');
        }
    }, [category, categories, searchParams]);

    // Fetch filtered courses when filters present in URL
    React.useEffect(() => {
        const search = searchParams.get('search');
        if (search) return;
        const cat = searchParams.get('category');
        const subCat = searchParams.get('subcategory');
        const instructorParam = searchParams.get('instructor');
        const minPriceParam = searchParams.get('minPrice');
        const maxPriceParam = searchParams.get('maxPrice');
        if (!cat && !subCat && !instructorParam && !minPriceParam && !maxPriceParam) return;
        (async function fetchFiltered() {
            try {
                const params = new URLSearchParams();
                if (cat) params.append('category', cat);
                if (subCat) params.append('subcategory', subCat);
                if (instructorParam) params.append('instructor', instructorParam);
                if (minPriceParam) params.append('minPrice', minPriceParam);
                if (maxPriceParam) params.append('maxPrice', maxPriceParam);
                const [coursesData, usersData, categoriesData] = await Promise.all([
                    filterCourses(params),
                    listUsers(),
                    fetchAllCategories(),
                ]);
                const userMap: Record<string, string> = {};
                (usersData || []).forEach((user: any) => {
                    userMap[user.USER_ID] = user.NAME;
                });
                const categoryMap: Record<string, any> = {};
                (categoriesData || []).forEach((cat: any) => {
                    categoryMap[cat.CATEGORY_ID] = cat;
                });
                const mappedCourses = (coursesData || []).map((course: any) => {
                    const mainCatId = Array.isArray(course.CATEGORIES) ? course.CATEGORIES[0] : course.CATEGORIES;
                    const cat = categoryMap[mainCatId];
                    const mainCatName = cat ? cat.NAME : null;
                    let subCategoryNames: string[] = [];
                    if (cat && cat.SUB_CATEGORIES && course.SUB_CATEGORIES) {
                        subCategoryNames = course.SUB_CATEGORIES.map((subId: string) => {
                            const subCat = cat.SUB_CATEGORIES.find((sub: any) => sub.SUB_CATEGORY_ID === subId);
                            return subCat ? subCat.NAME : null;
                        }).filter(Boolean);
                    }
                    return {
                        id: course.COURSE_ID,
                        title: course.TITLE,
                        description: course.DESCRIPTION,
                        image: course.IMAGE_URL,
                        price: course.PRICE,
                        rating: course.RATING && course.RATING[0] ? parseFloat(course.RATING[0]) : 0,
                        reviewCount: course.RATING && course.RATING[1] ? parseInt(course.RATING[1]) : 0,
                        duration: course.DURATION ? `${course.DURATION} giờ` : '',
                        lessons: course.NUMBER_OF_VIDEOS ? `${course.NUMBER_OF_VIDEOS} bài giảng` : '',
                        tags: [mainCatName, ...subCategoryNames].filter(Boolean),
                        instructor: userMap[course.INSTRUCTOR_ID] || course.INSTRUCTOR_ID
                    };
                });
                setCourses(mappedCourses);
            } catch {
                setCourses([]);
            }
        })();
    }, [searchParams, categories]);

    const handleApplyFilter = async (catOverride?: string, subCatOverride?: string) => {
        const params = new URLSearchParams();
        if (instructor) params.append('instructor', instructor);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        const catToUse = catOverride !== undefined ? catOverride : category;
        const subCatToUse = subCatOverride !== undefined ? subCatOverride : subCategory;
        if (catToUse) params.append('category', catToUse);
        if (subCatToUse) params.append('subcategory', subCatToUse);
        router.push(`/coursefilter?${params.toString()}`);
    };

    return {
        courses,
        categories,
        category, setCategory,
        subCategory, setSubCategory,
        subCategories,
        instructor, setInstructor,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        handleApplyFilter,
    };
}
