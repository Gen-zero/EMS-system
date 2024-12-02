import { Quest } from '../../types/quest';
import { MOCK_USERS } from '../../constants/images';

export const MOCK_QUESTS: Quest[] = [
  {
    id: 'quest-1',
    title: 'Design New Landing Page',
    description: 'Create a modern, responsive landing page design for our blockchain product. Must include hero section, features, pricing, and contact form.',
    reward: {
      amount: 500,
      currency: 'USD'
    },
    difficulty: 'intermediate',
    timeEstimate: '1 week',
    deadline: '2024-04-01',
    status: 'open',
    category: 'design',
    skills: ['UI/UX', 'Figma', 'Responsive Design'],
    postedBy: {
      id: 'user2',
      name: MOCK_USERS.user2.name,
      avatar: MOCK_USERS.user2.avatar
    },
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'quest-2',
    title: 'Smart Contract Development',
    description: 'Develop and deploy a smart contract for NFT minting with whitelist functionality and royalty support.',
    reward: {
      amount: 1000,
      currency: 'USD'
    },
    difficulty: 'expert',
    timeEstimate: '2 weeks',
    deadline: '2024-04-15',
    status: 'open',
    category: 'blockchain',
    skills: ['Solidity', 'Web3.js', 'Smart Contracts'],
    postedBy: {
      id: 'user1',
      name: MOCK_USERS.user1.name,
      avatar: MOCK_USERS.user1.avatar
    },
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z'
  },
  {
    id: 'quest-3',
    title: 'Content Writing for Blog',
    description: 'Write 5 blog posts about blockchain technology, DeFi, and Web3 development. Each post should be 1500-2000 words.',
    reward: {
      amount: 300,
      currency: 'USD'
    },
    difficulty: 'beginner',
    timeEstimate: '1 week',
    deadline: '2024-03-30',
    status: 'open',
    category: 'content',
    skills: ['Content Writing', 'SEO', 'Blockchain Knowledge'],
    postedBy: {
      id: 'admin1',
      name: MOCK_USERS.admin1.name,
      avatar: MOCK_USERS.admin1.avatar
    },
    createdAt: '2024-03-13T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z'
  }
];