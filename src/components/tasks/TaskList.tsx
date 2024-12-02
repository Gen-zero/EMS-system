import React, { useState, useRef } from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import NewTaskModal from './NewTaskModal';
import TaskCalendar from './TaskCalendar';
import { Plus, Search, ListFilter, Calendar as CalendarIcon, CheckSquare, Sword } from 'lucide-react';
import Modal from '../common/Modal';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Update Sales Dashboard',
    description: 'Implement new metrics and KPIs for Q2 sales tracking',
    assignees: ['user1', 'user2'],
    assignedBy: 'admin1',
    assignedDate: '2024-03-20',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-03-25',
    category: 'sales'
  },
  {
    id: '2',
    title: 'Design System Updates',
    description: 'Implement new component library changes',
    assignees: ['user2', 'user3'],
    assignedBy: 'admin1',
    assignedDate: '2024-03-21',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-03-28',
    category: 'design'
  },
  {
    id: '3',
    title: 'Customer Support Training',
    description: 'Conduct training session for new support tools',
    assignees: ['user1', 'user2', 'user3'],
    assignedBy: 'admin2',
    assignedDate: '2024-03-15',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-03-20',
    category: 'support'
  }
];

interface TaskListProps {
  initialTasks?: Task[];
  onTasksChange?: (tasks: Task[]) => void;
}

export default function TaskList({ initialTasks = MOCK_TASKS, onTasksChange }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const taskRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all'
  });
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'tasks' | 'quests'>('tasks');

  const handleAddTask = (newTask: Task) => {
    const taskWithDates = {
      ...newTask,
      id: String(tasks.length + 1),
      assignedDate: new Date().toISOString().split('T')[0]
    };
    const updatedTasks = [...tasks, taskWithDates];
    setTasks(updatedTasks);
    if (onTasksChange) {
      onTasksChange(updatedTasks);
    }
    setIsNewTaskModalOpen(false);
  };

  const handleEditTask = (taskId: string, updatedTask: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    if (onTasksChange) {
      onTasksChange(updatedTasks);
    }
  };

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
      setTasks(updatedTasks);
      if (onTasksChange) {
        onTasksChange(updatedTasks);
      }
      setTaskToDelete(null);
    }
  };

  const handleTaskClick = (taskId: string) => {
    setViewMode('list');
    setSelectedTaskId(taskId);
    setTimeout(() => {
      const element = taskRefs.current[taskId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-task');
        setTimeout(() => {
          element.classList.remove('highlight-task');
        }, 1000);
      }
    }, 100);
  };

  const filteredTasks = tasks.filter(task => {
    const isQuest = 'questReward' in task;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || task.category === filters.category;
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && 
           (activeTab === 'quests' ? isQuest : !isQuest);
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
          <div>
            <div className="flex space-x-1 mb-2">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CheckSquare className="h-5 w-5 mr-2" />
                My Tasks
              </button>
              <button
                onClick={() => setActiveTab('quests')}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'quests'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Sword className="h-5 w-5 mr-2" />
                My Quests
              </button>
            </div>
            <p className="text-gray-600">
              {activeTab === 'tasks' 
                ? "Manage and track your team's tasks"
                : "View and manage your accepted quests"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-md border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ListFilter className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded ${
                  viewMode === 'calendar'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <CalendarIcon className="h-5 w-5" />
              </button>
            </div>
            {activeTab === 'tasks' && (
              <button 
                onClick={() => setIsNewTaskModalOpen(true)}
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <Plus className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">New Task</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
          <div className="relative w-full sm:w-64 lg:w-96">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="overflow-x-auto">
            <TaskFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                ref={el => taskRefs.current[task.id] = el}
                className={`transition-all duration-300 ${
                  selectedTaskId === task.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {activeTab === 'tasks' 
                  ? 'No tasks found matching your criteria'
                  : 'No quests found matching your criteria'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <TaskCalendar
            tasks={filteredTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      )}

      {isNewTaskModalOpen && (
        <NewTaskModal
          onClose={() => setIsNewTaskModalOpen(false)}
          onSubmit={handleAddTask}
        />
      )}

      <Modal
        isOpen={taskToDelete !== null}
        onClose={() => setTaskToDelete(null)}
        title="Delete Task"
        actions={
          <>
            <button
              onClick={confirmDeleteTask}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
            <button
              onClick={() => setTaskToDelete(null)}
              className="ml-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete "{taskToDelete?.title}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}