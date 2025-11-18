'use client';

import { FC } from 'react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import Overall from './overall';
import Lesson from './lesson';
import Instructor from './instructor';
import Review from './review';
import { useCourseDetails } from '@/app/hooks/useCourseDetails';

// Define types
interface CourseProps {
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

interface CourseDetailsPageProps {
  courseId: string;
}

const CourseDetailsPage: FC<CourseDetailsPageProps> = ({ courseId }) => {
  const { mappedCourse, instructorData, isAdding, isEnrolled, handleAddToCart, handleDirectPayment } = useCourseDetails(courseId);

  // Sample course data
  const course: CourseProps = {
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
    imageUrl: '/course1.jpg'
  };
  // State for active tab and slider position
  const [activeIndex, setActiveIndex] = useState(0); // Default to "Bài giảng"
  const navRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({
    left: '0px',
    width: '0px'
  });

  const navItems = [
    { id: 0, label: 'Tổng quan' },
    { id: 1, label: 'Bài giảng' },
    { id: 2, label: 'Giảng viên' },
    { id: 3, label: 'Đánh giá' }
  ];

  // Format price to Vietnamese Dong
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };
  // State cho tag được hover
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Hàm xử lý khi hover vào tag
  const handleTagHover = (tag: string) => {
    setHoveredTag(tag);
  };

  // Hàm xử lý khi hover ra khỏi tag
  const handleTagLeave = () => {
    setHoveredTag(null);
  };

  const getTagColorClass = (tagName: string, index: number) => {
    const isHovered = hoveredTag === tagName;

    // Logic dựa trên tên tag
    if (index === 0) {
      return isHovered
        ? "bg-blue-700 text-white"
        : "bg-blue-600 text-white";
    }
    else {
      return isHovered
        ? "bg-blue-50 border border-blue-400 text-blue-700"
        : "bg-white border border-blue-300 text-blue-600";
    }
  };

  const getContentofclickedbutton = (index: number) => {
    switch (index) {
      case 0:
        return <Overall />;
      case 1:
        return <Lesson />;
      case 2:
        return <Instructor />;
      case 3:
        return <Review />;
      default:
        return null;
    }
  }

  // Position the background slider
  const updateSliderPosition = () => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll('button');
      const activeButton = buttons[activeIndex];

      if (activeButton) {
        setSliderStyle({
          left: `${activeButton.offsetLeft}px`,
          width: `${activeButton.offsetWidth}px`
        });
      }
    }
  };

  // Update slider position on mount and when active index changes
  React.useEffect(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
    return () => window.removeEventListener('resize', updateSliderPosition);
  }, [activeIndex]);

  // Map API data to UI fields
  const fallbackCourse = course;
  const displayCourse = mappedCourse || fallbackCourse;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left section (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          {/* Main course image */}
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-4">
            <Image
              src={displayCourse.imageUrl || "/course1.jpg"}
              alt={displayCourse.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Tags and rating */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {displayCourse.tags.map((tag, index) => (
              <span
                key={tag}
                className={`px-4 py-1 ${getTagColorClass(tag, index)} rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer`}
                onMouseEnter={() => handleTagHover(tag)}
                onMouseLeave={handleTagLeave}
              >
                {tag}
              </span>
            ))}
            <div className="flex items-center ml-2">
              <span className="mr-1 font-semibold">{displayCourse.rating}</span>
              <div className="flex">
                {renderStars(displayCourse.rating)}
              </div>
              <span className="ml-1 text-gray-500">({displayCourse.totalRatings})</span>
            </div>
          </div>

          {/* Course title */}
          <h1 className="text-2xl font-bold mb-4">{displayCourse.title}</h1>

          {/* Instructor and date */}
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <Image
                src={instructorData?.AVATAR || "/avatar.jpg"}
                alt={displayCourse.instructor}
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-medium">{displayCourse.instructor}</p>
              <p className="text-gray-500 text-sm">{displayCourse.date}</p>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mb-6 overflow-x-auto">
            <div
              ref={navRef}
              className="relative inline-flex bg-white rounded-full p-2 shadow-md"
            >
              {/* Background slider */}
              <div
                className="absolute top-2 bottom-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  left: sliderStyle.left,
                  width: sliderStyle.width
                }}
              />

              {/* Navigation buttons */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(item.id)}
                  className={`relative z-10 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${activeIndex === item.id ? 'text-white' : 'text-gray-600'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Active tab content */}
            <div className="w-full">
              {getContentofclickedbutton(activeIndex)}
            </div>
          </div>
        </div>

        {/* Right section (1/3 width on large screens) */}
        <div>
          {/* Course preview image */}
          <div className="mb-4 relative rounded-lg overflow-hidden h-48">
            <Image
              src={displayCourse.imageUrl || "/course1.jpg"}
              alt="Course preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Course pricing card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <h3 className="text-sm text-blue-800 mb-1">Giá của khóa học:</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(displayCourse.price)}</span>
                {displayCourse.originalPrice > displayCourse.price && (
                  <span className="ml-2 text-gray-500 line-through text-sm">
                    {formatPrice(displayCourse.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Course details */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold">Thông tin khóa học:</h3>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  <span>Trình độ:</span>
                </div>
                <span className="text-right">{displayCourse.level}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Thời lượng:</span>
                </div>
                <span className="text-right">{displayCourse.duration} giờ</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span>Bài giảng:</span>
                </div>
                <span className="text-right">{displayCourse.lessons}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                  <span>Số học viên:</span>
                </div>
                <span className="text-right">{displayCourse.students?.toLocaleString()}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                className={`flex items-center justify-center w-full py-2 border border-blue-600 rounded-md transition-colors ${isEnrolled ? 'bg-gray-300 text-gray-400 border-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                onClick={isEnrolled ? undefined : handleAddToCart}
                disabled={isAdding || isEnrolled}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {isEnrolled ? 'Đã đăng ký' : (isAdding ? 'Đang thêm...' : 'Thêm vào giỏ hàng')}
              </button>
              <button
                className={`w-full py-2 rounded-md transition-colors ${isEnrolled ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                disabled={isEnrolled}
                onClick={handleDirectPayment}
              >
                Đăng ký
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;