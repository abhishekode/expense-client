import React from "react";
import Home from "../pages/Home";
import Auth from "pages/Auth";
import Admin from "pages/Admin";
import Expenses from "pages/Expenses";
import NotFound from "pages/Common/NotFound";
import Unauthorized from "pages/Common/Unauthorized";

export const publicRoutes = [
  { id: "1", path: "/auth/", element: <Auth /> },
  { id: "2", path: "*", element: <NotFound /> },
  { id: "3", path: "/unauthorized", element: <Unauthorized /> },
];

export const privateRoutes = [
  { id: "", path: "/", element: <Home /> },
  { id: "2", path: "/expense", element: <Expenses /> },
  { id: "3", path: "/admin", element: <Admin /> },
];
