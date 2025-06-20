'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavLinkWithPopup from '@/app/components/pop-up/study-tag';
import CourseCategories from '../pop-up/categories';
import { LogOut } from 'lucide-react';

export default function HeaderInstructor() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <header className="bg-[#F9FAFB] py-4 top-0 z-10 transition-all duration-300">
      <div className="container max-w-none flex justify-end flex-row  items-center space-x-5 px-8  ">

          <div className="flex items-end  gap-4">
          {/* Profile and Logout */}
          <button className="w-8 h-8 rounded-full ">
            <Image src="/avatar.jpg" alt="Profile" width={32} height={32} className="rounded-full" />
          </button>
          <Link href="/" className="text-gray-600 hover:text-blue-600">
          <span className="text-sm font-medium mb-5">Trình Quang Hạo</span>
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer ">
            
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
          </Link>
          
        </div>
        </div>
    </header>
  );
}
