import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        password,
        role,
      });
      alert("✅ Đăng ký thành công!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi đăng ký!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80 space-y-3"
      >
        <h2 className="text-xl font-semibold text-center mb-3">Đăng ký</h2>

        <input
          className="border p-2 rounded w-full"
          placeholder="Tên đăng nhập"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded w-full"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="user">User</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded w-full hover:bg-blue-700"
        >
          Đăng ký
        </button>
        <p className="text-center text-sm mt-3">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  );
};
