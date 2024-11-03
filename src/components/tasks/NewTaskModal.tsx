import React, { useState } from 'react';
import { Task } from '../../types';
import { X, User, Calendar, Plus } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { PROFILE_IMAGES } from '../../constants/images';

interface NewTaskModalProps {
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

const mockUsers = [
  { id: 'user1', name: 'ॐ Kalidasaya Nama', avatar: PROFILE_IMAGES.USER1 },
  { id: 'user2', name: 'ॐ Manu Narayanaya', avatar: PROFILE_IMAGES.USER2 },
  { id: 'user3', name: 'Admin', avatar: PROFILE_IMAGES.DEFAULT },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const NewTaskModal: React.FC<NewTaskModalProps> = ({ onClose, onSubmit }) => {
  const { categories, updateCategories } = useCategories();
  const [taskData, setTaskData] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: categories[1] || 'development', // Default to first non-'All' category
    priority: 'medium',
    status: 'pending',
    dueDate: format(new Date(), 'dd-MM-yyyy'),
    assignees: [],
    assignedBy: 'admin1',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData as Task);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssigneeChange = (userId: string) => {
    setTaskData((prev) => {
      const currentAssignees = prev.assignees || [];
      const isSelected = currentAssignees.includes(userId);

      if (isSelected) {
        return {
          ...prev,
          assignees: currentAssignees.filter((id) => id !== userId),
        };
      }

      if (currentAssignees.length >= 3) {
        return prev;
      }

      return {
        ...prev,
        assignees: [...currentAssignees, userId],
      };
    });
  };

  const handleDateSelect = (date: Date) => {
    setTaskData((prev) => ({
      ...prev,
      dueDate: format(date, 'dd-MM-yyyy'),
    }));
    setShowDatePicker(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      updateCategories(updatedCategories);
      setTaskData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const getCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Create New Task
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={taskData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  value={taskData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {mockUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleAssigneeChange(user.id)}
                      className={`flex items-center space-x-3 p-2 rounded-md ${
                        taskData.assignees?.includes(user.id)
                          ? 'bg-blue-50 border-blue-200 border'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                      disabled={
                        taskData.assignees?.length === 3 &&
                        !taskData.assignees?.includes(user.id)
                      }
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="flex-1 text-left text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                      {taskData.assignees?.includes(user.id) && (
                        <span className="text-blue-600">
                          <User className="h-5 w-5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  {isAddingCategory ? (
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New category"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="mt-1 relative">
                      <select
                        name="category"
                        id="category"
                        value={taskData.category}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      >
                        {categories.filter(cat => cat.toLowerCase() !== 'all').map((category) => (
                          <option key={category} value={category.toLowerCase()}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="dueDate"
                    id="dueDate"
                    required
                    placeholder="DD-MM-YYYY"
                    value={taskData.dueDate}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Calendar className="h-5 w-5" />
                  </button>
                </div>

                {showDatePicker && (
                  <div className="absolute bottom-full left-0 mb-2 z-10 w-64 rounded-md bg-white shadow-lg">
                    <div className="p-2">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map((day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-medium text-gray-500"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleDateSelect(date)}
                            className={`
                              p-2 text-sm rounded-md text-center
                              ${
                                format(date, 'MM-yyyy') !==
                                format(currentDate, 'MM-yyyy')
                                  ? 'text-gray-400'
                                  : ''
                              }
                              ${
                                format(date, 'dd-MM-yyyy') ===
                                format(new Date(), 'dd-MM-yyyy')
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'hover:bg-gray-100'
                              }
                            `}
                          >
                            {date.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  disabled={!taskData.assignees?.length}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;