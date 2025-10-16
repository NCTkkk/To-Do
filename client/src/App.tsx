import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { TaskList } from "./components/taskList";
import { TaskAssignment } from "./components/taskAssignment";
import { Home } from "./components/home";
import { MemberList } from "./components/memberList";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, login, logout } = useAuth();
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <nav className="bg-white shadow-lg mb-6">
          <div className="max-w-6xl mx-auto px-4 ">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="text-2xl font-bold">ToDo App</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link
                    to="/"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Home
                  </Link>
                  {/* <Link
                    to="/tasks"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Tasks
                  </Link>
                  <Link
                    to="/members"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Members
                  </Link>
                  <Link
                    to="/assign"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Assign Tasks
                  </Link> */}
                  {user?.role === "user" && (
                    <>
                      <Link
                        to="/tasks"
                        className="py-4 px-2 hover:text-blue-500"
                      >
                        Tasks
                      </Link>
                      <Link
                        to="/members"
                        className="py-4 px-2 hover:text-blue-500"
                      >
                        Members
                      </Link>
                      <Link
                        to="/assign"
                        className="py-4 px-2 hover:text-blue-500"
                      >
                        Assign Tasks
                      </Link>
                    </>
                  )}

                  {/* member: chỉ thấy task + profile */}
                  {user?.role === "member" && (
                    <>
                      <Link
                        to="/tasks"
                        className="py-4 px-2 hover:text-blue-500"
                      >
                        My Tasks
                      </Link>
                      <Link
                        to="/members"
                        className="py-4 px-2 hover:text-blue-500"
                      >
                        My Profile
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <div>
                {!user ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => login("user")} // đăng nhập tạm role user
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Login as User
                    </button>

                    <button
                      onClick={() => login("member")} // đăng nhập tạm role member
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Login as Member
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Logout ({user.role})
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/tasks" element={<TaskList />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/assign" element={<TaskAssignment />} /> */}
            {user ? (
              <>
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/assign" element={<TaskAssignment />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
