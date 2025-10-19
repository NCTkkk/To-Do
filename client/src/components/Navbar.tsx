import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link to="/">ToDo App</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/admin/users" className="hover:text-blue-400">
              Users
            </Link>
            <Link to="/admin/members" className="hover:text-blue-400">
              Members
            </Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/user/tasks" className="hover:text-blue-400">
              Tasks
            </Link>
            <Link to="/user/assign" className="hover:text-blue-400">
              Assign Work
            </Link>
          </>
        )}

        {user?.role === "member" && (
          <>
            <Link to="/member/tasks" className="hover:text-blue-400">
              My Tasks
            </Link>
          </>
        )}

        {user && (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="hover:text-blue-400 border-l pl-3 ml-3"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
