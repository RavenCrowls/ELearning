import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Header from './components/layout/Header';
import HeaderStudent from './components/layout/Header-stu';

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
    <ClerkProvider>
      <html lang="vi">
        <body className={inter.className}>
          <SignedOut>
            <Header />
          </SignedOut>
          <SignedIn>
            <HeaderStudent />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
