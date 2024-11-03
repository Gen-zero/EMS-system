import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import CategoryManager from './CategoryManager';
import { useCategories } from '../../contexts/CategoryContext';

interface TaskFiltersProps {
  filters: {
    category: string;
    status: string;
    priority: string;
  };
  onFilterChange: (filters: any) => void;
}

const statuses = ['All', 'Pending', 'In Progress', 'Completed'];
const priorities = ['All', 'Low', 'Medium', 'High'];

export default function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const { categories } = useCategories();
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value.toLowerCase().replace(' ', '_')
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col relative">
        <label className="mb-1 text-xs font-medium text-gray-500">Category</label>
        <div className="flex items-center space-x-2">
          <select
            value={filters.category === 'all' ? 'All' : filters.category.replace('_', ' ')}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowCategoryManager(true)}
            className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            title="Manage Categories"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-medium text-gray-500">Status</label>
        <select
          value={filters.status === 'all' ? 'All' : filters.status.replace('_', ' ')}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-medium text-gray-500">Priority</label>
        <select
          value={filters.priority === 'all' ? 'All' : filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      {showCategoryManager && (
        <CategoryManager onClose={() => setShowCategoryManager(false)} />
      )}
    </div>
  );
}