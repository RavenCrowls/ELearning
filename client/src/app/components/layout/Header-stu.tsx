'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavLinkWithPopup from '@/components/pop-up/study-tag';

export default function HeaderStudent() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300">
      <div className="container max-w-none flex justify-start flex-row  items-center space-x-20 px-8 ">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          ELearning
        </Link>

        {/* Search box */}
        <div className="hidden md:block relative w-2/3">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center space-x-4">
          <Link href="/login" className="px-4 py-1.5 rounded-md hover:bg-blue-50 whitespace-nowrap">
            Các khóa học
          </Link>
          <NavLinkWithPopup />
          <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Image src="/heart.svg" alt="Favorites" width={24} height={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Image src="/bell.svg" alt="Notifications" width={24} height={24} />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200">
            <Image src="/avatar.jpg" alt="Profile" width={32} height={32} className="rounded-full" />
          </button>
        </div>
        </nav>
        </div>
    </header>
  );
}
