import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "routes";
import Header from "./Header";
import PrivateRoute from "components/common/PrivateRoute";

type RouteObject = {
  path: string;
  element: React.ReactNode;
  id: string;
};

const Layout = () => {
  const renderRoutes = (routes: RouteObject[]) => {
    return routes.map((r: RouteObject) => (
      <Route path={r.path} element={r.element} key={r.id} />
    ));
  };
  return (
    <div>
      <Header />
      <div className="min-h-screen container mx-auto mt-4">
        <Routes>
          <Route element={<PrivateRoute />}>
            {renderRoutes(privateRoutes)}
          </Route>
          <Route>{renderRoutes(publicRoutes)}</Route>
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
