// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserDashboard } from "./pages/user/UserDashboard";
import { MemberDashboard } from "./pages/member/MemberDashboard";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useAuth(); // 👈 cần để kiểm tra role hiện tại
  console.log("rendering route for", user?.role);

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* protected routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            element={<AdminDashboard />}
            allowedRoles={["admin"]}
          />
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute element={<UserDashboard />} allowedRoles={["user"]} />
        }
      />
      <Route
        path="/member"
        element={
          <ProtectedRoute
            element={<MemberDashboard />}
            allowedRoles={["member"]}
          />
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to={`/${user.role}`} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
// import { AuthProvider } from "./context/AuthContext";
// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import { Home } from "./pages/Home";

// const AdminDashboard = () => <h1>Admin Dashboard</h1>;
// const UserDashboard = () => <h1>User Task Page</h1>;
// const MemberDashboard = () => <h1>Member Task Page</h1>;

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="container mx-auto p-4">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/users"
//               element={
//                 <ProtectedRoute roles={["admin"]}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tasks"
//               element={
//                 <ProtectedRoute roles={["user"]}>
//                   <UserDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/my-tasks"
//               element={
//                 <ProtectedRoute roles={["member"]}>
//                   <MemberDashboard />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
// import { Home } from "./pages/Home";
// import { Login } from "./pages/Login";
// import { Register } from "./pages/Register";
// import { Profile } from "./pages/Profile";

// import { AdminDashboard } from "./pages/AdminDashboard";
// import { UserDashboard } from "./pages/UserDashboard";
// import { MemberDashboard } from "./pages/MemberDashboard";
// import { ProtectedRoute } from "./routes/ProtectedRoute";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* public routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/profile" element={<Profile />} />

//       {/* protected routes by role */}
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
//       {/* catch all */}
//       <Route path="*" element={<Navigate to="/" replace />} />
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
