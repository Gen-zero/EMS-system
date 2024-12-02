export type NotificationType = 
  | 'task_assigned'
  | 'task_updated'
  | 'task_completed'
  | 'task_comment'
  | 'quest_accepted'
  | 'quest_completed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  taskId?: string;
  questId?: string;
  userId: string;
}