import React from "react";
import Home from "../pages/Home";
import Auth from "pages/Auth";

export const publicRoutes = [{ id: "1", path: "/auth/", element: <Auth /> }];

export const privateRoutes = [
  { id: "", path: "/", element: <Home /> },
  { id: "2", path: "/expense", element: <Home /> },
];
