'use client';

import { useState, useRef, useEffect } from 'react';

export default function CourseCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // string now
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null); // string now
  const popupRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<{ leftColumn: { id: string; title: string; hasSubmenu: boolean }[] }>({ leftColumn: [] });
  const [submenuData, setSubmenuData] = useState<{ [key: string]: { id: string; title: string; hasSubmenu: boolean }[] }>({});

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:5004/api/categories');
        const data = await res.json();
        // Transform API data to menu structure
        const leftColumn = data.map((cat: any) => ({
          id: cat.CATEGORY_ID,
          title: cat.NAME,
          hasSubmenu: cat.SUB_CATEGORIES && cat.SUB_CATEGORIES.length > 0
        }));
        const submenu: { [key: string]: { id: string; title: string; hasSubmenu: boolean }[] } = {};
        data.forEach((cat: any) => {
          if (cat.SUB_CATEGORIES && cat.SUB_CATEGORIES.length > 0) {
            submenu[cat.CATEGORY_ID] = cat.SUB_CATEGORIES.map((sub: any) => ({
              id: sub.SUB_CATEGORY_ID,
              title: sub.NAME,
              hasSubmenu: false
            }));
          }
        });
        setCategories({ leftColumn });
        setSubmenuData(submenu);
      } catch (err) {
        // fallback or error handling
        setCategories({ leftColumn: [] });
        setSubmenuData({});
      }
    }
    fetchCategories();
  }, []);

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
  };

  // Xử lý hover vào item cột đầu
  type CategoryItem = { id: string; title: string; hasSubmenu: boolean; };
  const handleLeftColumnHover = (item: CategoryItem) => {
    setHoveredItem(item.id);
    if (item.hasSubmenu && submenuData[item.id]) {
      setActiveSubmenu(item.id);
    } else if (item.hasSubmenu) {
      // Nếu có submenu nhưng chưa có data, hiển thị placeholder
      setActiveSubmenu(item.id);
    } else {
      setActiveSubmenu(null);
    }
  };

  // Xử lý click item
  const handleItemClick = (item: { id: string; title: string; hasSubmenu?: boolean }) => {
    console.log('Clicked:', item.title);
    if (!item.hasSubmenu) {
      closePopup();
    }
  };

  // Tính toán width động
  const getPopupWidth = () => {
    if (activeSubmenu) return '600px';
    return '300px';
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
                      <span className={`text-gray-700`}>
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
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100`}
                        >
                          <span className="text-gray-700">{item.title}</span>
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