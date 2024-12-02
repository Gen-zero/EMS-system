import React from 'react';
import { Clock, DollarSign, Calendar, Award, ChevronRight } from 'lucide-react';
import { Quest } from '../../types/quest';
import { Task } from '../../types/index';
import { formatDate } from '../../utils/dateUtils';
import { MOCK_USERS } from '../../constants/images';

interface QuestCardProps {
  quest: Quest;
  onUpdate: (questId: string, updatedQuest: Partial<Quest>) => void;
  onAcceptQuest: (quest: Quest) => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-orange-100 text-orange-800',
  expert: 'bg-red-100 text-red-800'
};

const categoryColors = {
  design: 'bg-purple-100 text-purple-800',
  development: 'bg-blue-100 text-blue-800',
  blockchain: 'bg-indigo-100 text-indigo-800',
  marketing: 'bg-pink-100 text-pink-800',
  content: 'bg-teal-100 text-teal-800',
  research: 'bg-cyan-100 text-cyan-800'
};

export default function QuestCard({ quest, onUpdate, onAcceptQuest }: QuestCardProps) {
  // Check if the current user is the quest poster
  const isOwnQuest = quest.postedBy.id === 'user1'; // Assuming 'user1' is the current user's ID

  const handleAcceptQuest = () => {
    onAcceptQuest(quest);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {quest.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                difficultyColors[quest.difficulty]
              }`}>
                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                categoryColors[quest.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'
              }`}>
                {quest.category.charAt(0).toUpperCase() + quest.category.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center text-lg font-semibold text-green-600">
            <DollarSign className="h-5 w-5 mr-1" />
            {quest.reward.amount}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {quest.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {quest.timeEstimate} estimated
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Due {formatDate(quest.deadline)}
          </div>
          {quest.skills.length > 0 && (
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              <div className="flex flex-wrap gap-1">
                {quest.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={quest.postedBy.avatar}
              alt={quest.postedBy.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">
                {quest.postedBy.name}
              </p>
              <p className="text-xs text-gray-500">
                Posted {formatDate(quest.createdAt)}
              </p>
            </div>
          </div>
          <button
            onClick={handleAcceptQuest}
            disabled={quest.status !== 'open' || isOwnQuest}
            className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isOwnQuest
                ? 'bg-gray-400 cursor-not-allowed'
                : quest.status === 'open'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isOwnQuest ? (
              'Your Quest'
            ) : quest.status === 'open' ? (
              <>
                Accept Quest
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              quest.status.replace('_', ' ').charAt(0).toUpperCase() + quest.status.slice(1)
            )}
          </button>
        </div>
      </div>
    </div>
  );
}