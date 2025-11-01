// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import type { JSX } from "react";

// interface Props {
//   element: JSX.Element;
//   allowedRoles: ("admin" | "user" | "member")[];
// }

// export const ProtectedRoute = ({ element, allowedRoles }: Props) => {
//   const { user } = useAuth();

//   // chưa đăng nhập
//   if (!user) return <Navigate to="/login" replace />;

//   // nếu role không hợp lệ
//   if (!allowedRoles.includes(user.role)) {
//     // chuyển hướng đúng theo role hiện tại
//     const redirectPath =
//       user.role === "admin"
//         ? "/admin"
//         : user.role === "user"
//         ? "/user"
//         : "/member";

//     return <Navigate to={redirectPath} replace />;
//   }
//   console.log("user", user);

//   // hợp lệ thì render
//   return element;
// };
