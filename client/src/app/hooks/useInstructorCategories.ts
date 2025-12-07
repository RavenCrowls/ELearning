'use client';

import { useEffect, useMemo, useState } from 'react';
import { createCategory, deleteSubCategory, fetchAllCategories, updateCategory } from '@/app/services/categoryService';

export interface SubCategory {
  id: string;
  name: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  subCategories: SubCategory[];
  isActive: boolean;
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

export function useInstructorCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategories, setNewSubCategories] = useState<string[]>(['']);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchAllCategories()
      .then((data) => {
        if (cancelled) return;
        const transformed: CategoryItem[] = (data || []).map((cat: any, idx: number) => ({
          id: cat.CATEGORY_ID,
          name: cat.NAME,
          subCategories: (cat.SUB_CATEGORIES || []).map((sub: any) => ({
            id: sub.SUB_CATEGORY_ID,
            name: sub.NAME,
          })),
          isActive: idx === 0,
        }));
        setCategories(transformed);
        setSelectedCategory(transformed[0] || null);
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([]);
          setSelectedCategory(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCategoryClick = (category: CategoryItem) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        isActive: cat.id === category.id,
      }))
    );
    setSelectedCategory(category);
  };

  const handleEditCategory = (category: CategoryItem) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewSubCategories(category.subCategories.map((sub) => sub.name));
  };

  const handleSaveEdit = async () => {
    if (!editingCategory) return;
    if (!window.confirm('Are you sure you want to save these changes?')) return;
    const updatedCategory: CategoryItem = {
      ...editingCategory,
      name: newCategoryName,
      subCategories: newSubCategories
        .filter((name) => name.trim() !== '')
        .map((name, index) => ({
          id: `${editingCategory.id}-${index + 1}`,
          name: name.trim(),
        })),
      isActive: editingCategory.isActive,
    };

    const apiData = {
      NAME: updatedCategory.name,
      SUB_CATEGORIES: updatedCategory.subCategories.map((sub) => ({
        NAME: sub.name,
        SUB_CATEGORY_ID: sub.id,
        STATUS: true,
      })),
      STATUS: true,
    };

    try {
      await updateCategory(editingCategory.id, apiData);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? updatedCategory : cat))
      );
      setSelectedCategory(updatedCategory);
      setEditingCategory(null);
      setNewCategoryName('');
      setNewSubCategories(['']);
    } catch {
      alert('Failed to update category');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    const categoryId = generateId();
    const subCategories = newSubCategories
      .filter((name) => name.trim() !== '')
      .map((name) => ({
        NAME: name.trim(),
        STATUS: true,
        SUB_CATEGORY_ID: generateId(),
      }));
    const newCategoryPayload = {
      NAME: newCategoryName.trim(),
      SUB_CATEGORIES: subCategories,
      STATUS: true,
      CATEGORY_ID: categoryId,
    };
    try {
      const created = await createCategory(newCategoryPayload);
      setCategories((prev) => [
        ...prev,
        {
          id: created.CATEGORY_ID || categoryId,
          name: created.NAME,
          subCategories: (created.SUB_CATEGORIES || subCategories).map((sub: any, idx: number) => ({
            id: sub.SUB_CATEGORY_ID || subCategories[idx].SUB_CATEGORY_ID,
            name: sub.NAME,
          })),
          isActive: false,
        },
      ]);
      setNewCategoryName('');
      setNewSubCategories(['']);
      setShowCreateForm(false);
    } catch {
      alert('Failed to create category');
    }
  };

  const addSubCategoryField = () => {
    setNewSubCategories((prev) => [...prev, '']);
  };

  const removeSubCategoryField = (index: number) => {
    setNewSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSubCategory = (index: number, value: string) => {
    setNewSubCategories((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleDeleteSubCategory = async (categoryId: string, subCategoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this sub-category?')) return;
    try {
      await deleteSubCategory(categoryId, subCategoryId);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? { ...cat, subCategories: cat.subCategories.filter((sub) => sub.id !== subCategoryId) }
            : cat
        )
      );
      if (selectedCategory && selectedCategory.id === categoryId) {
        setSelectedCategory((cat) =>
          cat ? { ...cat, subCategories: cat.subCategories.filter((sub) => sub.id !== subCategoryId) } : cat
        );
      }
    } catch {
      alert('Failed to delete sub-category');
    }
  };

  return {
    categories,
    selectedCategory,
    editingCategory,
    newCategoryName,
    newSubCategories,
    showCreateForm,
    // setters for controlled inputs
    setNewCategoryName,
    setNewSubCategories,
    setShowCreateForm,
    // actions
    handleCategoryClick,
    handleEditCategory,
    handleSaveEdit,
    handleCreateCategory,
    addSubCategoryField,
    removeSubCategoryField,
    updateSubCategory,
    handleDeleteSubCategory,
  };
}