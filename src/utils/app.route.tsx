
import SignIn from "@/pages/Authentication/SignIn";
import SignUp from "@/pages/Authentication/SignUp";
import CategoryList from "@/pages/Category";
import Dashboard from "@/pages/Dashboard";
import Expenses from "@/pages/Expenses";

import NotFound from "@/pages/NotFound";
import SingleUserDetails from "@/pages/Users/SingleUserDetails";


export const publicRoutes = [
  { path: "/auth/login", element: <SignIn /> },
  { path: "/auth/register", element: <SignUp /> },
  { path: "*", element: <NotFound /> },

];

export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/expense/list", element: <Expenses /> },
  { path: "/user/profile", element: <SingleUserDetails /> },
  { path: "/admin/category/list", element: <CategoryList /> },

];