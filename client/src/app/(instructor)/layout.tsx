
import HeaderInstructor from "../components/layout/Header-instructor";
import Sidebar from "../components/sidebar/sidebar";

// import Image from 'next/image';
export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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