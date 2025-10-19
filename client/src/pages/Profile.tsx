import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user } = useAuth();

  // nếu chưa login → báo
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">You need to log in first.</p>
      </div>
    );
  }

  const [name, setName] = useState(user.name);
  const [role] = useState(user.role);
  const [message, setMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // sau này sẽ gọi API update user info ở đây
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Role</label>
            <input
              type="text"
              value={role}
              disabled
              className="border p-2 w-full rounded bg-gray-100 text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>

          {message && (
            <p className="text-green-500 text-center mt-3">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
