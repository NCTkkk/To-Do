import { useEffect, useState } from "react";
import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

interface Submission {
  id: string;
  title: string;
  status: string;
  submission?: string;
  assignedTo?: string;
}

export const UserSubmissions = () => {
  // const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/submissions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Các bài nộp của member cho task của bạn 📦
      </h1>

      {submissions.length === 0 ? (
        <p>Chưa có bài nộp nào.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <div key={s.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Trạng thái:{" "}
                <span
                  className={`font-semibold ${
                    s.status === "done" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {s.status}
                </span>
              </p>

              {s.submission ? (
                <div className="bg-gray-50 border rounded p-2">
                  <strong>Bài nộp:</strong> {s.submission}
                </div>
              ) : (
                <p className="italic text-gray-400">Chưa nộp bài.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
