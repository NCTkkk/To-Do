import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:3000/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get<Task[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (
  data: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> => {
  const token = localStorage.getItem("token");
  const response = await axios.post<Task>(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const token = localStorage.getItem("token");
  const response = await axios.put<Task>(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTasksByMember = async (memberId: string): Promise<Task[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get<Task[]>(`${API_URL}?memberId=${memberId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
