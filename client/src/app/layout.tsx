import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderSwitcher from '@/app/components/layout/HeaderSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ELearning - Nền tảng học trực tuyến',
  description: 'Học mọi lúc, mọi nơi với các khóa học trực tuyến chất lượng cao',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <HeaderSwitcher />
        {children}
      </body>
    </html>
  );
}
