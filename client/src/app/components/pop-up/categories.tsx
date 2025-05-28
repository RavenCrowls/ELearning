'use client';

import { useState, useRef, useEffect } from 'react';

export default function CourseCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number | string | null>(null);
  const [activeThirdLevel, setActiveThirdLevel] = useState<string | number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Dữ liệu cho các submenu
  type SubmenuEntry = { id: number | string; title: string; hasSubmenu: boolean };
  const submenuData: { [key: string]: SubmenuEntry[] } = {
    2: [ // Certification preparation
      { id: 'cert-1', title: 'AWS Certification', hasSubmenu: true },
      { id: 'cert-2', title: 'Microsoft Azure', hasSubmenu: true },
      { id: 'cert-3', title: 'Google Cloud', hasSubmenu: false },
      { id: 'cert-4', title: 'CompTIA', hasSubmenu: false },
    ],
    3: [ // Phát triển
      { id: 16, title: 'Phát triển web', hasSubmenu: true },
      { id: 17, title: 'Khoa học dữ liệu', hasSubmenu: true },
      { id: 18, title: 'Phát triển ứng dụng di động', hasSubmenu: true },
      { id: 19, title: 'Ngôn ngữ lập trình', hasSubmenu: true },
      { id: 20, title: 'Phát triển trò chơi', hasSubmenu: true },
      { id: 21, title: 'Thiết kế & Phát triển cơ sở dữ liệu', hasSubmenu: true },
      { id: 22, title: 'Kiểm tra phần mềm', hasSubmenu: true },
      { id: 23, title: 'Kỹ thuật phần mềm', hasSubmenu: true },
      { id: 24, title: 'Công cụ phát triển phần mềm', hasSubmenu: true},
      { id: 25, title: 'Viết phần mềm không cần biết lập trình', hasSubmenu: true }
    ],
    4: [ // Kinh doanh
      { id: 'bus-1', title: 'Quản lý dự án', hasSubmenu: true },
      { id: 'bus-2', title: 'Khởi nghiệp', hasSubmenu: false },
      { id: 'bus-3', title: 'Lãnh đạo', hasSubmenu: false },
      { id: 'bus-4', title: 'Bán hàng', hasSubmenu: true },
    ],
    5: [ // Tài chính & Kế toán
      { id: 'fin-1', title: 'Kế toán cơ bản', hasSubmenu: false },
      { id: 'fin-2', title: 'Đầu tư chứng khoán', hasSubmenu: true },
      { id: 'fin-3', title: 'Quản lý tài chính', hasSubmenu: false },
    ],
    6: [ // CNTT & Phần mềm
      { id: 'it-1', title: 'An ninh mạng', hasSubmenu: true },
      { id: 'it-2', title: 'Quản trị hệ thống', hasSubmenu: false },
      { id: 'it-3', title: 'Mạng máy tính', hasSubmenu: true },
    ]
  };

  // Dữ liệu cho submenu cấp 3
  const thirdLevelData: { [key: string]: { id: string | number; title: string }[] } = {
    16: [ // Phát triển web
      { id: 'web-1', title: 'HTML & CSS' },
      { id: 'web-2', title: 'JavaScript' },
      { id: 'web-3', title: 'React' },
      { id: 'web-4', title: 'Vue.js' },
      { id: 'web-5', title: 'Node.js' },
    ],
    17: [ // Khoa học dữ liệu
      { id: 'ds-1', title: 'Python for Data Science' },
      { id: 'ds-2', title: 'Machine Learning' },
      { id: 'ds-3', title: 'Data Visualization' },
      { id: 'ds-4', title: 'SQL' },
    ],
    24: [ // Công cụ phát triển phần mềm
      { id: 26, title: 'Popular topics' },
      { id: 27, title: 'Docker' },
      { id: 28, title: 'Git' },
      { id: 29, title: 'Kỹ thuật tạo lệnh' },
      { id: 30, title: 'Kubernetes' },
      { id: 31, title: 'GitHub Copilot' },
      { id: 32, title: 'JIRA' },
      { id: 33, title: 'GitHub' },
      { id: 34, title: 'CI/CD (Tích hợp/Phân phối liên tục)' },
      { id: 35, title: 'Confluence' }
    ],
    'cert-1': [ // AWS Certification
      { id: 'aws-1', title: 'AWS Cloud Practitioner' },
      { id: 'aws-2', title: 'AWS Solutions Architect' },
      { id: 'aws-3', title: 'AWS Developer' },
    ],
    'cert-2': [ // Microsoft Azure
      { id: 'az-1', title: 'Azure Fundamentals' },
      { id: 'az-2', title: 'Azure Administrator' },
      { id: 'az-3', title: 'Azure Developer' },
    ]
  };

  // Dữ liệu cột đầu
  const categories = {
    leftColumn: [
      { id: 1, title: 'Browse Certifications', hasSubmenu: false },
      { id: 2, title: 'Certification preparation', hasSubmenu: true },
      { id: 3, title: 'Phát triển', hasSubmenu: true},
      { id: 4, title: 'Kinh doanh', hasSubmenu: true },
      { id: 5, title: 'Tài chính & Kế toán', hasSubmenu: true },
      { id: 6, title: 'CNTT & Phần mềm', hasSubmenu: true },
      { id: 7, title: 'Năng suất văn phòng', hasSubmenu: true },
      { id: 8, title: 'Phát triển cá nhân', hasSubmenu: true },
      { id: 9, title: 'Thiết kế', hasSubmenu: true },
      { id: 10, title: 'Marketing', hasSubmenu: true },
      { id: 11, title: 'Phong cách sống', hasSubmenu: true },
      { id: 12, title: 'Nhiếp ảnh & Video', hasSubmenu: true },
      { id: 13, title: 'Sức khỏe & Thể dục', hasSubmenu: true },
      { id: 14, title: 'Âm nhạc', hasSubmenu: true },
      { id: 15, title: 'Giảng dạy & Học thuật', hasSubmenu: true }
    ]
  };

  // Mở popup
  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  // Đóng popup
  const closePopup = () => {
    setIsOpen(false);
    setHoveredItem(null);
    setActiveSubmenu(null);
    setActiveThirdLevel(null);
  };

  // Xử lý hover vào item cột đầu
  type CategoryItem = { id: number; title: string; hasSubmenu: boolean; };
  const handleLeftColumnHover = (item: CategoryItem) => {
    setHoveredItem(item.id);
    if (item.hasSubmenu && submenuData[item.id as keyof typeof submenuData]) {
      setActiveSubmenu(item.id);
      setActiveThirdLevel(null);
    } else if (item.hasSubmenu) {
      // Nếu có submenu nhưng chưa có data, hiển thị placeholder
      setActiveSubmenu(item.id);
      setActiveThirdLevel(null);
    } else {
      setActiveSubmenu(null);
      setActiveThirdLevel(null);
    }
  };

  // Xử lý hover vào item cột giữa
  type SubmenuItem = { id: number | string; title: string; hasSubmenu: boolean; };
  const handleMiddleColumnHover = (item: SubmenuItem) => {
    if (item.hasSubmenu && thirdLevelData[item.id]) {
      setActiveThirdLevel(item.id);
    } else {
      setActiveThirdLevel(null);
    }
  };

  // Xử lý leave hover
  // const handleColumnLeave = () => {
    // Không reset ngay lập tức để tránh flickering
  // };

  // Xử lý click item
  const handleItemClick = (item: { id: number | string; title: string; hasSubmenu?: boolean }) => {
    console.log('Clicked:', item.title);
    if (!item.hasSubmenu) {
      closePopup();
    }
  };

  // Đóng khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && event.target && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Đóng khi nhấn Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Tính toán width động
  const getPopupWidth = () => {
    if (activeThirdLevel) return '900px';
    if (activeSubmenu) return '600px';
    return '300px';
  };

  return (
    <div className="relative inline-block">
      {/* Navigation link */}
      <button
        onClick={handleOpenPopup}
        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer"
      >
        Thể loại
      </button>

      {/* Popup overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-start ml-15 pt-20 z-50">
          <div 
            ref={popupRef}
            className="bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in duration-200"
            style={{
              width: getPopupWidth(),
              transition: 'width 0.2s ease-in-out'
            }}
          >
            {/* Main content - dynamic columns */}
            <div className="flex">
              {/* Left Column - Always visible */}
              <div className="w-80 border-r border-gray-200">
                <div className="p-4 max-h-96 overflow-y-auto">
                  {categories.leftColumn.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => handleLeftColumnHover(item)}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ${
                        hoveredItem === item.id && item.hasSubmenu
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className={`${item.id === 1 ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                      {item.hasSubmenu && (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column - Show when hovering any item with submenu */}
              {activeSubmenu && (
                <div className="w-80 border-r border-gray-200 animate-in slide-in-from-right duration-200">
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {submenuData[activeSubmenu] ? (
                      submenuData[activeSubmenu].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => handleMiddleColumnHover(item)}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ${
                            item.id === activeThirdLevel
                              ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-100'
                          }`}
                        >
                          <span className="text-gray-700">{item.title}</span>
                          {item.hasSubmenu && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))
                    ) : (
                      // Placeholder khi chưa có data
                      <div className="p-3 text-gray-500 text-center">
                        Submenu đang được phát triển...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Right Column - Show when hovering items with third level */}
              {activeThirdLevel && thirdLevelData[activeThirdLevel] && (
                <div className="w-80 animate-in slide-in-from-right duration-200">
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {thirdLevelData[activeThirdLevel].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      >
                        <span className={`${item.id === 26 ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
              aria-label="Đóng"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}