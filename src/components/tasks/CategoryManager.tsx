import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';

interface CategoryManagerProps {
  onClose: () => void;
}

export default function CategoryManager({ onClose }: CategoryManagerProps) {
  const { categories, updateCategories } = useCategories();
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      updateCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setIsAdding(false);
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    if (categoryToRemove.toLowerCase() !== 'all') {
      updateCategories(categories.filter(cat => cat !== categoryToRemove));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Manage Categories</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between group bg-gray-50 p-2 rounded-md">
                    <span className="text-sm text-gray-600">{category}</span>
                    {category.toLowerCase() !== 'all' && (
                      <button
                        onClick={() => handleRemoveCategory(category)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isAdding ? (
                <form onSubmit={handleAddCategory} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600 px-2 py-1"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Category
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}