import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:3000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, { title });
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
