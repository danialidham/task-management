export interface Task {
    id?: number;
    title: string;
    assigned_to: string;
    description?: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    created_at?: string;
  }
  