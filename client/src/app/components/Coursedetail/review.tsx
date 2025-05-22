import React from 'react';
import Image from 'next/image';

export default function Review() {
    const ratingData = [
        { stars: 5, count: 420 },
        { stars: 4, count: 120 },
        { stars: 3, count: 50 },
        { stars: 2, count: 30 },
        { stars: 1, count: 200 }
    ];

    const reviews = [
    {
      id: 1,
      name: "Trinh Quang Hao",
      avatar: "/avatar.jpg",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 2,
      name: "Trinh Quang Hao",
      avatar: "/avatar.jpg",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    }
    ];

    const renderStars = (rating:number) => {
    return Array.from({ length: 5 }, (_, index) => (        

        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        <path 
          fillRule="evenodd" 
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" 
          clipRule="evenodd" 
        />
      </svg>
        ));
    };

    const getProgressWidth = (count:number) => {
        const maxCount = Math.max(...ratingData.map(item => item.count));
        return (count / maxCount) * 100;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6">
      <h2 className="text-xl font-semibold mb-6">Đánh giá</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Rating Summary */}
        <div className="flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-6 text-center min-w-48">
            <div className="text-4xl font-bold mb-2">5.0</div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <div className="text-sm text-gray-600">450 Ratings</div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1">
          <div className="space-y-3">
            {ratingData.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-sm">{item.stars}</span>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"                                         
                    className={`w-5 h-5 text-yellow-500}`}
                    >
                    <path 
                    fillRule="evenodd" 
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" 
                    clipRule="evenodd" 
                    />
                    </svg>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressWidth(item.count)}%` }}
                  ></div>
                </div>
                <div className="text-sm font-medium w-8 text-right">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="mt-8 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-t pt-6 first:border-t-0 first:pt-0">
            <div className="flex gap-4">
              <Image
                src={review.avatar} 
                alt={review.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}