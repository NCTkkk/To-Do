// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export function Login() {
//   const [role, setRole] = useState<"admin" | "user" | "member">("user");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     login(role);

//     // điều hướng dựa trên role
//     if (role === "admin") navigate("/admin");
//     else if (role === "user") navigate("/user");
//     else navigate("/member");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-[70vh]">
//       <h1 className="text-3xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
//         <label className="flex flex-col">
//           <span className="mb-1 font-semibold">Role:</span>
//           <select
//             value={role}
//             onChange={(e) =>
//               setRole(e.target.value as "admin" | "user" | "member")
//             }
//             className="border rounded p-2"
//           >
//             <option value="admin">Admin</option>
//             <option value="user">User</option>
//             <option value="member">Member</option>
//           </select>
//         </label>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(name, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          disabled={loading}
          className={`bg-blue-500 text-white w-full py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <p className="text-center text-sm mt-3">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </form>
    </div>
  );
}
