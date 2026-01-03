"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { fetchEnrollmentsByUser } from "@/app/services/enrollmentService";
import { fetchCourse } from "@/app/services/courseService";
import { getUserById } from "@/app/services/userService";
import { useAuth } from "@clerk/nextjs";
import { useDataCache } from "@/app/contexts/DataCacheContext";

export function useStudentCourseLists() {
  const router = useRouter();
  const { user } = useUser();
  const { getToken } = useAuth();
  const { categories, popularCourses, newestCourses } = useDataCache();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [enrolledCourseDetails, setEnrolledCourseDetails] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);

  // Fetch user-specific data when user changes
  useEffect(() => {
    if (!user) {
      setEnrolledCourses([]);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    // Get auth token and fetch enrollments
    const fetchData = async () => {
      try {
        const token = await getToken();
        const data = await fetchEnrollmentsByUser(user.id, token || undefined);
        if (isMounted) {
          setEnrolledCourses(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        if (isMounted) setEnrolledCourses([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.id, getToken]); // Run when user ID or getToken changes

  // Fetch enrolled course details when enrollments change
  useEffect(() => {
    if (!enrolledCourses || enrolledCourses.length === 0) {
      setEnrolledCourseDetails([]);
      return;
    }

    let isMounted = true;

    Promise.all(
      enrolledCourses.map((enroll: any) =>
        fetchCourse(Number(enroll.COURSE_ID)).catch(() => null)
      )
    ).then((details) => {
      if (isMounted) {
        const validDetails = details.filter(Boolean);
        setEnrolledCourseDetails(validDetails);

        // Fetch only unique instructors we don't have yet
        const instructorIds = new Set<string>();
        validDetails.forEach((course: any) => {
          if (course?.INSTRUCTOR_ID && !instructors.has(course.INSTRUCTOR_ID)) {
            instructorIds.add(course.INSTRUCTOR_ID);
          }
        });

        // Fetch instructors in parallel
        if (instructorIds.size > 0) {
          fetchInstructors(Array.from(instructorIds));
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [enrolledCourses]);

  // Fetch instructors for popular and newest courses
  useEffect(() => {
    const allCourses = [...popularCourses, ...newestCourses];
    const instructorIds = new Set<string>();

    allCourses.forEach((course: any) => {
      if (course?.INSTRUCTOR_ID && !instructors.has(course.INSTRUCTOR_ID)) {
        instructorIds.add(course.INSTRUCTOR_ID);
      }
    });

    if (instructorIds.size > 0) {
      fetchInstructors(Array.from(instructorIds));
    }
  }, [popularCourses, newestCourses]);

  // Helper to fetch multiple instructors
  const fetchInstructors = useCallback(
    async (instructorIds: string[]) => {
      try {
        const token = await getToken();
        const results = await Promise.all(
          instructorIds.map((id) =>
            getUserById(id, token || undefined).catch((err) => {
              // Silently handle missing instructors - they might not be created yet
              console.debug(
                `Instructor ${id} not found, will show without name`
              );
              return null;
            })
          )
        );

        setInstructors((prev) => {
          const newMap = new Map(prev);
          results.forEach((instructor, index) => {
            if (instructor) {
              newMap.set(instructorIds[index], instructor);
            }
          });
          return newMap;
        });
      } catch (error) {
        // Don't log error, just silently fail - this is expected for missing instructors
        console.debug("Some instructors could not be loaded");
      }
    },
    [getToken]
  );

  function mapCourseData(course: any, progress?: number) {
    let instructorName = "Unknown Instructor";
    if (course?.INSTRUCTOR_ID) {
      const instructor = instructors.get(course.INSTRUCTOR_ID);
      instructorName =
        instructor?.NAME || instructor?.name || "Unknown Instructor";
    }

    let tagNames: string[] = [];
    if (Array.isArray(categories) && Array.isArray(course?.CATEGORIES)) {
      course.CATEGORIES.forEach((catId: string) => {
        const cat = categories.find((c: any) => c.CATEGORY_ID === catId);
        if (cat?.NAME) {
          tagNames.push(cat.NAME);
          if (
            Array.isArray(cat.SUB_CATEGORIES) &&
            Array.isArray(course.SUB_CATEGORIES)
          ) {
            course.SUB_CATEGORIES.forEach((subId: string) => {
              const sub = cat.SUB_CATEGORIES.find(
                (s: any) => s.SUB_CATEGORY_ID === subId
              );
              if (sub?.NAME) tagNames.push(sub.NAME);
            });
          }
        }
      });
    }

    return {
      id: course?.COURSE_ID || course?.id || "",
      title: course?.TITLE || course?.title || "",
      image: course?.IMAGE_URL || course?.image || "",
      progress: progress ?? course?.progress ?? 0,
      price:
        course?.PRICE !== undefined
          ? `${course.PRICE.toLocaleString()} ₫`
          : course?.price || "",
      rating: course?.RATING
        ? parseFloat(course.RATING[0])
        : course?.rating || 0,
      reviewCount: course?.RATING
        ? parseInt(course.RATING[1])
        : course?.reviewCount || 0,
      instructor: instructorName || course?.instructor || "",
      tags: tagNames.length > 0 ? tagNames : course?.tags || [],
    };
  }

  return {
    router,
    enrolledCourses,
    enrolledCourseDetails,
    popularCourses,
    newestCourses,
    mapCourseData,
    loading,
  };
}
