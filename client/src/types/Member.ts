import type { Task } from "./Task";

export interface Member {
  id: string;
  name: string;
  password: string;
  email: string;
  tasks?: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}
