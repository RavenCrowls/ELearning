'use client'

import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  selected?: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

export default function CourseContent() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'section1',
      title: 'Introduction',
      expanded: true,
      lessons: [
        { id: 'lesson1', title: 'Introduction', duration: '03:30', completed: false },
        { id: 'lesson2', title: 'Introduction', duration: '03:30', completed: true }
      ]
    },
    {
      id: 'section2', 
      title: 'Introduction',
      expanded: true,
      lessons: [
        { id: 'lesson3', title: 'Introduction', duration: '03:30', completed: false },
        { id: 'lesson4', title: 'Introduction', duration: '03:30', completed: false }
      ]
    },
    {
      id: 'section3',
      title: 'Introduction', 
      expanded: true,
      lessons: [
        { id: 'lesson5', title: 'Introduction', duration: '03:30', completed: false, selected: true },
        { id: 'lesson6', title: 'Introduction', duration: '03:30', completed: true }
      ]
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const toggleLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            lessons: section.lessons.map(lesson =>
              lesson.id === lessonId
                ? { ...lesson, completed: !lesson.completed }
                : lesson
            )
          }
        : section
    ));
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-700">Nội dung khóa học</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 bg-gray-100 flex items-center justify-between hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <span className="text-sm font-bold text-gray-700">{section.title}</span>
              {/* {section.expanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )} */}
            </button>

            {/* Lessons */}
            {section.expanded && (
              <div className="bg-white">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      lesson.selected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                    }`}
                    onClick={() => toggleLesson(section.id, lesson.id)}
                  >
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mr-3">
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        lesson.completed 
                          ? lesson.selected 
                            ? 'border-white bg-white' 
                            : 'border-blue-500 bg-blue-500'
                          : lesson.selected
                            ? 'border-white'
                            : 'border-gray-300'
                      }`}>
                        {lesson.completed && (
                          <svg className={`w-3 h-3 ${lesson.selected ? 'text-blue-500' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Lesson Title */}
                    <div className="flex-1">
                      <span className={`text-sm ${lesson.selected ? 'text-white' : 'text-gray-700'}`}>
                        {lesson.title}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex-shrink-0 ml-3">
                      <span className={`text-sm ${lesson.selected ? 'text-white' : 'text-gray-500'}`}>
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}