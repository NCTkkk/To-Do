import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, LogOut } from "lucide-react";

export const AdminMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <span className="font-semibold text-gray-700">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
          <ul className="py-2">
            <li>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => alert("Trang cá nhân đang làm 😎")}
              >
                <User size={16} /> Hồ sơ cá nhân
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={logout}
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
