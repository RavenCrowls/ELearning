'use client'

import React, { useState, useEffect, useRef } from 'react';
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

interface CourseFormProps {
    mode: 'create' | 'edit';
    initialData?: {
        _id?: string;
        COURSE_ID?: string;
        TITLE?: string;
        INSTRUCTOR_ID?: string;
        CREATED_DATE?: string;
        CATEGORIES?: string[];
        SUB_CATEGORIES?: string[];
        RATING?: string[];
        DESCRIPTION?: string;
        OUTPUT?: string[];
        PRICE?: number;
        LEVEL?: string;
        DURATION?: string;
        NUMBER_OF_VIDEOS?: number;
        ENROLLMENT_COUNT?: number;
        APPROVAL_STATUS?: string;
        STATUS?: boolean;
        IMAGE_URL?: string;
    };
    onSave: (data: any) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ mode, initialData, onSave }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [courseData, setCourseData] = useState({
        title: initialData?.TITLE || '',
        category: initialData?.CATEGORIES?.[0] || '',
        description: initialData?.DESCRIPTION || '',
        level: initialData?.LEVEL || '',
        image: initialData?.IMAGE_URL || '',
        price: initialData?.PRICE || 0,
        duration: initialData?.DURATION || ''
    });

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const [outputs, setOutputs] = useState<Output[]>([]);

    const [lectures, setLectures] = useState<Lecture[]>([
        {
            id: '1',
            name: 'Introduction',
            order: 1,
            videos: [
                { id: '1-1', name: 'Welcome to the course', order: 1, isChecked: true },
                { id: '1-2', name: 'Course overview', order: 2, isChecked: false }
            ]
        }
    ]);

    const [categories, setCategories] = useState<{
        CATEGORY_ID: string;
        NAME: string;
        SUB_CATEGORIES?: { SUB_CATEGORY_ID: string; NAME: string }[];
    }[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('http://localhost:5004/api/categories/');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setCategories([]);
            }
        }
        fetchCategories();
    }, []);

    // Initialize sub-categories and outputs from initial data
    useEffect(() => {
        if (initialData && mode === 'edit') {
            // Initialize sub-categories from SUB_CATEGORIES array
            if (initialData.SUB_CATEGORIES && initialData.SUB_CATEGORIES.length > 0) {
                const initialSubCategories = initialData.SUB_CATEGORIES.map((subCatId, index) => ({
                    id: (index + 1).toString(),
                    name: subCatId
                }));
                setSubCategories(initialSubCategories);
            }

            // Initialize outputs from OUTPUT array
            if (initialData.OUTPUT && initialData.OUTPUT.length > 0) {
                const initialOutputs = initialData.OUTPUT.map((output, index) => ({
                    id: (index + 1).toString(),
                    name: output
                }));
                setOutputs(initialOutputs);
            }
        } else if (mode === 'create') {
            // Add a default sub-category row for new courses
            setSubCategories([{ id: '1', name: '' }]);
            setOutputs([{ id: '1', name: '' }]);
        }
    }, [initialData, mode]);

    // Clear success message after 3 seconds
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const selectedCategory = categories.find(cat => cat.CATEGORY_ID === courseData.category);
    const subCategoryOptions = selectedCategory?.SUB_CATEGORIES || [];

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
                        name: 'New video',
                        order: lecture.videos.length + 1,
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
            name: 'New Lecture',
            order: lectures.length + 1,
            videos: []
        };
        setLectures([...lectures, newLecture]);
    };

    const handleSave = async () => {
        // Ask for confirmation before updating
        if (mode === 'edit') {
            const isConfirmed = window.confirm('Are you sure you want to update this course? This action cannot be undone.');
            if (!isConfirmed) {
                return;
            }
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formData = {
                TITLE: courseData.title,
                CATEGORIES: courseData.category ? [courseData.category] : [],
                SUB_CATEGORIES: subCategories.map(sub => sub.name).filter(name => name !== ''),
                DESCRIPTION: courseData.description,
                OUTPUT: outputs.map(output => output.name).filter(name => name !== ''),
                PRICE: courseData.price,
                LEVEL: courseData.level,
                DURATION: courseData.duration,
                IMAGE_URL: courseData.image,
                lectures,
                // Include original data for edit mode
                ...(initialData && mode === 'edit' && {
                    _id: initialData._id,
                    COURSE_ID: initialData.COURSE_ID,
                    INSTRUCTOR_ID: initialData.INSTRUCTOR_ID,
                    CREATED_DATE: initialData.CREATED_DATE,
                    RATING: initialData.RATING,
                    NUMBER_OF_VIDEOS: initialData.NUMBER_OF_VIDEOS,
                    ENROLLMENT_COUNT: initialData.ENROLLMENT_COUNT,
                    APPROVAL_STATUS: initialData.APPROVAL_STATUS,
                    STATUS: initialData.STATUS
                })
            };

            if (mode === 'edit' && initialData?.COURSE_ID) {
                // Make API call to update course
                const response = await fetch(`http://localhost:5003/api/courses/${initialData.COURSE_ID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Failed to update course: ${response.statusText}`);
                }

                const result = await response.json();
                setSuccess('Course updated successfully!');
                console.log('Course updated:', result);
            } else {
                // For create mode, just call the onSave callback
                onSave(formData);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving the course';
            setError(errorMessage);
            console.error('Error saving course:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('http://localhost:5010/api/upload/image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await response.json();

            if (result.success) {
                setCourseData(prev => ({ ...prev, image: result.data.url }));
                setSuccess('Image uploaded successfully!');
            } else {
                throw new Error(result.message || 'Upload failed');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
            setError(errorMessage);
            console.error('Upload error:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-blue-500 mb-6">
                    {mode === 'create' ? 'Create course' : 'Edit course'}
                </h1>

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
                                        placeholder="Enter course title"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Category</label>
                                    <select
                                        value={courseData.category}
                                        onChange={e => setCourseData({ ...courseData, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.CATEGORY_ID} value={cat.CATEGORY_ID}>{cat.NAME}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sub-category */}
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Sub-category</label>
                                    <div className="space-y-2">
                                        {subCategories.map((subCat, idx) => (
                                            <div key={subCat.id} className="flex items-center gap-2">
                                                <select
                                                    value={subCat.name}
                                                    onChange={e => updateSubCategory(subCat.id, e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    disabled={!courseData.category}
                                                >
                                                    {!courseData.category ? (
                                                        <option value="">Sub-category</option>
                                                    ) : (
                                                        <>
                                                            <option value="">Select a sub-category</option>
                                                            {subCategoryOptions.map((sub: any) => (
                                                                <option key={sub.SUB_CATEGORY_ID} value={sub.SUB_CATEGORY_ID}>{sub.NAME}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                </select>
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
                                        placeholder="Enter course description"
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
                                                    placeholder="Enter output"
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
                                        placeholder="Enter level (e.g., Beginner, Intermediate, Advanced)"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Price (VND)</label>
                                    <input
                                        type="number"
                                        value={courseData.price}
                                        onChange={(e) => setCourseData({ ...courseData, price: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter price"
                                    />
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Duration (hours)</label>
                                    <input
                                        type="text"
                                        value={courseData.duration}
                                        onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter duration"
                                    />
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Image URL</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={courseData.image}
                                            onChange={(e) => setCourseData({ ...courseData, image: e.target.value })}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter image URL or upload an image"
                                        />
                                        <button
                                            type="button"
                                            onClick={triggerFileInput}
                                            disabled={isUploading}
                                            className={`p-2 text-gray-500 hover:text-gray-600 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isUploading ? (
                                                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <Upload size={16} />
                                            )}
                                        </button>
                                    </div>
                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    {isUploading && (
                                        <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
                                    )}
                                </div>

                                {/* Status Messages */}
                                {error && (
                                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                        {success}
                                    </div>
                                )}

                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className={`w-full px-6 py-2 text-white rounded-lg transition-colors ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            {mode === 'create' ? 'Creating...' : 'Saving...'}
                                        </span>
                                    ) : (
                                        mode === 'create' ? 'Create Course' : 'Save Changes'
                                    )}
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
                                            <span className="text-sm text-gray-500">Lecture</span>
                                            <div className="flex gap-4 ml-auto mr-13">
                                                <span className="text-sm text-gray-500">Free trial</span>
                                                <span className="text-sm text-gray-500">Order</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <input
                                                type="text"
                                                value={lecture.name}
                                                onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, name: e.target.value } : l))}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter lecture name"
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
                                                        placeholder="Enter video name"
                                                    />
                                                    <button className="p-2 text-gray-500 hover:text-gray-600">
                                                        <Upload size={16} />
                                                    </button>
                                                    <input
                                                        type="checkbox"
                                                        checked={video.isChecked}
                                                        onChange={() => toggleVideoCheck(lecture.id, video.id)}
                                                        className="w-5 h-5 accent-blue-500 cursor-pointer"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={video.order}
                                                        onChange={e => setLectures(lectures.map(l => l.id === lecture.id ? { ...l, videos: l.videos.map(v => v.id === video.id ? { ...v, order: Number(e.target.value) } : v) } : l))}
                                                        className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center ml-2"
                                                    />
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

                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className={`w-full px-6 py-2 text-white rounded-lg transition-colors ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            {mode === 'create' ? 'Creating...' : 'Saving...'}
                                        </span>
                                    ) : (
                                        mode === 'create' ? 'Create Course' : 'Save Changes'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseForm; 