import axios from "axios";
import type { Member } from "../types/Member";

const API_URL = "http://localhost:3000/api/members";

export const getMembers = async (): Promise<Member[]> => {
  const response = await axios.get<Member[]>(API_URL);
  return response.data;
};

export const getMember = async (id: string): Promise<Member> => {
  const response = await axios.get<Member>(`${API_URL}/${id}`);
  return response.data;
};

export const createMember = async (
  memberData: Omit<Member, "id">
): Promise<Member> => {
  const response = await axios.post<Member>(API_URL, memberData);
  return response.data;
};

export const updateMember = async (
  id: string,
  memberData: Partial<Member>
): Promise<Member> => {
  const response = await axios.put<Member>(`${API_URL}/${id}`, memberData);
  return response.data;
};

export const deleteMember = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
