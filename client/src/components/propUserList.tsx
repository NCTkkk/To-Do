// import type { User } from "../types/User";

// interface UserCardProps {
//   user: User;
//   editingUser: User | null;
//   onEdit: (user: User) => void;
//   onDelete: (id: string) => void;
//   onUpdate: (id: string, userData: Partial<User>) => void;
//   onCancelEdit: () => void;
//   setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// export const UserCard = ({
//   user,
//   editingUser,
//   onEdit,
//   onDelete,
//   onUpdate,
//   onCancelEdit,
//   setEditingUser,
// }: UserCardProps) => {
//   return (
//     <div key={user.id} className="border rounded-lg p-4 bg-white shadow-sm">
//       {editingUser?.id === user.id ? (
//         <div className="space-y-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               value={editingUser.name}
//               onChange={(e) =>
//                 setEditingUser({ ...editingUser, name: e.target.value })
//               }
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={editingUser.password}
//               onChange={(e) =>
//                 setEditingUser({ ...editingUser, password: e.target.value })
//               }
//               className="w-full border rounded-lg px-2 py-1"
//             />
//           </div>
//           <div className="flex gap-2 pt-2">
//             <button
//               onClick={() => onUpdate(user.id, editingUser)}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Save
//             </button>
//             <button
//               onClick={onCancelEdit}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-between items-start mb-3">
//             <div>
//               <h3 className="font-bold text-lg">{user.name}</h3>
//               <p className="text-gray-600">{user.password}</p>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => onEdit(user)}
//                 className="text-blue-500 hover:text-blue-700"
//                 title="Edit User"
//               >
//                 <i className="fas fa-edit"></i>
//               </button>
//               <button
//                 onClick={() => onDelete(user.id)}
//                 className="text-red-500 hover:text-red-700"
//                 title="Delete User"
//               >
//                 <i className="fas fa-trash"></i>
//               </button>
//             </div>
//           </div>
//           <div className="border-t pt-3">
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div className="bg-gray-50 p-2 rounded">
//                 <p className="text-gray-600">Tasks assigned</p>
//                 <p className="font-semibold">{user.tasks?.length || 0}</p>
//               </div>
//               <div className="bg-gray-50 p-2 rounded">
//                 <p className="text-gray-600">Completed</p>
//                 <p className="font-semibold">
//                   {user.tasks?.filter((t) => t.completed).length || 0}
//                 </p>
//               </div>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               Created: {new Date(user.createdAt!).toLocaleDateString()}
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
