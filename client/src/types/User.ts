export interface User {
  id: string;
  name: string;
  password: string;
  tasks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
