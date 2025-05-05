'use client';

import { useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây
    console.log('Đăng nhập với:', { email, password });
  };

  return (
    <div className="flex min-h-screen bg-[url(/images/login-bg.png)] bg-cover bg-center bg-no-repeat">
      
    <div className="flex bg-gray-100 rounded-lg flex-col md:flex-row w-full max-w-6xl ml-[20%] mr-[20%] my-20 shadow-lg overflow-hidden">
      {/* Hình ảnh bên trái */}
      <div className="md:flex object-cover rounded-l-lg  md:w-1/2 bg-teal-600 relative">
        <div className="w-full h-full relative ">
          <Image 
            src="/images/elearning-banner.png" 
            alt="E-Learning Banner"
            layout="fill"
            objectFit="cover"
            className="opacity-90 rounded-l-lg"
          />
        </div>
      </div>

      {/* Form đăng nhập bên phải */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập vào tài khoản</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex justify-end mb-6">
              <button type="button" className="text-sm text-gray-600 hover:text-blue-600">
                Quên mật khẩu
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Đăng nhập ngay
            </button>
          </form>
          
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.5l3-3C17 1.8 14.6 1 12 1 7.5 1 3.6 3.6 1.4 7.5l3.5 2.7C6 7.4 8.8 5 12 5z"
                />
                <path
                  fill="#34A853"
                  d="M12 19c-3.2 0-6-2.4-7.1-5.8l-3.5 2.7C3.6 20.4 7.5 23 12 23c2.6 0 5-1 6.8-2.7l-3.3-2.6C14.3 18.5 13.2 19 12 19z"
                />
                <path
                  fill="#4285F4"
                  d="M22.8 12.6c0-.8-.1-1.5-.2-2.2H12v4.2h6.1c-.3 1.6-1.2 2.9-2.6 3.8l3.3 2.6C21 18.4 22.8 15.9 22.8 12.6z"
                />
                <path
                  fill="#FBBC05"
                  d="M5 10.2c-.5 1-.8 2-0.8 3.2s.3 2.2.8 3.2l3.5-2.7c-.2-.6-.3-1.2-.3-1.9 0-.7.1-1.3.3-1.9L5 10.2z"
                />
              </svg>
              Đăng nhập bằng Gmail
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}