import { useEffect, useState } from "react";
import type { Task } from "../../types/Task";
import { getTasksByMember } from "../../api/taskAPI";
import { useAuth } from "../../context/AuthContext";

export const MemberDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const data = await getTasksByMember(user.id);
        setTasks(data);
      } catch (err) {
        console.error("Lỗi khi tải task:", err);
      }
    };
    fetchTasks();
  }, [user]);

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status:
                t.status === "done"
                  ? "todo"
                  : t.status === "in-progress"
                  ? "done"
                  : "in-progress",
            }
          : t
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nhiệm vụ của bạn</h1>

      {tasks.length === 0 ? (
        <p>Không có task nào được giao.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Tiêu đề</th>
              <th className="border px-4 py-2">Mức độ</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Hạn chót</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td className="border px-4 py-2">{t.title}</td>
                <td className="border px-4 py-2 capitalize">{t.priority}</td>
                <td className="border px-4 py-2 capitalize">{t.status}</td>
                <td className="border px-4 py-2">
                  {new Date(t.dueDate).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => toggleTaskStatus(t.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Cập nhật trạng thái
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
