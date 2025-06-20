'use client';
import React from 'react';
import { User, BookOpen, GraduationCap, Plus } from 'lucide-react';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = React.useState(-1); // Bắt đầu với -1 (không có item nào active)

  const menuItems = [
    { icon: User, label: 'Profile', link:'profile-instructor' },
    { icon: BookOpen, label: 'Category', link:'category'  },
    { icon: GraduationCap, label: 'Course', link:'course-instructor'  },
    { icon: Plus, label: 'Create course', link:'create-course'  }
  ];

  // Xác định active item dựa trên URL hiện tại
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      // Tìm index của item có link khớp với current path
      const activeItemIndex = menuItems.findIndex(item => 
        currentPath === `/${item.link}` || 
        currentPath.startsWith(`/${item.link}/`) // Cho trường hợp có sub-paths
      );
      
      setActiveIndex(activeItemIndex);
      console.log('Current path:', currentPath);
      console.log('Active index:', activeItemIndex);
    }
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">ELearning</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <li key={index}>
                <a
                  href={`/${item.link}`}
                  onClick={() => handleItemClick(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;