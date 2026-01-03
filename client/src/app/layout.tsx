import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { DataCacheProvider } from "./contexts/DataCacheContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELearning - Nền tảng học trực tuyến",
  description:
    "Học mọi lúc, mọi nơi với các khóa học trực tuyến chất lượng cao",
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
          <DataCacheProvider>{children}</DataCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
