import axios from "axios";
import type { Admin } from "../types/Admin";

const API_URL = "http://localhost:3000/api/admins";

export const getAdmins = async (): Promise<Admin[]> => {
  const response = await axios.get<Admin[]>(API_URL);
  return response.data;
};

export const getAdmin = async (id: string): Promise<Admin> => {
  const response = await axios.get<Admin>(`${API_URL}/${id}`);
  return response.data;
};

export const createAdmin = async (
  adminData: Omit<Admin, "id">
): Promise<Admin> => {
  const response = await axios.post<Admin>(API_URL, adminData);
  return response.data;
};

export const updateAdmin = async (
  id: string,
  adminData: Partial<Admin>
): Promise<Admin> => {
  const response = await axios.put<Admin>(`${API_URL}/${id}`, adminData);
  return response.data;
};

export const deleteAdmin = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
