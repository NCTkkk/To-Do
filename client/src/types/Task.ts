export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string; // reference to assigned user
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
