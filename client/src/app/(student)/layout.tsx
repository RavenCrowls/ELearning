import Header from "../components/layout/Header";

// import Image from 'next/image';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}