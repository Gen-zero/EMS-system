import React from 'react';
import { Filter } from 'lucide-react';

interface QuestFiltersProps {
  filters: {
    category: string;
    difficulty: string;
    status: string;
    minReward: string;
    maxReward: string;
  };
  onFilterChange: (filters: any) => void;
}

const categories = ['All', 'Design', 'Development', 'Blockchain', 'Marketing', 'Content', 'Research'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const statuses = ['All', 'Open', 'In Progress', 'Completed', 'Cancelled'];

export default function QuestFilters({ filters, onFilterChange }: QuestFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value.toLowerCase()
    });
  };

  const capitalizeFirstLetter = (string: string) => {
    if (string === 'all') return 'All';
    return string.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-medium text-gray-500">Category</label>
        <select
          value={capitalizeFirstLetter(filters.category)}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-medium text-gray-500">Difficulty</label>
        <select
          value={capitalizeFirstLetter(filters.difficulty)}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-medium text-gray-500">Status</label>
        <select
          value={capitalizeFirstLetter(filters.status)}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <label className="mb-1 text-xs font-medium text-gray-500">Min Reward</label>
          <input
            type="number"
            value={filters.minReward}
            onChange={(e) => handleFilterChange('minReward', e.target.value)}
            placeholder="Min"
            className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-xs font-medium text-gray-500">Max Reward</label>
          <input
            type="number"
            value={filters.maxReward}
            onChange={(e) => handleFilterChange('maxReward', e.target.value)}
            placeholder="Max"
            className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}