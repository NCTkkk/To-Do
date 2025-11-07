// import { useEffect, useState } from "react";
// import type { Task } from "../../types/Task";
// import {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../../api/taskAPI";
// import { useAuth } from "../../context/AuthContext";

// export const UserTasks = () => {
//   const { user } = useAuth();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     priority: "medium" as "low" | "medium" | "high",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getTasks();
//         setTasks(data);
//       } catch (err) {
//         console.error("Lỗi tải tasks:", err);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleAdd = async () => {
//     if (!newTask.title.trim()) return alert("Nhập tiêu đề task");
//     const newItem: Task = {
//       id: Date.now().toString(),
//       title: newTask.title,
//       description: newTask.description,
//       completed: false,
//       userId: user!.id,
//       priority: newTask.priority,
//       status: "todo",
//       dueDate: new Date(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     try {
//       const res = await createTask(newItem);
//       setTasks([...tasks, res]);
//       setNewTask({ title: "", description: "", priority: "medium" });
//     } catch (err) {
//       console.error("Lỗi thêm task:", err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Xóa task này?")) return;
//     try {
//       await deleteTask(id);
//       setTasks(tasks.filter((t) => t.id !== id));
//     } catch (err) {
//       console.error("Lỗi xóa:", err);
//     }
//   };

//   const handleToggleStatus = async (task: Task) => {
//     const nextStatus: "todo" | "in-progress" | "done" =
//       task.status === "todo"
//         ? "in-progress"
//         : task.status === "in-progress"
//         ? "done"
//         : "todo";

//     try {
//       const updated = { ...task, status: nextStatus, updatedAt: new Date() };
//       await updateTask(task.id, updated);
//       setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
//     } catch (err) {
//       console.error("Lỗi cập nhật:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Quản lý Task</h1>

//       {/* Form thêm task */}
//       <div className="mb-6 flex gap-2">
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           placeholder="Tiêu đề task"
//           className="border p-2 rounded w-1/4"
//         />
//         <input
//           type="text"
//           value={newTask.description}
//           onChange={(e) =>
//             setNewTask({ ...newTask, description: e.target.value })
//           }
//           placeholder="Mô tả"
//           className="border p-2 rounded w-1/3"
//         />
//         <select
//           value={newTask.priority}
//           onChange={(e) =>
//             setNewTask({
//               ...newTask,
//               priority: e.target.value as "low" | "medium" | "high",
//             })
//           }
//           className="border p-2 rounded"
//         >
//           <option value="low">Thấp</option>
//           <option value="medium">Trung bình</option>
//           <option value="high">Cao</option>
//         </select>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Thêm
//         </button>
//       </div>

//       {/* Danh sách task */}
//       {tasks.length === 0 ? (
//         <p>Không có task nào.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Tiêu đề</th>
//               <th className="border px-4 py-2">Mô tả</th>
//               <th className="border px-4 py-2">Mức độ</th>
//               <th className="border px-4 py-2">Trạng thái</th>
//               <th className="border px-4 py-2">Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((t) => (
//               <tr key={t.id}>
//                 <td className="border px-4 py-2">{t.title}</td>
//                 <td className="border px-4 py-2">{t.description}</td>
//                 <td className="border px-4 py-2 capitalize">{t.priority}</td>
//                 <td className="border px-4 py-2 capitalize">{t.status}</td>
//                 <td className="border px-4 py-2 flex gap-2 justify-center">
//                   <button
//                     onClick={() => handleToggleStatus(t)}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     Cập nhật trạng thái
//                   </button>
//                   <button
//                     onClick={() => handleDelete(t.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Xóa
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };
