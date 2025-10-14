import { useEffect, useState } from "react";
import { TaskCard } from "./propTaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskAPI";
import type { Task } from "../types/Task";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const onRowClick = async (id: string) => {
    try {
      const updatedTask = await updateTask(id, {
        completed: !tasks.find((t) => t.id === id)?.completed,
      });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const addTask = async (title: string) => {
    if (title.trim() === "") return;
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
      setTitle("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (id: string, title: string) => {
    try {
      const updatedTask = await updateTask(id, { title });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="flex items-center gap-4 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Enter task title..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => addTask(title)}
        >
          Add Task
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map((item, index) => (
          <TaskCard
            key={item.id}
            index={index}
            task={item}
            onRowClick={onRowClick}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}
