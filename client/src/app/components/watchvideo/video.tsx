'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  width?: string;
  height?: string;
  className?: string;
}

interface VideoOption {
  id: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  completed?: boolean;
}

interface LessonProps {
  lessons: VideoOption[];
  currentLesson: string;
  onLessonSelect: (lessonId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title = "Introduction",
  videoUrl,
  width = "100%",
  height = "400px",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [videoUrl]);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [volume, isMuted, playbackRate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    setIsMuted(Number(e.target.value) === 0);
  };

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaybackRate(Number(e.target.value));
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const renderVideo = () => {
    if (videoUrl) {
      return (
        <div className="relative w-full h-full" ref={containerRef}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover bg-black rounded-lg select-none pointer-events-auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            controls={true} // Restore native controls
            controlsList="nodownload" // Hide download button
            onContextMenu={e => e.preventDefault()} // Prevent right-click menu
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-lg">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-gray-300 mt-2">Chọn video để phát</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ width, height }}
    >
      {renderVideo()}
    </div>
  );
};

const LessonList: React.FC<LessonProps> = ({ lessons, currentLesson, onLessonSelect }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({ 'Introduction': true });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const section = 'Introduction';
    if (!acc[section]) acc[section] = [];
    acc[section].push(lesson);
    return acc;
  }, {} as { [key: string]: VideoOption[] });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-gray-800">Nội dung khóa học</h3>
      </div>

      <div className="h-full overflow-y-auto" style={{ maxHeight: '70vh' }}>
        {Object.entries(groupedLessons).map(([section, sectionLessons]) => (
          <div key={section} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleSection(section)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-800">{section}</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections[section] && (
              <div className="pb-2">
                {sectionLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${currentLesson === lesson.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                      }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : currentLesson === lesson.id ? (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            checked={lesson.completed}
                            onClick={e => {
                              e.stopPropagation();
                              console.log("clicked");
                            }}
                            onChange={() => { }}
                            className="absolute w-full h-full opacity-0 cursor-pointer m-0 p-0 z-10"
                            style={{ left: 0, top: 0 }}
                          />
                          {/* Custom circle, only visible when not completed */}
                          {!lesson.completed && (
                            <span className="block w-3 h-3 rounded-full bg-white"></span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${currentLesson === lesson.id ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                        {lesson.title}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoPlayerWithLessons: React.FC = () => {
  const { user } = useUser();
  const [currentLessonId, setCurrentLessonId] = useState('');
  const [lessons, setLessons] = useState<VideoOption[]>([]);
  const [lectureSections, setLectureSections] = useState<any[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [watched, setWatched] = useState<string[]>([]);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  // Add handler to toggle completed state (now inside the component)
  const handleToggleCompleted = (lessonId: string) => {
    setLessons((prevLessons: VideoOption[]) =>
      prevLessons.map((lesson: VideoOption) =>
        lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
    setLectureSections((prevSections: any[]) =>
      prevSections.map((section: any) => ({
        ...section,
        lessons: section.lessons.map((lesson: VideoOption) =>
          lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
        )
      }))
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');
    const videoIdFromUrl = params.get('video'); // Get video param
    if (!courseId || !user?.id) return;

    // Fetch enrollment for this user and course
    fetch(`http://localhost:5002/api/enrollments/user/${user.id}`)
      .then(res => res.json())
      .then((enrollments) => {
        // Find enrollment for this course
        const enrollment = Array.isArray(enrollments)
          ? enrollments.find((e: any) => e.COURSE_ID === courseId)
          : (enrollments.COURSE_ID === courseId ? enrollments : null);
        setWatched(enrollment?.WATCHED || []);
        setEnrollmentId(enrollment?.ENROLLMENT_ID || null);
      });

    // Fetch lectures for the course
    fetch(`http://localhost:5006/api/lectures/by-course/${courseId}`)
      .then(res => res.json())
      .then(async (lectures) => {
        // For each lecture, fetch its videos
        const allLessons: VideoOption[] = [];
        const sections: any[] = await Promise.all(
          lectures.map(async (lecture: any) => {
            const videos = await fetch(`http://localhost:5007/api/videos/by-lecture/${lecture.LECTURE_ID}`)
              .then(res => res.json());
            const videoOptions = videos.map((video: any) => ({
              id: video.VIDEO_ID,
              title: video.TITLE,
              videoUrl: video.URL,
              duration: video.DURATION,
              completed: watched.includes(String(video.VIDEO_ID)) // Ensure string comparison
            }));
            allLessons.push(...videoOptions);
            return {
              section: lecture.TITLE,
              lessons: videoOptions
            };
          })
        );
        setLectureSections(sections);
        setLessons(allLessons);
        // Determine which video to show
        let initialLessonId = undefined;
        if (allLessons.length > 0) {
          if (videoIdFromUrl && allLessons.some(l => l.id === videoIdFromUrl)) {
            initialLessonId = videoIdFromUrl;
          } else {
            // Find the first available video from the first lecture that has videos
            const firstSectionWithVideos = sections.find(sec => sec.lessons && sec.lessons.length > 0);
            if (firstSectionWithVideos) {
              initialLessonId = firstSectionWithVideos.lessons[0].id;
            } else {
              initialLessonId = allLessons[0].id; // fallback
            }
          }
          setCurrentLessonId(initialLessonId);
        }
        // Expand the section containing the current lesson
        if (sections.length > 0 && initialLessonId) {
          const sectionWithLesson = sections.find(sec => sec.lessons.some((l: any) => l.id === initialLessonId));
          if (sectionWithLesson) {
            setExpandedSections({ [sectionWithLesson.section]: true });
          } else {
            setExpandedSections({ [sections[0].section]: true });
          }
        }
      });
  }, [user]);

  // Update lessons' completed state when watched or lessons change
  useEffect(() => {
    setLessons((prevLessons: VideoOption[]) =>
      prevLessons.map((lesson: VideoOption) => ({
        ...lesson,
        completed: watched.includes(String(lesson.id)) // Ensure string comparison
      }))
    );
    setLectureSections((prevSections: any[]) =>
      prevSections.map((section: any) => ({
        ...section,
        lessons: section.lessons.map((lesson: VideoOption) => ({
          ...lesson,
          completed: watched.includes(String(lesson.id)) // Ensure string comparison
        }))
      }))
    );
  }, [watched, lessons.length]);

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId) || lessons[0];

  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Video Player Section - Left side (70%) */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center" style={{ minHeight: '700px', height: '70vh' }}>
          <VideoPlayer
            title={currentLesson?.title}
            videoUrl={currentLesson?.videoUrl}
            width="100%"
            height="100%"
            className="w-full h-full"
          />
          {/* Show video title under the player */}
          <div className="w-full px-8 py-4 bg-white">
            <h2 className="text-xl font-semibold text-black truncate">{currentLesson?.title}</h2>
          </div>
        </div>

        {/* Lesson List Section - Right side (30%) */}
        <div className="w-80 bg-white">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
            <div className="p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-gray-800">Nội dung khóa học</h3>
            </div>
            <div className="h-full overflow-y-auto" style={{ maxHeight: '70vh' }}>
              {lectureSections.map((section, idx) => (
                <div key={section.section} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleSectionToggle(section.section)}
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
                      {section.lessons.map((lesson: VideoOption) => (
                        <div
                          key={lesson.id}
                          className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${currentLessonId === lesson.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''}`}
                        >
                          {/* Left part: status circle */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer relative ${lesson.completed ? 'bg-blue-500' : currentLessonId === lesson.id ? 'bg-blue-500' : 'border-2 border-gray-300'}`}
                              style={{ zIndex: 0 }} // Ensure the status circle stays below popups
                              onClick={async (e) => {
                                e.stopPropagation();
                                handleToggleCompleted(lesson.id);
                                // Get courseId from URL
                                const params = new URLSearchParams(window.location.search);
                                const courseId = params.get('id');
                                // Call API to update enrollment progress
                                if (user?.id && courseId && enrollmentId) {
                                  await fetch(`http://localhost:5002/api/enrollments/progress/${enrollmentId}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      VIDEO_ID: lesson.id,
                                      COURSE_ID: courseId
                                    })
                                  });
                                }
                              }}
                            >
                              {/* Always show green check if completed, else show playing indicator if current, else blank */}
                              {lesson.completed ? (
                                // Green circle with checkmark overlay
                                <svg className="w-3 h-3 text-white z-20" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : currentLessonId === lesson.id ? (
                                // Blue circle with white center (playing)
                                <svg className="w-3 h-3 z-20" viewBox="0 0 20 20">
                                  <circle cx="10" cy="10" r="8" fill="#fff" />
                                </svg>
                              ) : null}
                              {/* Only show the white circle if not completed and not current */}
                              {!lesson.completed && currentLessonId !== lesson.id && (
                                <span className="block w-3 h-3 rounded-full bg-white z-0"></span>
                              )}
                            </div>
                          </div>
                          {/* Right part: lesson info, only this triggers lesson change */}
                          <div
                            className="flex-1 min-w-0 flex items-center justify-between cursor-pointer"
                            onClick={() => handleLessonSelect(lesson.id)}
                          >
                            <p className={`text-sm font-medium truncate ${currentLessonId === lesson.id ? 'text-blue-700' : 'text-gray-900'}`}>{lesson.title}</p>
                            <span className="text-xs text-gray-500 ml-2">{lesson.duration}</span>
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
      </div>
    </div>
  );
};

export default VideoPlayerWithLessons;
