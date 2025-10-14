import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../api/taskAPI";
import { getUsers } from "../api/userAPI";
import type { Task } from "../types/Task";
import type { User } from "../types/User";

export const TaskAssignment = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, usersData] = await Promise.all([
          getTasks(),
          getUsers(),
        ]);
        setTasks(tasksData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      const updatedTask = await updateTask(taskId, { userId });
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task Assignment</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">Status: {task.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <span>Assign to:</span>
              <select
                value={task.userId || ""}
                onChange={(e) => handleAssignTask(task.id, e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
