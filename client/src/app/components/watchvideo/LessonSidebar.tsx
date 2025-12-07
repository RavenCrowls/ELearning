'use client';

import React from 'react';
import type { VideoOption } from '@/app/hooks/useWatchVideo';

interface LessonSidebarProps {
  sections: Array<{ section: string; lessons: VideoOption[] }>;
  expandedSections: { [key: string]: boolean };
  currentLessonId: string;
  enrollmentId: string | null;
  watched: string[];
  onToggleSection: (section: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onToggleComplete: (lessonId: string) => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  sections,
  expandedSections,
  currentLessonId,
  enrollmentId,
  watched,
  onToggleSection,
  onSelectLesson,
  onToggleComplete,
}) => {
  return (
    <div className="w-80 bg-white">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
          <h3 className="font-semibold text-gray-800">Nội dung khóa học</h3>
        </div>
        <div className="h-full overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {sections.map((section) => (
            <div key={section.section} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => onToggleSection(section.section)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-gray-800 flex items-center">
                  {section.section}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${expandedSections[section.section] ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
              {expandedSections[section.section] && (
                <div className="pb-2">
                  {section.lessons.map((lesson) => {
                    const isLocked = !lesson.freeTrial && !enrollmentId;
                    const canToggle = !!enrollmentId;
                    const isLessonCompleted = watched.includes(String(lesson.id));
                    return (
                      <div
                        key={lesson.id}
                        className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${currentLessonId === lesson.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''} ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex-shrink-0">
                          {isLocked ? (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-not-allowed bg-gray-100">
                              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                                <circle cx="12" cy="16" r="1" strokeWidth="2" />
                              </svg>
                            </div>
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center relative ${isLessonCompleted ? 'bg-blue-500' : currentLessonId === lesson.id ? 'bg-blue-500' : 'border-2 border-gray-300'} ${canToggle ? 'cursor-pointer' : 'cursor-default'}`}
                              style={{ zIndex: 0 }}
                              onClick={canToggle ? (e) => { e.stopPropagation(); onToggleComplete(lesson.id); } : undefined}
                            >
                              {isLessonCompleted ? (
                                <svg className="w-3 h-3 text-white z-20" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : currentLessonId === lesson.id ? (
                                <svg className="w-3 h-3 z-20" viewBox="0 0 20 20">
                                  <circle cx="10" cy="10" r="8" fill="#fff" />
                                </svg>
                              ) : null}
                              {!isLessonCompleted && currentLessonId !== lesson.id && (
                                <span className="block w-3 h-3 rounded-full bg-white z-0"></span>
                              )}
                            </div>
                          )}
                        </div>
                        <div
                          className={`flex-1 min-w-0 flex items-center justify-between ${isLocked ? 'pointer-events-none' : 'cursor-pointer'}`}
                          onClick={() => { if (!isLocked) onSelectLesson(lesson.id); }}
                        >
                          <p className={`text-sm font-medium truncate ${currentLessonId === lesson.id ? 'text-blue-700' : 'text-gray-900'}`}>{lesson.title}</p>
                          <span className="text-xs text-gray-500 ml-2">{lesson.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
