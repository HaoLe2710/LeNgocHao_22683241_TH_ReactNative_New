export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
  syncedAt?: string;
}

export type TaskInput = Omit<Task, 'id' | 'syncedAt'>;
