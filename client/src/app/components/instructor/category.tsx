'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
  isActive: boolean;
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Backend Basics',
      subCategories: [
        { id: '1-1', name: 'Backend Basics' },
        { id: '1-2', name: 'Backend Basics' },
        { id: '1-3', name: 'Backend Basics' },
        { id: '1-4', name: 'Backend Basics' },
        { id: '1-5', name: 'Backend Basics' }
      ],
      isActive: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategories, setNewSubCategories] = useState<string[]>(['']);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5004/api/categories/')
      .then(res => res.json())
      .then(data => {
        const transformed = data.map((cat: any, idx: number) => ({
          id: cat.CATEGORY_ID,
          name: cat.NAME,
          subCategories: (cat.SUB_CATEGORIES || []).map((sub: any) => ({
            id: sub.SUB_CATEGORY_ID,
            name: sub.NAME
          })),
          isActive: idx === 0 // first one active by default
        }));
        setCategories(transformed);
        setSelectedCategory(transformed[0] || null);
      });
  }, []);

  const handleCategoryClick = (category: Category) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      isActive: cat.id === category.id
    })));
    setSelectedCategory(category);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewSubCategories(category.subCategories.map(sub => sub.name));
  };

  const handleSaveEdit = async () => {
    if (editingCategory) {
      if (!window.confirm('Are you sure you want to save these changes?')) return;
      const updatedCategory = {
        ...editingCategory,
        name: newCategoryName,
        subCategories: newSubCategories
          .filter(name => name.trim() !== '')
          .map((name, index) => ({
            id: `${editingCategory.id}-${index + 1}`,
            name: name.trim()
          }))
      };

      // Prepare data for API (match backend structure)
      const apiData = {
        NAME: updatedCategory.name,
        SUB_CATEGORIES: updatedCategory.subCategories.map(sub => ({
          NAME: sub.name,
          SUB_CATEGORY_ID: sub.id,
          STATUS: true
        })),
        STATUS: true
      };

      try {
        const res = await fetch(`http://localhost:5004/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiData)
        });

        if (res.ok) {
          setCategories(prev => prev.map(cat =>
            cat.id === editingCategory.id ? updatedCategory : cat
          ));
          setSelectedCategory(updatedCategory);
          setEditingCategory(null);
          setNewCategoryName('');
          setNewSubCategories(['']);
        } else {
          alert('Failed to update category');
        }
      } catch (err) {
        alert('Error updating category');
      }
    }
  };

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      const categoryId = generateId();
      const subCategories = newSubCategories
        .filter(name => name.trim() !== '')
        .map((name) => ({
          NAME: name.trim(),
          STATUS: true,
          SUB_CATEGORY_ID: generateId()
        }));
      const newCategory = {
        NAME: newCategoryName.trim(),
        SUB_CATEGORIES: subCategories,
        STATUS: true,
        CATEGORY_ID: categoryId
      };

      try {
        const res = await fetch('http://localhost:5004/api/categories/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCategory)
        });

        if (res.ok) {
          const created = await res.json();
          setCategories(prev => [
            ...prev,
            {
              id: created.CATEGORY_ID || categoryId,
              name: created.NAME,
              subCategories: (created.SUB_CATEGORIES || subCategories).map((sub: any, idx: number) => ({
                id: sub.SUB_CATEGORY_ID || subCategories[idx].SUB_CATEGORY_ID,
                name: sub.NAME
              })),
              isActive: false
            }
          ]);
          setNewCategoryName('');
          setNewSubCategories(['']);
          setShowCreateForm(false);
        } else {
          alert('Failed to create category');
        }
      } catch (err) {
        alert('Error creating category');
      }
    }
  };

  const addSubCategoryField = (isEdit = false) => {
    setNewSubCategories(prev => [...prev, '']);
  };

  const removeSubCategoryField = (index: number) => {
    setNewSubCategories(prev => prev.filter((_, i) => i !== index));
  };

  const updateSubCategory = (index: number, value: string) => {
    setNewSubCategories(prev => prev.map((item, i) => i === index ? value : item));
  };

  const handleDeleteSubCategory = async (categoryId: string, subCategoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this sub-category?')) return;

    try {
      const res = await fetch(`http://localhost:5004/api/categories/${categoryId}/sub-categories/${subCategoryId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setCategories(prev =>
          prev.map(cat =>
            cat.id === categoryId
              ? {
                ...cat,
                subCategories: cat.subCategories.filter(sub => sub.id !== subCategoryId)
              }
              : cat
          )
        );
        if (selectedCategory && selectedCategory.id === categoryId) {
          setSelectedCategory(cat => cat
            ? { ...cat, subCategories: cat.subCategories.filter(sub => sub.id !== subCategoryId) }
            : cat
          );
        }
      } else {
        alert('Failed to delete sub-category');
      }
    } catch (err) {
      alert('Error deleting sub-category');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category);
                  handleEditCategory(category);
                }}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${category.isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-category Display */}
        {selectedCategory && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Sub-category</h2>
            <div className="flex flex-wrap gap-2">
              {selectedCategory.subCategories.map(subCategory => (
                <span
                  key={subCategory.id}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {subCategory.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Edit and Create Forms */}
        <div className="grid grid-cols-2 gap-6">
          {/* Edit Category Form */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-500 font-medium">Edit category</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Category name
                </label>
                <input
                  type="text"
                  value={editingCategory ? newCategoryName : selectedCategory?.name || ''}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (!editingCategory && selectedCategory) {
                      handleEditCategory(selectedCategory);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Category name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Sub-category list
                </label>
                <div className="space-y-2">
                  {(editingCategory ? newSubCategories : selectedCategory?.subCategories.map(sub => sub.name) || ['']).map((subCat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={typeof subCat === 'string' ? subCat : subCat}
                        onChange={(e) => {
                          updateSubCategory(index, e.target.value);
                          if (!editingCategory && selectedCategory) {
                            handleEditCategory(selectedCategory);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                        placeholder="Sub-category name"
                      />
                      {(editingCategory ? newSubCategories : selectedCategory?.subCategories || []).length > 1 && (
                        <button
                          onClick={() => removeSubCategoryField(index)}
                          className="p-1 text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      addSubCategoryField(true);
                      if (!editingCategory && selectedCategory) {
                        handleEditCategory(selectedCategory);
                      }
                    }}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg"
                  >
                    <Plus size={16} />
                    Add new sub-category
                  </button>
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                disabled={!editingCategory}
                className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>

          {/* Create New Category Form */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-blue-500 font-medium">Create new category</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Category name
                </label>
                <input
                  type="text"
                  value={showCreateForm ? newCategoryName : ''}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (!showCreateForm) {
                      setShowCreateForm(true);
                      setNewSubCategories(['']);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Category name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Sub-category list
                </label>
                <div className="space-y-2">
                  {(showCreateForm ? newSubCategories : ['']).map((subCat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={subCat}
                        onChange={(e) => {
                          updateSubCategory(index, e.target.value);
                          if (!showCreateForm) {
                            setShowCreateForm(true);
                            setNewCategoryName('');
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Sub-category name"
                      />
                      {(showCreateForm ? newSubCategories : ['']).length > 1 && (
                        <button
                          onClick={() => removeSubCategoryField(index)}
                          className="p-1 text-red-500 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      addSubCategoryField();
                      if (!showCreateForm) {
                        setShowCreateForm(true);
                        setNewCategoryName('');
                      }
                    }}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg"
                  >
                    <Plus size={16} />
                    Add new sub-category
                  </button>
                </div>
              </div>

              <button
                onClick={handleCreateCategory}
                disabled={!showCreateForm || !newCategoryName.trim()}
                className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;