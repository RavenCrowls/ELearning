'use client';

import { useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link';

export default function NavLinkWithPopup() {
  // State để kiểm soát việc hiển thị popup
  const [isOpen, setIsOpen] = useState(false);

  // Dữ liệu mẫu cho các khóa học
  const courses = [
    {
      id: 1,
      title: 'Introduction to programing',
      progress: 30,
      image: '/course1.jpg'
    },
    {
      id: 2,
      title: 'Introduction to programing',
      progress: 30,
      image: '/course1.jpg'
    },
    {
      id: 3,
      title: 'Introduction to programing',
      progress: 30,
      image: '/course1.jpg'
    },
    {
      id: 4,
      title: 'Introduction to programing',
      progress: 30,
      image: '/course1.jpg'
    }
  ];

  // Hàm mở popup khi nhấn vào liên kết và ngăn chặn chuyển trang
  const handleOpenPopup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  // Hàm đóng popup
  const closePopup = () => {
    setIsOpen(false);
  };

  // Hàm xử lý khi nhấn nút chuyển đến quá trình học
  const navigateToLearning = () => {
    console.log("Chuyển đến quá trình học");
    // Thêm logic điều hướng tại đây, ví dụ:
    window.location.href = '/my-courses';

    closePopup();
  };

  return (
    <>
      {/* Link để mở popup thay vì chuyển trang */}
      <a href="/courses" 
         onClick={handleOpenPopup} 
         className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 whitespace-nowrap">
        Học tập
      </a>

      {/* Popup hiển thị khi isOpen = true */}
      {isOpen && (
        <div className="fixed inset-100 flex top-13 right-1.5 justify-end z-50"
             onClick={(e) => {
               // Đóng popup khi click vào phần nền bên ngoài
               if (e.target === e.currentTarget) closePopup();
             }}>
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            {/* Danh sách các khóa học */}
            <div className="max-h-96 overflow-y-auto">
              {courses.map((course) => (
                <div key={course.id} className="p-4 border-b border-gray-200 flex items-center space-x-4">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    width={64}
                    height={64}
                    objectFit='cover'
                    className="w-16 h-16 rounded-md object-cover" 
                    // Fallback image nếu ảnh không tải được
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/64";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{course.title}</h3>
                    <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Nút hành động */}
            <div className="p-4">
              <button 
                onClick={navigateToLearning}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Chuyển đến quá trình học của tôi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}