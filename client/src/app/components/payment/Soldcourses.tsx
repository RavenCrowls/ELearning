import React from 'react'

const Soldcourses = () => {
  const cartItems = [
    { id: 1, name: 'Introduction to programming', price: 200000 },
    { id: 2, name: 'Introduction to programming', price: 200000 },
    { id: 3, name: 'Introduction to programming', price: 200000 },
    { id: 4, name: 'Introduction to programming', price: 200000 }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className='bg-white w-full max-w-xl lg:max-w-2xl border-gray-700 p-4 rounded-lg shadow-sm mb-6 mt-6'>
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Sản phẩm</h1>
      
      {/* Table Header */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
        <span className="text-gray-600 font-medium">Sản phẩm</span>
        <span className="text-gray-600 font-medium">Giá tiền</span>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div 
            key={item.id}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-800">{item.name}</span>
            <span className="text-gray-800 font-medium">{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-800">Tổng tiền</span>
        <span className="text-lg font-semibold text-gray-800">{formatPrice(totalPrice)}</span>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg mt-6 transition-colors duration-200">
        Thanh toán
      </button>
    </div>
  )
}

export default Soldcourses
