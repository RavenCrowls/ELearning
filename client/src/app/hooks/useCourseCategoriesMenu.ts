'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllCategories } from '@/app/services/categoryService';

type MenuItem = { id: string; title: string; hasSubmenu: boolean };

export function useCourseCategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [rawCategories, setRawCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => setRawCategories(Array.isArray(data) ? data : []))
      .catch(() => setRawCategories([]));
  }, []);

  const leftColumn: MenuItem[] = useMemo(
    () =>
      rawCategories.map((cat: any) => ({
        id: cat.CATEGORY_ID,
        title: cat.NAME,
        hasSubmenu: Array.isArray(cat.SUB_CATEGORIES) && cat.SUB_CATEGORIES.length > 0,
      })),
    [rawCategories]
  );

  const submenuData: Record<string, MenuItem[]> = useMemo(() => {
    const submenu: Record<string, MenuItem[]> = {};
    rawCategories.forEach((cat: any) => {
      if (Array.isArray(cat.SUB_CATEGORIES) && cat.SUB_CATEGORIES.length > 0) {
        submenu[cat.CATEGORY_ID] = cat.SUB_CATEGORIES.map((sub: any) => ({
          id: sub.SUB_CATEGORY_ID,
          title: sub.NAME,
          hasSubmenu: false,
        }));
      }
    });
    return submenu;
  }, [rawCategories]);

  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setHoveredItem(null);
    setActiveSubmenu(null);
  };

  const handleLeftColumnHover = (item: MenuItem) => {
    setHoveredItem(item.id);
    if (item.hasSubmenu && submenuData[item.id]) {
      setActiveSubmenu(item.id);
    } else if (item.hasSubmenu) {
      setActiveSubmenu(item.id);
    } else {
      setActiveSubmenu(null);
    }
  };

  const handleItemClick = (item: { id: string; title: string; hasSubmenu?: boolean; parentId?: string }) => {
    if (item.hasSubmenu === false && item.parentId) {
      router.push(`/coursefilter?category=${item.parentId}&subcategory=${item.id}`);
      closePopup();
      return;
    }
    router.push(`/coursefilter?category=${item.id}`);
    closePopup();
  };

  const getPopupWidth = () => (activeSubmenu ? '600px' : '300px');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && event.target && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    hoveredItem,
    activeSubmenu,
    popupRef,
    leftColumn,
    submenuData,
    handleOpenPopup,
    closePopup,
    handleLeftColumnHover,
    handleItemClick,
    getPopupWidth,
  };
}