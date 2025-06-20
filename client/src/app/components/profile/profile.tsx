'use client'
import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function ProfileComponent() {
  return (
    <div className="w-full h-full flex justify-center items-start p-4">
      <UserProfile routing="hash" />
    </div>
  );
}