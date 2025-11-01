import { useAuth } from "../../context/AuthContext";

export const AdminProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thông tin Admin</h2>
      {user ? (
        <>
          <p>
            <strong>Tên:</strong> {user.name}
          </p>
          <p>
            <strong>Vai trò:</strong> {user.role}
          </p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </>
      ) : (
        <p>Không có thông tin người dùng.</p>
      )}
    </div>
  );
};
