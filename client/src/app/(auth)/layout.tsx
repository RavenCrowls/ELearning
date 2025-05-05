import Header from '@/app/components/layout/Header';

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