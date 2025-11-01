import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface User {
  id: string;
  name: string;
  role: "admin" | "user" | "member";
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      console.log("📦 Dữ liệu trả về:", res.data);
      setUsers(res.data.users || res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách:", err);
    } finally {
      setLoading(false);
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

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      await axios.put(
        `http://localhost:3000/api/users/${editingUser.id}`,
        { name: editingUser.name, role: editingUser.role },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setUsers(
        users.map((u) => (u.id === editingUser.id ? { ...editingUser } : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Quản lý người dùng
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users
          .filter((u) => u && u.id && u.name)
          .map((u) => (
            <div
              key={u.id}
              className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3"
            >
              {editingUser?.id === u.id ? (
                <>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  />
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        role: e.target.value as User["role"],
                      })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="member">Member</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Huỷ
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-600">Vai trò: {u.role}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xoá
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
