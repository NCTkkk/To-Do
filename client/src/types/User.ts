import type { Task } from "./Task";

export interface User {
  id: string;
  name: string;
  password: string;
  tasks?: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}
