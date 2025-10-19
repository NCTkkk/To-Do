import { useEffect, useState } from "react";
import type { Task } from "../../types/Task";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export const MemberTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>(
          `http://localhost:3000/api/members/${user?.id}/tasks`
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Lỗi tải tasks của member:", err);
      }
    };
    if (user?.id) fetchTasks();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách Task của bạn</h1>
      {tasks.length === 0 ? (
        <p>Không có task nào.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Mô tả</th>
              <th className="border px-4 py-2">Mức độ</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Hạn chót</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td className="border px-4 py-2">{t.title}</td>
                <td className="border px-4 py-2">{t.description}</td>
                <td className="border px-4 py-2 capitalize">{t.priority}</td>
                <td className="border px-4 py-2 capitalize">{t.status}</td>
                <td className="border px-4 py-2">
                  {new Date(t.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
