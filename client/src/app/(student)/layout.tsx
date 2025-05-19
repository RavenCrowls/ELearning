import HeaderStudent from '@/app/components/layout/Header-stu';

// import Image from 'next/image';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <HeaderStudent/>      
      {children}
    </div>
  );
}