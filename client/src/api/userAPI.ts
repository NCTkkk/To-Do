import axios from "axios";
import type { User } from "../types/User";

const API_URL = "http://localhost:3000/api/users";

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get<User[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.get<User>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createUser = async (data: Omit<User, "id">): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.post<User>(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.put<User>(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
