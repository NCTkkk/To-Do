import { useState, useEffect } from "react";
import type { User } from "../../types/User";
import { getUsers, deleteUser } from "../../api/userAPI";

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa user này?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý Users</h1>
      {users.length === 0 ? (
        <p>Không có user nào.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Ngày tạo</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
