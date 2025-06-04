'use client';

import { useState } from 'react';
import Image from 'next/image';
// import Link from 'next/link';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

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
        {/* xử lý đăng ký */}
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
            
            <div className="mb-4">
              <input
                type="FullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="FullName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            

            {/* <div className="flex justify-start mb-6">
              <button type="button" className="text-sm text-gray-600 hover:text-blue-600">
              Chọn vai trò bạn muốn đăng ký:
              </button>
            </div>
            
            <button
              type="submit"
              className="w-[49%] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
            >
              <div className='flex items-center justify-start ml-3 gap-3'>
              <div className="w-5 h-5 bg-white rounded-full"></div>
              Học viên
              </div>
              
            </button>

            <button
              type="submit"
              className="w-[49%] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <div className='flex items-center justify-start ml-3 gap-3'>
              <div className="w-5 h-5 bg-white rounded-full"></div>
              Giảng viên
              </div>
            </button> */}
          </form>
          
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center border-1 border-[#4069E5] font-bold text-[#4069E5] py-2 rounded-md hover:bg-gray-50 transition duration-200 cursor-pointer"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}