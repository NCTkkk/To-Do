import axios from "axios";
import type { User } from "../types/User";

const API_URL = "http://localhost:3000/api/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/${id}`);
  return response.data;
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const response = await axios.post<User>(API_URL, userData);
  return response.data;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const response = await axios.put<User>(`${API_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
