import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  role: string;
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsers(res.data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/users", newUser);
    setNewUser({ name: "", password: "", role: "user" });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>

      {/* Form thêm user */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow mb-6 flex gap-2"
      >
        <input
          type="text"
          placeholder="Tên người dùng"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 rounded w-1/3"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 rounded w-1/3"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 rounded w-1/4"
        >
          <option value="user">User</option>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm
        </button>
      </form>

      {/* Danh sách user */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{u.name}</h3>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>
            <button
              onClick={() => handleDelete(u.id)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
