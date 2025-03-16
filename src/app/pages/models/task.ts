export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  }
  