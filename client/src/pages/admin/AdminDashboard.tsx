import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { AdminList } from "./AdminList";
import { AdminMenu } from "./AdminMenu";

export interface User {
  id: string;
  name: string;
  role: "admin" | "user" | "member";
  createdAt: string;
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (
    name: string,
    password: string,
    role: User["role"]
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users",
        { name, password, role },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setUsers([...users, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá người dùng này?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, name: string, role: User["role"]) => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${id}`,
        { name, role },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setUsers(users.map((u) => (u.id === id ? { ...u, name, role } : u)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-30 mr-30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <AdminMenu />
      </div>
      <AdminList
        users={users}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
      />
    </div>
  );
};
