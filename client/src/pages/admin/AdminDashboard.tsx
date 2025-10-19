import { useState } from "react";
import { AdminUsers } from "./AdminUsers";
import { AdminMembers } from "./AdminMembers";
import { AdminProfile } from "./AdminProfile";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"users" | "members" | "profile">(
    "users"
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Quản lý Users
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "members"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("members")}
        >
          Quản lý Members
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "profile"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Hồ sơ Admin
        </button>
      </div>

      {/* Content */}
      <div className="border rounded-lg shadow p-6 bg-white">
        {activeTab === "users" && <AdminUsers />}
        {activeTab === "members" && <AdminMembers />}
        {activeTab === "profile" && <AdminProfile />}
      </div>
    </div>
  );
};
