import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:3000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, { task });
  return response.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getTasksByMember = async (memberId: string) => {
  const res = await axios.get<Task[]>(`${API_URL}?userId=${memberId}`);
  return res.data;
};
