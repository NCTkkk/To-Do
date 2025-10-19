import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [role, setRole] = useState<"admin" | "user" | "member">("user");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);

    // điều hướng dựa trên role
    if (role === "admin") navigate("/admin");
    else if (role === "user") navigate("/user");
    else navigate("/member");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Role:</span>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "admin" | "user" | "member")
            }
            className="border rounded p-2"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="member">Member</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
