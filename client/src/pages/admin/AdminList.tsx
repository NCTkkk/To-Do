import { useState } from "react";
import type { User } from "./AdminDashboard";
import { AdminForm } from "./AdminForm";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string, role: User["role"]) => void;
  onCreate: (name: string, password: string, role: User["role"]) => void;
}

export const AdminList = ({ users, onDelete, onUpdate, onCreate }: Props) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Lọc user theo từ khóa
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      {/* 🔍 Thanh tìm kiếm */}
      <div className="relative w-full sm:w-64 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-400 pl-10 pr-3 py-2 rounded w-full"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
      </div>

      {/* ➕ Form thêm người dùng */}
      <AdminForm onCreate={onCreate} />

      {/* 📋 Danh sách người dùng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((u) => (
          <div
            key={u.id}
            className="bg-white shadow rounded-2xl p-4 flex flex-col gap-3"
          >
            {editingUser?.id === u.id ? (
              <>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="border rounded px-2 py-1"
                />
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value as User["role"],
                    })
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="member">Member</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onUpdate(
                        editingUser.id,
                        editingUser.name,
                        editingUser.role
                      );
                      setEditingUser(null);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Huỷ
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">{u.name}</p>
                <p className="text-sm text-gray-600">Vai trò: {u.role}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditingUser(u)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* 🔢 Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span>
          Trang {page}/{totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};
