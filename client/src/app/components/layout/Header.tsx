'use client';

import Link from 'next/link';
import { useState } from 'react';
import CourseCategories from '../pop-up/categories';
import { useRouter } from "next/navigation";


export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/coursefilter?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300">
      <div className="container max-w-none flex justify-start flex-row  items-center space-x-5 px-8 ">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          ELearning
        </Link>
        <CourseCategories />
        {/* Search box */}
        <div className="hidden md:block relative w-2/3">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400 cursor-pointer" onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center space-x-4">
          <Link href="/coursefilter" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer">
            Các khóa học
          </Link>
          <Link href="/sign-in" className="bg-white text-blue-600 border border-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-50 whitespace-nowrap">
            Đăng nhập
          </Link>
          <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 whitespace-nowrap">
            Đăng ký
          </Link>
        </nav>
      </div>
    </header>
  );
}