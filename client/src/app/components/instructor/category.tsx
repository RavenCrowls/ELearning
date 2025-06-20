'use client';

import React, { useState } from 'react';
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

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              name: newCategoryName,
              subCategories: newSubCategories
                .filter(name => name.trim() !== '')
                .map((name, index) => ({
                  id: `${cat.id}-${index + 1}`,
                  name: name.trim()
                }))
            }
          : cat
      ));
      setEditingCategory(null);
      setNewCategoryName('');
      setNewSubCategories(['']);
    }
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        subCategories: newSubCategories
          .filter(name => name.trim() !== '')
          .map((name, index) => ({
            id: `${Date.now()}-${index + 1}`,
            name: name.trim()
          })),
        isActive: false
      };
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      setNewSubCategories(['']);
      setShowCreateForm(false);
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
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                  category.isActive
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
                  placeholder="Backend Basics"
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
                        placeholder="Subcate 1"
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
                  placeholder="Backend Basics"
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
                        placeholder="Subcate 1"
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