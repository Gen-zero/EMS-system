import React, { useState } from 'react';
import { Task } from '../../types';
import { Clock, AlertCircle, CheckCircle, MoreVertical, Calendar, Pencil, Trash2, History, DollarSign, MessageCircle } from 'lucide-react';
import EditTaskModal from './EditTaskModal';
import ActivityModal from './ActivityModal';
import CommentsModal from './CommentsModal';
import { formatDate } from '../../utils/dateUtils';
import { MOCK_USERS } from '../../constants/images';

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string, updatedTask: Partial<Task>) => void;
  onDelete: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const categoryColors = {
  sales: 'bg-blue-100 text-blue-800',
  development: 'bg-purple-100 text-purple-800',
  design: 'bg-pink-100 text-pink-800',
  marketing: 'bg-indigo-100 text-indigo-800',
  hr: 'bg-orange-100 text-orange-800',
  finance: 'bg-green-100 text-green-800',
  support: 'bg-teal-100 text-teal-800',
  blockchain: 'bg-violet-100 text-violet-800',
  content: 'bg-cyan-100 text-cyan-800'
};

const statusIcons = {
  pending: AlertCircle,
  in_progress: Clock,
  completed: CheckCircle
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const StatusIcon = statusIcons[task.status];

  const commentCount = (task.activities || []).filter(a => a.type === 'comment').length;

  const handleEdit = (updatedTask: Partial<Task>) => {
    const changes: string[] = [];
    
    if (updatedTask.description !== task.description) {
      changes.push(`description updated`);
    }
    if (updatedTask.category !== task.category) {
      changes.push(`category changed from ${task.category} to ${updatedTask.category}`);
    }
    if (updatedTask.priority !== task.priority) {
      changes.push(`priority changed from ${task.priority} to ${updatedTask.priority}`);
    }
    if (updatedTask.dueDate !== task.dueDate) {
      changes.push(`due date changed from ${formatDate(task.dueDate)} to ${formatDate(updatedTask.dueDate!)}`);
    }
    if (JSON.stringify(updatedTask.assignees) !== JSON.stringify(task.assignees)) {
      changes.push(`assignees updated`);
    }

    const newActivity = {
      id: `activity-${Date.now()}`,
      taskId: task.id,
      type: 'edit',
      userId: 'user2',
      timestamp: new Date().toISOString(),
      newValue: changes.join(', ')
    };

    onEdit(task.id, {
      ...updatedTask,
      lastEditedDate: new Date().toISOString(),
      activities: [...(task.activities || []), newActivity]
    });
    setShowEditModal(false);
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    const newActivity = {
      id: `activity-${Date.now()}`,
      taskId: task.id,
      type: 'status_change',
      userId: 'user2',
      timestamp: new Date().toISOString(),
      oldValue: task.status,
      newValue: newStatus
    };

    onEdit(task.id, {
      status: newStatus,
      activities: [...(task.activities || []), newActivity]
    });
  };

  const handleAddComment = (comment: string) => {
    const newActivity = {
      id: `activity-${Date.now()}`,
      taskId: task.id,
      type: 'comment',
      userId: 'user2',
      timestamp: new Date().toISOString(),
      newValue: comment
    };

    onEdit(task.id, {
      activities: [...(task.activities || []), newActivity]
    });
  };

  const handleAddResult = (link: string) => {
    const newActivity = {
      id: `activity-${Date.now()}`,
      taskId: task.id,
      type: 'result',
      userId: 'user2',
      timestamp: new Date().toISOString(),
      newValue: 'Added result link',
      resultLink: link
    };

    onEdit(task.id, {
      resultLink: link,
      activities: [...(task.activities || []), newActivity]
    });
  };

  return (
    <>
      <div className={`rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
        'questReward' in task 
          ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200'
          : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
              className={`rounded-md border-none text-sm font-medium focus:ring-2 focus:ring-offset-2 ${
                task.status === 'completed' ? 'text-green-600 bg-green-50' :
                task.status === 'in_progress' ? 'text-yellow-600 bg-yellow-50' :
                'text-gray-600 bg-gray-50'
              }`}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowActions(!showActions)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  <button
                    onClick={() => {
                      setShowCommentsModal(true);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comments
                  </button>
                  <button
                    onClick={() => {
                      setShowActivityModal(true);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Activity
                  </button>
                  <button
                    onClick={() => {
                      setShowEditModal(true);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Task
                  </button>
                  <button
                    onClick={() => {
                      onDelete(task);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">{task.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[task.category] || 'bg-gray-100 text-gray-800'}`}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </span>
            {task.questReward && (
              <span className="inline-flex items-center text-sm font-medium text-purple-600">
                <DollarSign className="h-4 w-4 mr-1" />
                {task.questReward.amount} {task.questReward.currency}
              </span>
            )}
          </div>
          <div className="flex -space-x-2">
            {task.assignees.map((userId) => (
              <img
                key={userId}
                src={MOCK_USERS[userId as keyof typeof MOCK_USERS]?.avatar}
                alt={MOCK_USERS[userId as keyof typeof MOCK_USERS]?.name}
                className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
                title={MOCK_USERS[userId as keyof typeof MOCK_USERS]?.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <span>
                Assigned {formatDate(task.assignedDate)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span>
                Due {formatDate(task.dueDate)}
              </span>
            </div>
            <button
              onClick={() => setShowCommentsModal(true)}
              className="flex items-center hover:text-gray-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-gray-400 mr-1" />
              <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEdit}
        />
      )}

      {showActivityModal && (
        <ActivityModal
          activities={task.activities || []}
          onClose={() => setShowActivityModal(false)}
          onAddComment={handleAddComment}
          taskStatus={task.status}
          onAddResult={handleAddResult}
        />
      )}

      {showCommentsModal && (
        <CommentsModal
          activities={task.activities || []}
          onClose={() => setShowCommentsModal(false)}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
}