import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import QuestCard from './QuestCard';
import NewQuestModal from './NewQuestModal';
import QuestFilters from './QuestFilters';
import { Quest } from '../../types/quest';
import { Task } from '../../types/index';
import { MOCK_USERS } from '../../constants/images';
import { MOCK_QUESTS } from './mockData';

interface QuestBoardProps {
  onQuestAccepted?: (task: Task) => void;
}

export default function QuestBoard({ onQuestAccepted }: QuestBoardProps) {
  const [quests, setQuests] = useState<Quest[]>(MOCK_QUESTS);
  const [isNewQuestModalOpen, setIsNewQuestModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    minReward: '',
    maxReward: ''
  });

  const handleAddQuest = (newQuest: Quest) => {
    setQuests([...quests, newQuest]);
    setIsNewQuestModalOpen(false);
  };

  const handleUpdateQuest = (questId: string, updatedQuest: Partial<Quest>) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => quest.id === questId ? { ...quest, ...updatedQuest } : quest)
    );
  };

  const handleAcceptQuest = (quest: Quest) => {
    // Remove the quest from the board immediately
    setQuests(prevQuests => prevQuests.filter(q => q.id !== quest.id));

    if (onQuestAccepted) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: quest.title,
        description: quest.description,
        assignees: ['user1'], // Current user
        assignedBy: quest.postedBy.id,
        assignedDate: new Date().toISOString(),
        status: 'in_progress',
        priority: quest.difficulty === 'expert' ? 'high' : 
                 quest.difficulty === 'advanced' ? 'medium' : 'low',
        dueDate: quest.deadline,
        category: quest.category as Task['category'],
        activities: [{
          id: `activity-${Date.now()}`,
          taskId: `task-${Date.now()}`,
          type: 'status_change',
          userId: 'user1',
          timestamp: new Date().toISOString(),
          oldValue: 'pending',
          newValue: 'in_progress'
        }],
        questReward: quest.reward
      };

      onQuestAccepted(newTask);
    }
  };

  const filteredQuests = quests.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || quest.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'all' || quest.difficulty === filters.difficulty;
    const matchesStatus = filters.status === 'all' || quest.status === filters.status;
    const matchesReward = (!filters.minReward || quest.reward.amount >= Number(filters.minReward)) &&
                         (!filters.maxReward || quest.reward.amount <= Number(filters.maxReward));

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus && matchesReward;
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-8">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quest Board</h1>
            <p className="text-gray-600">Find and accept quests to earn rewards</p>
          </div>
          <button
            onClick={() => setIsNewQuestModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post Quest
          </button>
        </div>

        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-shrink-0">
            <QuestFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuests.length > 0 ? (
          filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onUpdate={handleUpdateQuest}
              onAcceptQuest={handleAcceptQuest}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No quests found matching your criteria</p>
          </div>
        )}
      </div>

      {isNewQuestModalOpen && (
        <NewQuestModal
          onClose={() => setIsNewQuestModalOpen(false)}
          onSubmit={handleAddQuest}
        />
      )}
    </div>
  );
}