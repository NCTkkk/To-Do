import { useEffect, useState } from "react";
import axios from "axios";

export const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Lỗi khi lấy profile:", err));
  }, []);

  if (!profile) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
      <p>
        <strong>Tên:</strong> {profile.name}
      </p>
      <p>
        <strong>Vai trò:</strong> {profile.role}
      </p>
      <p>
        <strong>Ngày tạo:</strong> {profile.createdAt}
      </p>
    </div>
  );
};
