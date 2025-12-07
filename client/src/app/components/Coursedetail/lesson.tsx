'use client';

import React from 'react';
import { useLessonSections } from '@/app/hooks/useLessonSections';


export default function Lesson() {
  const { courseId, courseInfo, sections, openSections, toggleSection } = useLessonSections();


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6 w-full">
      <h2 className="font-bold text-lg mb-3">Danh sách bài giảng</h2>
      <p className="text-gray-700 mb-4">
        {courseInfo && courseInfo.NUMBER_OF_VIDEOS && courseInfo.DURATION
          ? `Khóa học này gồm có ${courseInfo.NUMBER_OF_VIDEOS} bài giảng với thời lượng ${courseInfo.DURATION} giờ`
          : ''}
      </p>

      <div className="w-full">
        {/* Audio Player Section */}
        <div className="w-full">
          {/* All sections */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b">
              <button
                className="w-full text-left flex items-center justify-between py-4"
                onClick={() => toggleSection(sectionIndex)}
              >
                <h2 className="text-xl text-blue-600 font-medium text-left ml-0">
                  {section.title}
                </h2>
                <span>
                  {/* Toggle icon */}
                  {openSections.includes(sectionIndex) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                  )}
                </span>
              </button>

              {openSections.includes(sectionIndex) && (
                <div className="bg-blue-50 rounded-md mb-4 ml-0">
                  {section.audioItems.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="p-4 flex items-center justify-between border-b border-blue-100 last:border-b-0"
                    >
                      <div className="flex items-center text-left ml-0">
                        <button
                          className={`w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 mr-4 shadow-sm cursor-pointer ${item.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={item.locked}
                          onClick={() => {
                            if (courseId && item.VIDEO_ID) {
                              window.location.href = `/coursecontent?id=${courseId}&video=${item.VIDEO_ID}`;
                            }
                          }}
                        >
                          {/* Play icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                        </button>
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center text-left ml-0">
                        {item.locked && (
                          <span className="text-blue-600 mr-2">
                            {/* Lock icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                          </span>
                        )}
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}