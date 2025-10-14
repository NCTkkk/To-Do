import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { TaskList } from "./components/TaskList";
import { UserList } from "./components/userList";
import { TaskAssignment } from "./components/taskAssignment";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        {/* Navigation */}
        <nav className="bg-white shadow-lg mb-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="text-2xl font-bold">ToDo App</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Link
                    to="/tasks"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Tasks
                  </Link>
                  <Link
                    to="/users"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Users
                  </Link>
                  <Link
                    to="/assign"
                    className="py-4 px-2 hover:text-blue-500 transition duration-300"
                  >
                    Assign Tasks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/assign" element={<TaskAssignment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
