'use client';

import { useState } from 'react';
// import Image from 'next/image';

interface CourseCardProps {
    id: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    instructor: string;
    progress: number;
    tags: string[];
}

export default function CourseCardProgress({
    title,
    image,
    rating,
    reviewCount,
    instructor,
    progress,
    tags
}: CourseCardProps) {
    // State cho tag được hover
    const [hoveredTag, setHoveredTag] = useState<string | null>(null);
    
    // Hàm xử lý khi hover vào tag
    const handleTagHover = (tag: string) => {
        setHoveredTag(tag);
        console.log(`Hovering over tag: ${tag}`);
        // Bạn có thể thêm logic xử lý khác ở đây
    };
    
    // Hàm xử lý khi hover ra khỏi tag
    const handleTagLeave = () => {
        setHoveredTag(null);
        console.log("Not hovering any tag");
        // Bạn có thể thêm logic xử lý khác ở đây
    };

    const getTagColorClass = (tag: string) => {
        const isHovered = hoveredTag === tag;
        
        switch(tag) {
            case "Technique":
                return isHovered 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-500 text-white";
            case "Programming":
                return isHovered 
                    ? "bg-pink-50 border border-pink-300" 
                    : "bg-white border border-pink-300";
            case "C++":
                return isHovered 
                    ? "bg-blue-50 border border-blue-300" 
                    : "bg-white border border-blue-300";
            default:
                return isHovered 
                    ? "bg-gray-200" 
                    : "bg-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400">{rating.toFixed(1)} ★</span>
                    <span className="text-gray-600 ml-1">({reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span 
                            key={tag} 
                            className={`px-4 py-1 ${getTagColorClass(tag)} rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer`}
                            onMouseEnter={() => handleTagHover(tag)}
                            onMouseLeave={handleTagLeave}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-full">
                <div className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                ></div>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <p className="text-gray-600">{instructor}</p>
            </div>
        </div>
    );
}