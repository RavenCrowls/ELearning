"use client";
import { useUser } from '@clerk/nextjs';
import CourseList from '@/app/components/CourseList/CourseList';
import CourseListstu from '@/app/components/CourseList/CourseList-stu';

export default function HomeCourses() {
    const { isSignedIn } = useUser();
    return isSignedIn ? <CourseListstu /> : <CourseList />;
}
