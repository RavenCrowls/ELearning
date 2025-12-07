'use client'

import Image from 'next/image';
import React from 'react';
import { useCart, CartItem } from '../../hooks/useCart';

interface ShoppingCartProps {
    items?: CartItem[];
}

export default function ShoppingCart({ items = [] }: ShoppingCartProps) {
    const { cartItems, totalAmount, totalItems, removeItem, clear } = useCart(items);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                        {/* Cart Items Section */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-4">
                                <div className="col-span-8 text-gray-900 font-bold">Sản phẩm</div>
                                <div className="col-span-3 text-center text-gray-900 font-bold">Giá thành</div>
                                <div className="col-span-1 text-center text-gray-900 font-bold"></div>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100">
                                        {/* Product Info */}
                                        <div className="col-span-8 flex items-center gap-4">
                                            <div className="w-20 h-14 relative flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover rounded"
                                                    onError={(e) => {
                                                        // Fallback for missing images
                                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA4MCA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjU2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAyNEg0MFYzMkgzMFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                                    }}
                                                />
                                            </div>
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                                                {item.title}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-3 text-center text-gray-400 font-medium">
                                            {formatPrice(item.price)}
                                        </div>

                                        {/* Remove Button */}
                                        <div className="col-span-1 text-center">
                                            <button
                                                onClick={() => {
                                                    const confirmDelete = window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?');
                                                    if (!confirmDelete) return;
                                                    removeItem(item.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded cursor-pointer"
                                                aria-label="Xóa sản phẩm"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Clear Cart Button */}
                            {cartItems.length > 0 && (
                                <div className="mt-8 text-end">
                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?');
                                            if (!confirmDelete) return;
                                            clear();
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-medium cursor-pointer"
                                    >
                                        Xóa giỏ hàng
                                    </button>
                                </div>
                            )}

                            {/* Empty Cart Message */}
                            {cartItems.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg">Giỏ hàng trống</p>
                                    <p className="text-sm mt-2">Thêm một số khóa học vào giỏ hàng để bắt đầu mua sắm!</p>
                                </div>
                            )}
                        </div>

                        {/* Summary Section */}
                        <div className="w-full lg:w-80">
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold mb-6 text-gray-800">Tổng số</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Số lượng khóa học:</span>
                                        <span className="font-medium">{totalItems}</span>
                                    </div>

                                    <div className="flex justify-between font-semibold text-lg pt-4 border-t border-gray-200 text-gray-800">
                                        <span>Tổng tiền:</span>
                                        <span>{formatPrice(totalAmount)}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg mt-6 transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    disabled={cartItems.length === 0}
                                    onClick={() => {
                                        if (cartItems.length > 0) {
                                            window.location.href = "/payment";
                                        }
                                    }}
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}