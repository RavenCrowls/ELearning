import React, { useState, useEffect } from 'react';


export default function Lesson() {
  // Track which sections are open
  const [openSections, setOpenSections] = useState([0]);
  const [courseInfo, setCourseInfo] = useState<{ NUMBER_OF_VIDEOS?: number; DURATION?: string } | null>(null);
  const [sections, setSections] = useState<any[]>([]);

  // Get course id from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      fetch(`http://localhost:5003/api/courses/${id}`)
        .then(res => res.json())
        .then(data => setCourseInfo(data))
        .catch(() => setCourseInfo(null));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      // Fetch lectures for the course
      fetch(`http://localhost:5006/api/lectures/by-course/${id}`)
        .then(res => res.json())
        .then(async (lectures) => {
          // For each lecture, fetch its videos
          const sectionPromises = lectures.map(async (lecture: any) => {
            const videos = await fetch(`http://localhost:5007/api/videos/by-lecture/${lecture.LECTURE_ID}`)
              .then(res => res.json());
            return {
              title: lecture.TITLE,
              audioItems: videos.map((video: any) => ({
                title: video.TITLE,
                duration: video.DURATION,
                locked: !video.FREE_TRIAL, // Fix: locked should be true if not free trial
                VIDEO_ID: video.VIDEO_ID // Add VIDEO_ID for navigation
              }))
            };
          });
          const sectionsData = await Promise.all(sectionPromises);
          setSections(sectionsData);
        })
        .catch(() => setSections([]));
    }
  }, []);

  // Toggle a section's open/closed state
  const toggleSection = (index: number) => {
    setOpenSections(prevOpenSections => {
      if (prevOpenSections.includes(index)) {
        return prevOpenSections.filter(i => i !== index);
      } else {
        return [...prevOpenSections, index];
      }
    });
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6 md:w-[60vw] lg:w-[45vw] xl:w-[42.5vw] mx-auto">
      <h2 className="font-bold text-lg mb-3">Danh sách bài giảng</h2>
      <p className="text-gray-700 mb-4">
        {courseInfo && courseInfo.NUMBER_OF_VIDEOS && courseInfo.DURATION
          ? `Khóa học này gồm có ${courseInfo.NUMBER_OF_VIDEOS} bài giảng với thời lượng ${courseInfo.DURATION} giờ`
          : ''}
      </p>

      <div className="w-full max-w-2xl mx-auto">
        {/* Audio Player Section */}
        <div className="w-full max-w-2xl mx-auto">
          {/* All sections */}
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b">
              <button
                className="w-full text-left flex items-center justify-between py-4"
                onClick={() => toggleSection(sectionIndex)}
              >
                <h2 className="text-xl text-blue-600 font-medium">
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
                <div className="bg-blue-50 rounded-md mb-4">
                  {section.audioItems.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="p-4 flex items-center justify-between border-b border-blue-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 mr-4 shadow-sm cursor-pointer"
                          onClick={() => {
                            const params = new URLSearchParams(window.location.search);
                            const courseId = params.get('id');
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
                      <div className="flex items-center">
                        <span className="mr-2">{item.duration}</span>
                        {item.locked && (
                          <span className="text-blue-600">
                            {/* Lock icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
                          </span>
                        )}
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