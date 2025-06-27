'use client'
import { useInstructorProtection } from '../../hooks/useRoleProtection';
import HeaderInstructor from "../components/layout/Header-instructor";
import Sidebar from "../components/sidebar/sidebar";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// import Image from 'next/image';

interface UserData {
  _id: string;
  USER_ID: string;
  ROLE_ID: string;
  NAME: string;
  ADDRESS: string;
  PHONE: string;
  BIRTH_DATE: string | null;
  EMAIL: string;
  USERNAME: string;
  PASSWORD: string;
  AVATAR: string;
  BIO: string;
  JOIN_DATE: string;
  STATUS: boolean;
}

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, isAuthorized } = useInstructorProtection();

  // Show loading state
  if (loading) {
    return <LoadingSpinner message="Checking authorization..." />;
  }

  // Show unauthorized message if not authorized
  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  // Show the actual layout if authorized
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main content area - Takes remaining space */}
      <div className="flex-1">
        <HeaderInstructor />
        {children}
      </div>
    </div>
  );
}