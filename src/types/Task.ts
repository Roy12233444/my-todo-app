export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    deadline: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

export type SortKey = 'priority' | 'deadline' | 'default';