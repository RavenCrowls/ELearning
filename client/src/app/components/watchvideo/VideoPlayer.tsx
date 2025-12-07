'use client';

import React from 'react';

interface VideoPlayerProps {
  title?: string;
  videoUrl?: string;
  width?: string;
  height?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title = 'Introduction',
  videoUrl,
  width = '100%',
  height = '400px',
  className = '',
}) => {
  return (
    <div
      className={`bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ width, height }}
    >
      {videoUrl ? (
        <div className="relative w-full h-full">
          <video
            key={videoUrl || 'no-video'}
            className="w-full h-full object-cover bg-black rounded-lg select-none pointer-events-auto"
            preload="metadata"
            controls={true}
            controlsList="nodownload"
            onContextMenu={e => e.preventDefault()}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center rounded-lg">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg font-medium">{title}</p>
            <p className="text-sm text-gray-300 mt-2">Chọn video để phát</p>
          </div>
        </div>
      )}
    </div>
  );
};
