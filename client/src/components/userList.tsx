// import { useState, useEffect } from "react";
// import type { User } from "../types/User";
// import { getUsers, createUser, updateUser, deleteUser } from "../api/userAPI";
// import { UserCard } from "./propUserList";

// export const UserList = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState({ name: "", password: "" });
//   const [editingUser, setEditingUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleCreateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newUser.name.trim() === "" || newUser.password.trim() === "") return;
//     try {
//       const createdUser = await createUser(newUser);
//       setUsers([...users, createdUser]);
//       setNewUser({ name: "", password: "" });
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   const handleUpdateUser = async (id: string, updateData: Partial<User>) => {
//     try {
//       const updatedUser = await updateUser(id, updateData);
//       setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
//       setEditingUser(null);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleDeleteUser = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return;
//     }
//     try {
//       await deleteUser(id);
//       setUsers(users.filter((user) => user.id !== id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Users</h2>

//       <form
//         onSubmit={handleCreateUser}
//         className="mb-8 p-4 bg-gray-50 rounded-lg"
//       >
//         <h3 className="text-xl font-semibold mb-4">Add New User</h3>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newUser.name}
//             onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             className="flex-1 border rounded-lg px-4 py-2"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newUser.password}
//             onChange={(e) =>
//               setNewUser({ ...newUser, password: e.target.value })
//             }
//             className="flex-1 border rounded-lg px-4 py-2"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Add User
//           </button>
//         </div>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {users.map((user) => (
//           <UserCard
//             key={user.id}
//             user={user}
//             editingUser={editingUser}
//             onEdit={setEditingUser}
//             onDelete={handleDeleteUser}
//             onUpdate={handleUpdateUser}
//             onCancelEdit={() => setEditingUser(null)}
//             setEditingUser={setEditingUser}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
