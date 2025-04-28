import Navbar from '@/components/Navbar/Navbar';
import CourseList from '@/components/CourseList/CourseList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4">
        <CourseList />
      </main>
    </div>
  );
}
