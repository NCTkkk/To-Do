export interface User {
  id: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: "admin" | "user" | "member";
}
