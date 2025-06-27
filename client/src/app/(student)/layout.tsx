'use client'
import { useUser } from '@clerk/nextjs';
import HeaderStudent from '../components/layout/Header-stu';
import Header from '../components/layout/Header';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen">
      {isSignedIn ? <HeaderStudent /> : <Header />}
      {children}
    </div>
  );
}