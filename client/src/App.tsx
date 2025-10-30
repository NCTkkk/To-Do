// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
// import { Home } from "./pages/Home";
// import  Login  from "./pages/Login";
// import { Register } from "./pages/Register";
// import { Profile } from "./pages/Profile";

// import { AdminDashboard } from "./pages/admin/AdminDashboard";
// import { UserDashboard } from "./pages/user/UserDashboard";
// import { MemberDashboard } from "./pages/member/MemberDashboard";

// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// function AppRoutes() {
//   const { user } = useAuth(); // 👈 cần để kiểm tra role hiện tại
//   console.log("rendering route for", user?.role);

//   return (
//     <Routes>
//       {/* public routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/profile" element={<Profile />} />

//       {/* protected routes */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute
//             element={<AdminDashboard />}
//             allowedRoles={["admin"]}
//           />
//         }
//       />
//       <Route
//         path="/user"
//         element={
//           <ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />
//         }
//       />
//       <Route
//         path="/member"
//         element={
//           <ProtectedRoute
//             element={<MemberDashboard />}
//             allowedRoles={["member"]}
//           />
//         }
//       />

//       {/* fallback */}
//       <Route
//         path="*"
//         element={
//           user ? (
//             <Navigate to={`/${user.role}`} replace />
//           ) : (
//             <Navigate to="/" replace />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <AppRoutes />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import { UserDashboard } from "./pages/user/UserDashboard";
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Trang login */}
          <Route path="/login" element={<Login />} />

          {/* Chỉ vào được nếu đã login */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Mặc định vào login nếu chưa login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
