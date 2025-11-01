// import { useAuth } from "../../context/AuthContext";

// export const UserProfile = () => {
//   const { user, logout } = useAuth();

//   if (!user) return <p>Không có thông tin người dùng.</p>;

//   return (
//     <div className="max-w-md mx-auto text-center bg-white p-6 rounded-xl shadow">
//       <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
//       <div className="space-y-3">
//         <p>
//           <strong>ID:</strong> {user.id}
//         </p>
//         <p>
//           <strong>Tên:</strong> {user.name}
//         </p>
//         <p>
//           <strong>Vai trò:</strong>{" "}
//           <span
//             className={`px-2 py-1 rounded text-white ${
//               user.role === "admin"
//                 ? "bg-red-500"
//                 : user.role === "user"
//                 ? "bg-green-500"
//                 : "bg-blue-500"
//             }`}
//           >
//             {user.role}
//           </span>
//         </p>
//       </div>

//       <button
//         onClick={logout}
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//       >
//         Đăng xuất
//       </button>
//     </div>
//   );
// };
