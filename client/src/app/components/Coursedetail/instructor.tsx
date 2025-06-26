import React from 'react';
import Image from 'next/image';
interface InstructorProps {
    name: string;
    image: string;
    description: string;
    lessons: number;
    students: number;
}
export default function Instructor() {
    const instructor: InstructorProps = {
        name: "John Doe",
        image: "/avatar.jpg",
        description: "John Doe is a seasoned instructor with over 10 years of experience in the field. He has taught thousands of students and is known for his engaging teaching style.",
        students: 1200,
        lessons: 30,
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6 w-full">
            <div className="flex items-center mb-4">

                <Image src={instructor.image}
                    alt={instructor.name}
                    width={40}
                    height={40}
                    className="w-30 h-30 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-semibold">{instructor.name}</h2>
                    <div className='flex space-x-2 flex-row'>
                        <p className="text-gray-500">Số khóa học: {instructor.lessons}</p>
                        <p className="text-gray-500">Số học viên: {instructor.students}</p>

                    </div>

                    <p className="text-gray-600">{instructor.description}</p>
                </div>
            </div>

        </div>
    );
}