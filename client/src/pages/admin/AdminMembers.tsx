import { useState, useEffect } from "react";
import type { Member } from "../../types/Member";
import { getMembers, deleteMember } from "../../api/memberAPI";

export const AdminMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa member này?")) return;
    try {
      await deleteMember(id);
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý Members</h1>
      {members.length === 0 ? (
        <p>Không có member nào.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Số nhiệm vụ</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td className="border px-4 py-2">{m.id}</td>
                <td className="border px-4 py-2">{m.name}</td>
                <td className="border px-4 py-2">{m.email}</td>
                <td className="border px-4 py-2 text-center">
                  {m.tasks ? m.tasks.length : 0}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
