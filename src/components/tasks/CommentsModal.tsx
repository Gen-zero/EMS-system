import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { TaskActivity } from '../../types';
import { format } from 'date-fns';
import { MOCK_USERS } from '../../constants/images';

interface CommentsModalProps {
  activities: TaskActivity[];
  onClose: () => void;
  onAddComment: (comment: string) => void;
}

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: format(date, 'dd MMM yyyy'),
    time: format(date, 'HH:mm:ss')
  };
};

export default function CommentsModal({ activities, onClose, onAddComment }: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');
  const comments = activities.filter(a => a.type === 'comment');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
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
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {comments.length > 0 ? (
                comments
                  .sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((comment) => {
                    const datetime = formatDateTime(comment.timestamp);
                    return (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={
                              MOCK_USERS[comment.userId as keyof typeof MOCK_USERS]
                                ?.avatar
                            }
                            alt={
                              MOCK_USERS[comment.userId as keyof typeof MOCK_USERS]
                                ?.name
                            }
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {
                                  MOCK_USERS[
                                    comment.userId as keyof typeof MOCK_USERS
                                  ]?.name
                                }
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">{comment.newValue}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                              <span>{datetime.date}</span>
                              <span>•</span>
                              <span>{datetime.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-center text-gray-500">No comments yet</p>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleSubmitComment}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}