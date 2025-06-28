'use client'

import React from 'react'
import Image from 'next/image'

export default function Paymentdetail() {
  return (
    <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
      <div className='text-lg font-semibold mb-4'>
        Thông tin thanh toán
      </div>
      <div>
        <label className='text-sm font-semibold text-gray-700 block mb-2'>
          Họ và tên <span className='text-red-500'>*</span>
        </label>
        <input
          type="text"
          name="fullName"
          placeholder='Họ và tên'
          className='w-full px-4 py-2 border border-gray-300 focus:outline-none rounded-md mb-4 bg-[#F3F4F6]'
        />

        <label className='text-sm font-semibold text-gray-700 block mb-2'>
          Số điện thoại <span className='text-red-500'>*</span>
        </label>
        <input
          type="text"
          name="phone"
          placeholder='Số điện thoại'
          className='w-full px-4 py-2 border border-gray-300 focus:outline-none rounded-md mb-4 bg-[#F3F4F6]'
        />

        <label className='text-sm font-semibold text-gray-700 block mb-2'>
          Email <span className='text-red-500'>*</span>
        </label>
        <input
          type="text"
          name="email"
          placeholder='Email'
          className='w-full px-4 py-2 border border-gray-300 focus:outline-none rounded-md mb-4 bg-[#F3F4F6]'
        />
      </div>

      <div className='text-lg font-semibold mb-4'>
        Phương thức thanh toán
      </div>


      <div>
        <label className='flex items-center p-3  rounded-lg cursor-pointer hover:bg-gray-50 transition-colors'>
          <input
            type="radio"
            name="paymentMethod"
            value={"Quét mã VNPAY"}
            defaultChecked
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 "
          />
          <span className="ml-3 flex items-center text-sm font-medium text-gray-700">
            Quét mã VNPAY
            <Image src="/images/vnpay.png" alt="vnpay" className='h-6 w-auto ml-2' width={31} height={24} />
          </span>
        </label>
      </div>
    </div>
  )
}
