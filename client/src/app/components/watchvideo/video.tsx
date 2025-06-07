'use client';
import React, { useState, useRef } from 'react';

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
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
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
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <input type="checkbox" className="w-3 h-3 text-blue-600 rounded border-gray-300" />
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
  const [currentLessonId, setCurrentLessonId] = useState('1');

  const lessons: VideoOption[] = [
    {
      id: '1',
      title: 'Hollow Knight',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749289754/Hollow_Knight_2023-01-27_12-15-43_wxzihj.mp4',
      duration: '03:30',
      completed: false
    },
    {
      id: '2',
      title: 'Legends of Runeterra',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749289313/Legends_of_Runeterra_2024-11-25_17-47-17_mtfszf.mp4',
      duration: '03:30',
      completed: true
    },
    {
      id: '3',
      title: 'Red Dead Redemption 2',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749288054/Red_Dead_Redemption_2_2024-01-14_19-24-10_e6mclk.mp4',
      duration: '03:30',
      completed: false
    },
    {
      id: '4',
      title: 'Holo Cure',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749287169/HoloCure_2023-08-26_16-14-49_ciuhk1.mp4',
      duration: '03:30',
      completed: false
    },
    {
      id: '5',
      title: 'War Thunder',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749287108/War_Thunder_-_In_battle_2021-12-13_15-21-28_cuzdrr.mp4',
      duration: '03:30',
      completed: false
    },
    {
      id: '6',
      title: 'Unknown Video',
      videoUrl: 'https://res.cloudinary.com/djf63iwha/video/upload/v1749286596/na4uomtlmtvjajwtildo.mp4',
      duration: '03:30',
      completed: false
    }
  ];

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId) || lessons[0];

  const handleLessonSelect = (lessonId: string) => {
    setCurrentLessonId(lessonId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Video Player Section - Left side (70%) */}
        <div className="flex-1 bg-black flex items-center justify-center" style={{ minHeight: '700px', height: '70vh' }}>
          <VideoPlayer
            title={currentLesson.title}
            videoUrl={currentLesson.videoUrl}
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>

        {/* Lesson List Section - Right side (30%) */}
        <div className="w-80 bg-white">
          <LessonList
            lessons={lessons}
            currentLesson={currentLessonId}
            onLessonSelect={handleLessonSelect}
          />
        </div>
      </div>

      {/* Video Title Section */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
      </div>
    </div>
  );
};

export default VideoPlayerWithLessons;