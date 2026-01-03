"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAllCategories } from "@/app/services/categoryService";
import {
  fetchPopularCourses,
  fetchNewestCourses,
} from "@/app/services/courseService";

interface DataCacheContextType {
  categories: any[];
  popularCourses: any[];
  newestCourses: any[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const DataCacheContext = createContext<DataCacheContextType | undefined>(
  undefined
);

export function DataCacheProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [popularCourses, setPopularCourses] = useState<any[]>([]);
  const [newestCourses, setNewestCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [cats, popular, newest] = await Promise.all([
        fetchAllCategories().catch(() => []),
        fetchPopularCourses().catch(() => []),
        fetchNewestCourses().catch(() => []),
      ]);

      setCategories(cats);
      setPopularCourses(popular);
      setNewestCourses(newest);
    } catch (error) {
      console.error("Error fetching cached data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataCacheContext.Provider
      value={{
        categories,
        popularCourses,
        newestCourses,
        isLoading,
        refetch: fetchData,
      }}
    >
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  const context = useContext(DataCacheContext);
  if (context === undefined) {
    throw new Error("useDataCache must be used within a DataCacheProvider");
  }
  return context;
}
