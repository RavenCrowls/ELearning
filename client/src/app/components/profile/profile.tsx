'use client'
import React, { useState, useEffect } from 'react';
import { User, Upload } from 'lucide-react';
import { useUser, useAuth } from '@clerk/nextjs';
import Image from "next/image";

export default function ProfileComponent() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    birthday: '',
    email: '',
    username: '',
    bio: '',
    password: '',
    newPassword: ''
  });
  const [avatarFile, setAvatarFile] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      if (user && user.id) {
        const token = await getToken();
        const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            name: data.NAME || '',
            address: data.ADDRESS || '',
            phone: data.PHONE || '',
            birthday: data.BIRTH_DATE ? data.BIRTH_DATE.split('T')[0] : '',
            email: data.EMAIL || '',
            username: data.USERNAME || '',
            bio: data.BIO || '',
          }));
          setAvatarFile(data.AVATAR || '');
        }
      }
    }
    fetchUserData();
  }, [user, getToken]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAvatarFile(file.name);
    }
  };

  const handleSave = () => {
    console.log('Profile saved:', formData);
  };

  const handleUpdateInfo = () => {
    console.log('Information updated:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="border-t-4 border-blue-500 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-blue-600 font-semibold text-lg mb-6">Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone and Birthday */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">Birthday</label>
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">New password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Update Information and Change Password Buttons */}
            <div className="pt-4 flex gap-4">
              <button
                onClick={handleUpdateInfo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Update Information
              </button>
              <button
                onClick={() => {/* TODO: Implement change password logic */ }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Right Column - Avatar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              {/* Avatar Display */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-300 overflow-hidden">
                  {avatarFile ? (
                    <Image
                      src={avatarFile}
                      alt="Profile Avatar"
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-32 h-32"
                    />
                  ) : (
                    <User size={48} className="text-gray-600" />
                  )}
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="space-y-3">
                <input
                  type="text"
                  value={avatarFile}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                />
                <label className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center justify-center">
                  <Upload size={16} className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}