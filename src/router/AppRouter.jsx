import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { SignUp } from "../components/auth/SignUp";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AllUsersList } from "../components/admin/AllUsersList";
import { DashBoard } from "../components/user/DashBoard";
import { ArenaList } from "../components/user/ArenaList";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/admin",
    element: <AdminSidebar />,
    children: [{ path: "allusers", element: <AllUsersList /> }],
  },
  {
    path: "/user",
    element: <UserNavbar />,
    children: [
      { path: "dashboard", element: <DashBoard /> },
      { path: "arenalist", element: <ArenaList /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
