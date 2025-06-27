// import Image from 'next/image';
import HeaderStudent from '../components/layout/Header-stu';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <HeaderStudent />
      {children}
    </div>
  );
}