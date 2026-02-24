import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const linkClass = "px-4 py-2 rounded-lg transition duration-200";

  const activeClass = "bg-blue-600 text-white";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* TOP NAVBAR */}
      <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Arena Booking</h1>

        <div className="flex items-center gap-4">
          <NavLink
            to="/user/home"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/user/arenas"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
            }
          >
            Arenas
          </NavLink>

          <NavLink
            to="/user/bookings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
            }
          >
            My Bookings
          </NavLink>

          <NavLink
            to="/user/getapidemo"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
            }
          >
            Get API
          </NavLink>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
