'use client';
import Image from 'next/image';
import { useStudyTag } from '@/app/hooks/useStudyTag';
import Link from 'next/link';

export default function NavLinkWithPopup() {
  const { isOpen, courses, loading, popupRef, handleOpenPopup, closePopup } = useStudyTag();

  // Handle navigation to learning process
  const navigateToLearning = () => {
    console.log("Navigating to learning process");
    // Add navigation logic here
    // For demo purposes, we'll just close the popup
    closePopup();
  };

  return (
    <div className="relative inline-block">
      {/* Navigation link */}
      <button
        onClick={handleOpenPopup}
        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer"
      >
        Học tập
      </button>

      {/* Popup overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-end pt-16 pr-4 z-50">
          <div
            ref={popupRef}
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-right-2 duration-200"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Khóa học của tôi</h2>
              <button
                onClick={closePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Đóng"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Course list */}
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Đang tải...</div>
              ) : courses.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Bạn chưa đăng ký khóa học nào</div>
              ) : (
                courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/coursecontent?id=${course.id}`}
                    className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    onClick={closePopup}
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/64x64/6B7280/FFFFFF?text=?";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">{course.title}</h3>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Tiến độ</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Action button */}
            <div className="p-4 bg-gray-50">
              <Link href="/enrollment">
                <button
                  onClick={navigateToLearning}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                  Chuyển đến quá trình học của tôi
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}