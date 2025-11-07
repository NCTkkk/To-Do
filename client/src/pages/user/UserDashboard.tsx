import { useEffect, useState } from "react";
import type { Task } from "../../types/Task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskAPI";
import { useAuth } from "../../context/AuthContext";
import { getMembers } from "../../api/memberAPI"; // giả định bạn có API này
import { useNavigate } from "react-router-dom";
import { Menu } from "../Profile";

export const UserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [members, setMembers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  // 📦 Lấy danh sách task của user
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const data = await getTasks();
        const userTasks = data.filter(
          (t) => String(t.userId) === String(user.id)
        );
        setTasks(userTasks);
      } catch (err) {
        console.error("Lỗi tải tasks:", err);
      }
    };
    fetchTasks();
  }, [user]);

  // 👥 Lấy danh sách member
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getMembers();
        setMembers(res);
      } catch (err) {
        console.error("Lỗi tải members:", err);
      }
    };
    fetchMembers();
  }, []);

  // ➕ Thêm task mới
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return alert("Nhập tiêu đề task!");
    try {
      const res = await createTask({
        title: newTask.title,
        description: newTask.description,
        userId: user!.id,
        completed: false,
        priority: newTask.priority,
        status: "todo",
        dueDate: new Date(),
      });
      setTasks((prev) => [...prev, res]);
      setNewTask({ title: "", description: "", priority: "medium" });
    } catch (err) {
      console.error("Lỗi thêm task:", err);
    }
  };

  // 🗑️ Xóa task
  const handleDelete = async (id: string) => {
    if (!confirm("Xóa task này?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Lỗi xóa task:", err);
    }
  };

  // 🔁 Cập nhật trạng thái task
  const handleToggleStatus = async (task: Task) => {
    const nextStatus: "todo" | "in-progress" | "done" =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
        ? "done"
        : "todo";

    const updatedTask = { ...task, status: nextStatus, updatedAt: new Date() };
    try {
      await updateTask(task.id, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  // 🎯 Mở modal giao task
  const openAssignModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  // ✅ Giao task cho member
  const assignTask = async (memberId: string) => {
    if (!selectedTaskId) return;

    try {
      await updateTask(selectedTaskId, { assignedTo: String(memberId) });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTaskId ? { ...t, assignedTo: String(memberId) } : t
        )
      );
      setShowModal(false);
      setSelectedTaskId(null);
    } catch (err) {
      console.error("Lỗi giao task:", err);
    }
  };

  console.log("members raw: ", members);

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-30 mr-30">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Quản lý Task (User)</h1>

        <Menu />
      </div>

      {/* Form thêm task */}
      <div className="mb-10 flex gap-2 ">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Tiêu đề task"
          className="border p-2 rounded w-1/4"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Mô tả"
          className="border p-2 rounded w-1/3"
        />
        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              priority: e.target.value as "low" | "medium" | "high",
            })
          }
          className="border p-2 rounded"
        >
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>

        <button
          onClick={() => navigate("/user/submissions")}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📑 Xem các bài nộp
        </button>
      </div>

      {/* Danh sách task */}
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
              <th className="border px-4 py-2">Giao cho</th>
              <th className="border px-4 py-2">Hành động</th>
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
                  {t.assignedTo ? (
                    members.find((m) => m.id === t.assignedTo)?.id || "Đã giao"
                  ) : (
                    <span className="text-gray-400">Chưa giao</span>
                  )}
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleToggleStatus(t)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => openAssignModal(t.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Giao task
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
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

      {/* Modal chọn member */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Chọn thành viên</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {members.map((m) => (
                <button
                  key={m.id}
                  onClick={() => assignTask(m.id)}
                  className="w-full text-left border rounded p-2 hover:bg-blue-50"
                >
                  {m.name} <span className="text-gray-500">({m.role})</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
