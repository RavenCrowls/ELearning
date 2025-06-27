import Image from 'next/image';
import HomeCourses from '@/app/components/CourseList/HomeCourses';
import HeaderStudent from './components/layout/Header-stu';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderStudent />
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
          <div className='text-2xl leading-[6] '>Knowledge Without Boundaries</div>
          <div className='leading-[1.5]'>Your Path to be the best in your field</div>
          <div>Join us now</div>
        </div>
      </div>
      <main className="container mx-auto px-4">
        <HomeCourses />
      </main>
    </div>
  );
}
