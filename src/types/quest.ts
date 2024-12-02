export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: {
    amount: number;
    currency: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  timeEstimate: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  skills: string[];
  postedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}