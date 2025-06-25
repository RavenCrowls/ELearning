"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinkWithPopup from "@/app/components/pop-up/study-tag";
import CourseCategories from "../pop-up/categories";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk, useUser, useAuth } from "@clerk/nextjs";

export default function HeaderStudent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/avatar.jpg");
  const router = useRouter();
  const clerk = useClerk();
  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch user info from your API and set avatar
  useEffect(() => {
    async function fetchUser() {
      if (user && user.id) {
        const token = await getToken();
        fetch(`http://localhost:5000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.AVATAR) {
              setAvatarUrl(data.AVATAR);
            }
          })
          .catch(() => {
            setAvatarUrl("/avatar.jpg");
          });
      }
    }
    fetchUser();
  }, [user, getToken]);

  const handleLogout = () => {
    clerk.signOut();
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
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center space-x-4">
          <Link
            href="/coursefilter"
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Các khóa học
          </Link>
          <NavLinkWithPopup />
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="px-4 py-1.5 rounded-md hover:bg-blue-50 whitespace-nowrap"
            >
              <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </button>
            </Link>
            <button
              className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center cursor-pointer"
              onClick={() => {
                router.push("/profile");
              }}
              title="Go to profile"
            >
              <Image
                src={avatarUrl}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full aspect-square object-cover"
              />
            </button>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              <button
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
