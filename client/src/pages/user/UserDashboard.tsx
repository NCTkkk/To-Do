// import { useState } from "react";
// import { UserTasks } from "./UserTasks";
// import { UserProfile } from "./UserProfile";

// export const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState<"tasks" | "profile">("tasks");

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
//         User Dashboard
//       </h1>

//       {/* Tabs */}
//       <div className="flex justify-center gap-4 mb-8">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "tasks"
//               ? "bg-green-500 text-white"
//               : "bg-gray-200 hover:bg-gray-300"
//           }`}
//           onClick={() => setActiveTab("tasks")}
//         >
//           Nhiệm vụ
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "profile"
//               ? "bg-green-500 text-white"
//               : "bg-gray-200 hover:bg-gray-300"
//           }`}
//           onClick={() => setActiveTab("profile")}
//         >
//           Hồ sơ cá nhân
//         </button>
//       </div>

//       {/* Nội dung */}
//       <div className="border rounded-lg shadow p-6 bg-white">
//         {activeTab === "tasks" && <UserTasks />}
//         {activeTab === "profile" && <UserProfile />}
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import type { Task } from "../../types/Task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskAPI";
import { useAuth } from "../../context/AuthContext";

export const UserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
  });

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

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return alert("Nhập tiêu đề task!");

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      userId: user!.id,
      priority: newTask.priority,
      status: "todo",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const res = await createTask(task);
      setTasks([...tasks, res]);
      setNewTask({ title: "", description: "", priority: "medium" });
    } catch (err) {
      console.error("Lỗi thêm task:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa task này?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Lỗi xóa task:", err);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const nextStatus = (
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
        ? "done"
        : "todo"
    ) as "todo" | "in-progress" | "done";

    const updatedTask = { ...task, status: nextStatus, updatedAt: new Date() };
    try {
      await updateTask(task.id, {
        status: nextStatus as "todo" | "in-progress" | "done",
        updatedAt: new Date(),
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Task (User)</h1>

      {/* Form thêm task */}
      <div className="mb-6 flex gap-2">
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
                <td className="border px-4 py-2 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => handleToggleStatus(t)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Cập nhật
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
    </div>
  );
};
