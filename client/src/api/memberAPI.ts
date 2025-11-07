import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const getMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/members`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    console.error("Error fetching members:", err);
    throw err.response?.data || { message: "Lỗi khi tải danh sách member" };
  }
};

export const getAssignedTasks = async () => {
  const res = await axios.get("/members/tasks");
  return res.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
  const res = await axios.put(`/members/tasks/${id}/status`, { status });
  return res.data;
};
