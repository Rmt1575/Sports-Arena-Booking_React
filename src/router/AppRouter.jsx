// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Login } from "../components/auth/Login";
// import { SignUp } from "../components/auth/SignUp";
// import { UserNavbar } from "../components/user/UserNavbar";
// import { AdminSidebar } from "../components/admin/AdminSidebar";
// import { AllUsersList } from "../components/admin/AllUsersList";
// import { DashBoard } from "../components/user/DashBoard";
// import { ArenaList } from "../components/user/ArenaList";
// import { UseEffectDemo } from "../components/user/UseEffectDemo";
// import { GetApiDemo } from "../components/user/GetApiDemo";

// const router = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/signup", element: <SignUp /> },
//   {
//     path: "/admin",
//     element: <AdminSidebar />,
//     children: [{ path: "allusers", element: <AllUsersList /> }],
//   },
//   {
//     path: "/user",
//     element: <UserNavbar />,
//     children: [
//       { path: "dashboard", element: <DashBoard /> },
//       { path: "arenalist", element: <ArenaList /> },
//       { path: "useeffectdemo", element: <UseEffectDemo /> },
//       { path: "getapidemo", element: <GetApiDemo /> },
//     ],
//   },
// ]);

// const AppRouter = () => {
//   return <RouterProvider router={router} />;
// };

// export default AppRouter;

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { ROLES, roleDashboardPath } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

// ---------------------
// TEMP PAGES (replace later)
// ---------------------
const AdminDashboard = () => <h1 className="p-6">Admin Dashboard</h1>;
const ManagerDashboard = () => <h1 className="p-6">Arena Manager Dashboard</h1>;
const CoachDashboard = () => <h1 className="p-6">Coach Dashboard</h1>;
const PlayerDashboard = () => <h1 className="p-6">Player Dashboard</h1>;

// ---------------------
// Redirect component for "/"
// ---------------------
const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={roleDashboardPath(user.role)} replace />;
};

// ---------------------
// Wrappers for layout-like routing using children
// (Outlet will render children routes)
// ---------------------
const AdminRoot = () => (
  <ProtectedRoute>
    <RoleRoute allow={[ROLES.ADMIN]}>
      <Outlet />
    </RoleRoute>
  </ProtectedRoute>
);

const ManagerRoot = () => (
  <ProtectedRoute>
    <RoleRoute allow={[ROLES.MANAGER]}>
      <Outlet />
    </RoleRoute>
  </ProtectedRoute>
);

const CoachRoot = () => (
  <ProtectedRoute>
    <RoleRoute allow={[ROLES.COACH]}>
      <Outlet />
    </RoleRoute>
  </ProtectedRoute>
);

const PlayerRoot = () => (
  <ProtectedRoute>
    <RoleRoute allow={[ROLES.PLAYER]}>
      <Outlet />
    </RoleRoute>
  </ProtectedRoute>
);

// ---------------------
// Router definition
// ---------------------
const router = createBrowserRouter([
  { path: "/", element: <HomeRedirect /> },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  {
    path: "/admin",
    element: <AdminRoot />,
    children: [{ path: "dashboard", element: <AdminDashboard /> }],
  },

  {
    path: "/manager",
    element: <ManagerRoot />,
    children: [{ path: "dashboard", element: <ManagerDashboard /> }],
  },

  {
    path: "/coach",
    element: <CoachRoot />,
    children: [{ path: "dashboard", element: <CoachDashboard /> }],
  },

  {
    path: "/player",
    element: <PlayerRoot />,
    children: [{ path: "dashboard", element: <PlayerDashboard /> }],
  },

  // fallback
  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
