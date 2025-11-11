import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Menu } from "../Menu";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  submission?: string;
  createdAt: string;
  updatedAt: string;
}

export const MemberDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [submission, setSubmission] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // 📥 Lấy danh sách task được giao
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching assigned tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🧾 Gửi bài
  const handleSubmit = async () => {
    if (!selectedTask) return;

    try {
      await axios.put(
        `${API_URL}/tasks/${selectedTask.id}/submit`,
        { submission },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id ? { ...t, status: "done", submission } : t
        )
      );

      setShowModal(false);
      setSubmission("");
      alert("✅ Nộp bài thành công!");
    } catch (err) {
      console.error("Error submitting task:", err);
      alert("❌ Lỗi khi nộp bài!");
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 ">
      <div className="mb-13 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Xin chào {user?.name} 👋 – Danh sách Task được giao
        </h1>

        <Menu />
      </div>

      {tasks.length === 0 ? (
        <p>Hiện bạn chưa được giao task nào.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Trạng thái:{" "}
                <span
                  className={`font-semibold ${
                    task.status === "done"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              {task.submission && (
                <div className="bg-gray-50 border rounded p-2 mb-2">
                  <p className="text-sm text-gray-600">
                    <strong>Bài nộp:</strong> {task.submission}
                  </p>
                </div>
              )}

              {task.status !== "done" && (
                <button
                  onClick={() => {
                    setSelectedTask(task);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Nộp bài
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 📦 Modal nộp bài */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Nộp bài cho task: {selectedTask?.title}
            </h2>

            <textarea
              className="border w-full rounded p-2 h-24 mb-3"
              placeholder="Nhập nội dung nộp bài..."
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={!submission.trim()}
                className={`px-3 py-1 rounded text-white ${
                  submission.trim()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Gửi bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
