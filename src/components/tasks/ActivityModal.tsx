import React, { useState } from 'react';
import { TaskActivity } from '../../types';
import { X, History, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { MOCK_USERS } from '../../constants/images';

interface ActivityModalProps {
  activities: TaskActivity[];
  onClose: () => void;
  taskStatus: string;
  onAddResult: (link: string) => void;
}

const mockUsers = {
  user1: {
    name: 'ॐ Kalidasaya Nama',
    avatar: MOCK_USERS.user1.avatar,
  },
  user2: {
    name: 'ॐ Manu Narayanaya',
    avatar: MOCK_USERS.user2.avatar,
  },
  user3: {
    name: 'Admin',
    avatar: MOCK_USERS.user1.avatar,
  },
  admin1: {
    name: 'Admin',
    avatar: MOCK_USERS.user1.avatar,
  },
};

const getActivityText = (activity: TaskActivity) => {
  switch (activity.type) {
    case 'status_change':
      return `changed status from ${activity.oldValue} to ${activity.newValue}${
        activity.resultLink ? ` with result: ${activity.resultLink}` : ''
      }`;
    case 'edit':
      return activity.newValue;
    case 'result':
      return `added result link: ${activity.resultLink}`;
    default:
      return 'performed an action';
  }
};

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: format(date, 'dd MMM yyyy'),
    time: format(date, 'HH:mm:ss')
  };
};

const ActivityModal: React.FC<ActivityModalProps> = ({
  activities,
  onClose,
  taskStatus,
  onAddResult
}) => {
  const [resultLink, setResultLink] = useState('');
  const [showResultInput, setShowResultInput] = useState(false);

  // Filter out comment activities
  const nonCommentActivities = activities.filter(activity => activity.type !== 'comment');

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (resultLink.trim()) {
      onAddResult(resultLink.trim());
      setResultLink('');
      setShowResultInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <History className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Activity History
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Activity List */}
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {nonCommentActivities.length > 0 ? (
                nonCommentActivities
                  .sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((activity) => {
                    const datetime = formatDateTime(activity.timestamp);
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3"
                      >
                        <img
                          src={
                            mockUsers[activity.userId as keyof typeof mockUsers]
                              ?.avatar
                          }
                          alt={
                            mockUsers[activity.userId as keyof typeof mockUsers]
                              ?.name
                          }
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {
                                mockUsers[
                                  activity.userId as keyof typeof mockUsers
                                ]?.name
                              }
                            </span>
                            <span className="text-gray-500">
                              {getActivityText(activity)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{datetime.date}</span>
                            <span>•</span>
                            <span>{datetime.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-center text-gray-500">
                  No activity recorded yet
                </p>
              )}
            </div>

            {/* Result Link Input (only shown when status is completed) */}
            {taskStatus === 'completed' && !showResultInput && (
              <button
                onClick={() => setShowResultInput(true)}
                className="mb-4 flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                Add Result Link
              </button>
            )}

            {showResultInput && (
              <form onSubmit={handleSubmitResult} className="mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={resultLink}
                    onChange={(e) => setResultLink(e.target.value)}
                    placeholder="Enter result link (optional)"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResultInput(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;