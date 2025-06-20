'use client';
import React from 'react';
import { User, BookOpen, GraduationCap, Plus } from 'lucide-react';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const menuItems = [
    { icon: User, label: 'Profile', active: true },
    { icon: BookOpen, label: 'Category', active: false },
    { icon: GraduationCap, label: 'Course', active: false },
    { icon: Plus, label: 'Create course', active: false }
  ];
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
                  href="#"
                  onClick={() => handleItemClick(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
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