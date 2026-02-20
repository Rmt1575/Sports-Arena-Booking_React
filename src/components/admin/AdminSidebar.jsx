import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear token / localStorage here if needed
    navigate("/login");
  };

  const linkClass = "block px-4 py-2 rounded-lg transition duration-200";

  const activeClass = "bg-blue-600 text-white";

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

          <nav className="space-y-3">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
              }
            >
              User List
            </NavLink>

            <NavLink
              to="/admin/arena"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
              }
            >
              Arena Management
            </NavLink>

            <NavLink
              to="/admin/add"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
              }
            >
              Add Arena
            </NavLink>

            <NavLink
              to="/admin/block"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
              }
            >
              Block Users
            </NavLink>
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
