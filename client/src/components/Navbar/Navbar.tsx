import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-8">
        <Link href="/" className="logo">
          ELearning
        </Link>
        <div className="flex-1 max-w-xl">
          <input
            type="search"
            placeholder="Tìm kiếm khóa học..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/courses" className="hover:text-gray-600">
          Các khóa học
        </Link>
        <Link href="/study" className="hover:text-gray-600">
          Học tập
        </Link>
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
      </div>
    </nav>
  );
}
