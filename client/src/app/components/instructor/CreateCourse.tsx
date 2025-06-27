'use client'

import React, { useState } from 'react';
import { Plus, X, Check, Download, Upload } from 'lucide-react';

interface VideoItem {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
}

interface Lecture {
  id: string;
  name: string;
  order: number;
  videos: VideoItem[];
}

interface SubCategory {
  id: string;
  name: string;
}

interface Output {
  id: string;
  name: string;
}

const CreateCourse: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: 'Backend Basics',
    category: 'Category',
    description: '',
    level: 'Backend Basics',
    image: 'image.png'
  });

  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    { id: '1', name: 'Subcate 1' }
  ]);

  const [outputs, setOutputs] = useState<Output[]>([
    { id: '1', name: 'Output 1' }
  ]);

  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: '1',
      name: 'Backend Basics',
      order: 1,
      videos: [
        { id: '1-1', name: 'Subcate 1', order: 1, isChecked: true },
        { id: '1-2', name: 'Subcate 1', order: 1, isChecked: true },
        { id: '1-3', name: 'Subcate 1', order: 1, isChecked: true }
      ]
    },
    {
      id: '2',
      name: 'Backend Basics',
      order: 1,
      videos: [
        { id: '2-1', name: 'Subcate 1', order: 1, isChecked: true },
        { id: '2-2', name: 'Subcate 1', order: 1, isChecked: true },
        { id: '2-3', name: 'Subcate 1', order: 1, isChecked: true }
      ]
    }
  ]);

  const addSubCategory = () => {
    const newSubCategory: SubCategory = {
      id: Date.now().toString(),
      name: ''
    };
    setSubCategories([...subCategories, newSubCategory]);
  };

  const removeSubCategory = (id: string) => {
    setSubCategories(subCategories.filter(sub => sub.id !== id));
  };

  const updateSubCategory = (id: string, name: string) => {
    setSubCategories(subCategories.map(sub =>
      sub.id === id ? { ...sub, name } : sub
    ));
  };

  const addOutput = () => {
    const newOutput: Output = {
      id: Date.now().toString(),
      name: ''
    };
    setOutputs([...outputs, newOutput]);
  };

  const removeOutput = (id: string) => {
    setOutputs(outputs.filter(output => output.id !== id));
  };

  const updateOutput = (id: string, name: string) => {
    setOutputs(outputs.map(output =>
      output.id === id ? { ...output, name } : output
    ));
  };

  const addVideo = (lectureId: string) => {
    setLectures(lectures.map(lecture =>
      lecture.id === lectureId
        ? {
          ...lecture,
          videos: [...lecture.videos, {
            id: `${lectureId}-${Date.now()}`,
            name: 'Subcate 1',
            order: 1,
            isChecked: false
          }]
        }
        : lecture
    ));
  };

  const removeVideo = (lectureId: string, videoId: string) => {
    setLectures(lectures.map(lecture =>
      lecture.id === lectureId
        ? {
          ...lecture,
          videos: lecture.videos.filter(video => video.id !== videoId)
        }
        : lecture
    ));
  };

  const toggleVideoCheck = (lectureId: string, videoId: string) => {
    setLectures(lectures.map(lecture =>
      lecture.id === lectureId
        ? {
          ...lecture,
          videos: lecture.videos.map(video =>
            video.id === videoId
              ? { ...video, isChecked: !video.isChecked }
              : video
          )
        }
        : lecture
    ));
  };

  const removeLecture = (lectureId: string) => {
    setLectures(lectures.filter(lecture => lecture.id !== lectureId));
  };

  const addNewLecture = () => {
    const newLecture: Lecture = {
      id: Date.now().toString(),
      name: 'Backend Basics',
      order: 1,
      videos: []
    };
    setLectures([...lectures, newLecture]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-blue-500 mb-6">Create course</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic information</h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Title</label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Category</label>
                  <input
                    type="text"
                    value={courseData.category}
                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Sub-category */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Sub-category</label>
                  <div className="space-y-2">
                    {subCategories.map((subCat) => (
                      <div key={subCat.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={subCat.name}
                          onChange={(e) => updateSubCategory(subCat.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeSubCategory(subCat.id)}
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addSubCategory}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg"
                    >
                      <Plus size={16} />
                      Add new sub-category
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Description</label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    placeholder="Category"
                  />
                </div>

                {/* Output */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Output</label>
                  <div className="space-y-2">
                    {outputs.map((output) => (
                      <div key={output.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={output.name}
                          onChange={(e) => updateOutput(output.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeOutput(output.id)}
                          className="p-2 text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addOutput}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg"
                    >
                      <Plus size={16} />
                      Add new Output
                    </button>
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Level</label>
                  <input
                    type="text"
                    value={courseData.level}
                    onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Image</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={courseData.image}
                      onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-2 text-gray-500 hover:text-gray-600">
                      <Upload size={16} />
                    </button>
                  </div>
                </div>

                <button className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Lecture and Video */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Lecture and video</h2>

              <div className="space-y-6">
                {lectures.map((lecture) => (
                  <div key={lecture.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    {/* Lecture Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Lecture</span>
                        <span className="text-sm text-gray-500">Order</span>
                        <span className="text-sm text-gray-500">Free trial</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="text"
                        value={lecture.name}
                        onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, name: e.target.value } : l))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        value={lecture.order}
                        onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, order: Number(e.target.value) } : l))}
                        className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      />
                      <button
                        onClick={() => removeLecture(lecture.id)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Video List */}
                    <div className="space-y-2">
                      <span className="text-sm text-gray-500">Video list</span>
                      {lecture.videos.map((video) => (
                        <div key={video.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={video.name}
                            onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, videos: l.videos.map(v => v.id === video.id ? { ...v, name: e.target.value } : v) } : l))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            value={video.order}
                            onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, videos: l.videos.map(v => v.id === video.id ? { ...v, order: Number(e.target.value) } : v) } : l))}
                            className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                          />
                          <button
                            onClick={() => toggleVideoCheck(lecture.id, video.id)}
                            className={`p-2 rounded ${video.isChecked ? 'text-green-500' : 'text-gray-400'}`}
                          >
                            <Check size={16} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-600">
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => removeVideo(lecture.id, video.id)}
                            className="p-2 text-red-500 hover:text-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addVideo(lecture.id)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg"
                      >
                        <Plus size={16} />
                        Add new video
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addNewLecture}
                  className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 text-sm w-full px-4 py-3 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add new lecture
                </button>

                <button className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;