import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { LessonSidebar } from './LessonSidebar';
import { useWatchVideo } from '@/app/hooks/useWatchVideo';

const VideoPlayerWithLessons: React.FC = () => {
  const {
    currentLessonId,
    lectureSections,
    expandedSections,
    watched,
    enrollmentId,
    currentLesson,
    isCurrentLessonLocked,
    handleLessonSelect,
    handleSectionToggle,
    toggleLessonComplete,
  } = useWatchVideo();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 bg-black flex flex-col items-center justify-center" style={{ minHeight: '700px', height: '70vh' }}>
          <VideoPlayer
            title={currentLesson?.title}
            videoUrl={isCurrentLessonLocked ? undefined : currentLesson?.videoUrl}
            width="100%"
            height="100%"
            className="w-full h-full"
          />
          <div className="w-full px-8 py-4 bg-white">
            <h2 className="text-xl font-semibold text-black truncate">{currentLesson?.title}</h2>
          </div>
        </div>
        <LessonSidebar
          sections={lectureSections}
          expandedSections={expandedSections}
          currentLessonId={currentLessonId}
          enrollmentId={enrollmentId}
          watched={watched}
          onToggleSection={handleSectionToggle}
          onSelectLesson={handleLessonSelect}
          onToggleComplete={toggleLessonComplete}
        />
      </div>
    </div>
  );
};

export default VideoPlayerWithLessons;