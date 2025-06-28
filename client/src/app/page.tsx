'use client';

import Image from 'next/image';
import HomeCourses from '@/app/components/CourseList/HomeCourses';
import HeaderStudent from './components/layout/Header-stu';
import Header from './components/layout/Header';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {isSignedIn ? <HeaderStudent /> : <Header />}
      <div className='w-full h-full relative flex items-center justify-start '>
        <Image
          src="/images/home.png"
          alt="home-spotlight"
          layout="responsive"
          objectFit='cover'
          width={1920}
          height={1080}
          className="w-full h-auto"
        />

        <div className='absolute text-5xl text-white pl-50'>
          <div className='text-2xl leading-[6] '>Không giới hạn kiến thức</div>
          <div className='leading-[1.5]'>Làm chủ trong mọi lĩnh vực</div>
          <div>Hãy tham gia ngay</div>
        </div>
      </div>
      <main className="container mx-auto px-4">
        <HomeCourses />
      </main>
    </div>
  );
}
