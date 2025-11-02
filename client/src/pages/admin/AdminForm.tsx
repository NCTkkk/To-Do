import { useState } from "react";
import type { User } from "./AdminDashboard";

interface Props {
  onCreate: (name: string, password: string, role: User["role"]) => void;
}

export const AdminForm = ({ onCreate }: Props) => {
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    role: "user" as User["role"],
  });

  const handleSubmit = () => {
    if (!newUser.name || !newUser.password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    onCreate(newUser.name, newUser.password, newUser.role);
    setNewUser({ name: "", password: "", role: "user" });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
      <input
        type="text"
        placeholder="Tên người dùng"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        className="border rounded px-3 py-2 w-48"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="border rounded px-3 py-2 w-48"
      />
      <select
        value={newUser.role}
        onChange={(e) =>
          setNewUser({ ...newUser, role: e.target.value as User["role"] })
        }
        className="border rounded px-3 py-2"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="member">Member</option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Thêm
      </button>
    </div>
  );
};
