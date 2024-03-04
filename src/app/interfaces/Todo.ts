export interface Todo {
    id: string;
    title: string;
    description?: string;
    completionStatus: boolean;
    addedDate: Date;
    dueDate?: Date;
    dueDateHistory?: { changedDate: Date; newDueDate: Date }[];
  }