import { useSearchParams } from 'next/navigation';
import React from 'react';
// import Image from 'next/image';
import { useCourseOverall } from '@/app/hooks/useCourseOverall';

export default function Overall() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id') || '1';
  const { description, output } = useCourseOverall(courseId);


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6 w-full">
      <h2 className="font-bold text-lg mb-3">Mô tả</h2>
      <p className="text-gray-700 mb-4">
        {description || 'Không có mô tả.'}
      </p>

      <h2 className="font-bold text-lg mb-3">Các kỹ năng</h2>
      <ul className="list-disc pl-5 space-y-1">
        {output && output.length > 0 ? (
          output.map((item: string, idx: number) => <li key={idx}>{item}</li>)
        ) : (
          <li>Không có kỹ năng nào được liệt kê.</li>
        )}
      </ul>
    </div>
  );
}