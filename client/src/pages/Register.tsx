import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, password, role);
      setMessage("Đăng ký thành công!");
      setName("");
      setPassword("");
      setRole("user");
    } catch (err: any) {
      setMessage("Đăng ký thất bại!");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="border rounded-lg px-3 py-2"
          >
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị viên</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng ký
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
