'use client';

import { useCourseCategoriesMenu } from '@/app/hooks/useCourseCategoriesMenu';

export default function CourseCategories() {
  const {
    isOpen,
    hoveredItem,
    activeSubmenu,
    popupRef,
    leftColumn,
    submenuData,
    handleOpenPopup,
    closePopup,
    handleLeftColumnHover,
    handleItemClick,
    getPopupWidth,
  } = useCourseCategoriesMenu();

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
                  {leftColumn.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => handleLeftColumnHover(item)}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ${hoveredItem === item.id && item.hasSubmenu
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
                          onClick={() => handleItemClick({ ...item, parentId: activeSubmenu })}
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

          </div>
        </div>
      )}
    </div>
  );
}