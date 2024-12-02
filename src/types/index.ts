export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'quarter_admin' | 'semi_admin' | 'employee';
  department: string;
  position: string;
  avatar?: string;
}

export interface TaskActivity {
  id: string;
  taskId: string;
  type: 'status_change' | 'edit' | 'assignee_change' | 'comment' | 'result';
  userId: string;
  timestamp: string;
  oldValue?: string;
  newValue: string;
  resultLink?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignees: string[];
  assignedBy: string;
  assignedDate: string;
  lastEditedDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: 'sales' | 'development' | 'design' | 'marketing' | 'hr' | 'finance' | 'support';
  activities?: TaskActivity[];
  questReward?: {
    amount: number;
    currency: string;
  };
  resultLink?: string;
}