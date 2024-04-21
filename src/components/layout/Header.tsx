import React from "react";
import { useCurrentUser } from "context/userContext";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser, logOutUser } = useCurrentUser();
  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap py-5 items-center justify-between px-2">
        <Link to="/">
          <p className="flex title-font font-medium items-center text-gray-900">
            <span className="text-xl font-bold">Task</span>
          </p>
        </Link>

        <div className="">
          {currentUser?.token ? (
            <div className="flex gap-4">
              <Link to="/products">
                <p className="flex title-font font-medium items-center text-gray-900">
                  <span className="text-xl font-bold">Products</span>
                </p>
              </Link>
              <button
                className="text-red-500"
                title="Logout"
                onClick={() => logOutUser()}
              >
                <BiLogOutCircle className="text-3xl" />
              </button>
            </div>
          ) : (
            <div>
              <Link to="/auth">
                <p className="flex title-font font-medium items-center text-gray-900">
                  <span className="text-xl font-bold">Auth</span>
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
