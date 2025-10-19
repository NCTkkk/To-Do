import { useAuth } from "../../context/AuthContext";

export const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Thông tin Admin</h2>
      {user ? (
        <div className="space-y-3">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Tên:</strong> {user.name}
          </p>
          <p>
            <strong>Vai trò:</strong> {user.role}
          </p>
          <p>
            <strong>Email:</strong> admin@example.com
          </p>
        </div>
      ) : (
        <p>Không có thông tin người dùng.</p>
      )}
    </div>
  );
};
