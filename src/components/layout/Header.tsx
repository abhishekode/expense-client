import React from "react";
import { useCurrentUser } from "context/userContext";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UserRole } from "Interfaces/common";


const Header = () => {
  const { currentUser, logOutUser } = useCurrentUser();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
  ];

  if (currentUser) {
    if (currentUser.role === UserRole.User) {
      navLinks.push({ id: 6, name: "Student", path: "/student" });
    } else if (currentUser.role === UserRole.Admin) {
      navLinks.push({ id: 4, name: "Admin", path: "/admin" });
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  return (
    <div
      className={`${
        isScrolled
          ? "bg-gray-800 shadow-md fixed w-screen top-0 text-gray-100"
          : "bg-white text-gray-800 sticky top-0"
      } z-50 shadow`}
    >
      <div className="max-w-7xl lg:mx-auto mx-2">
        <div className="py-5 px-2 flex justify-between items-center w-full rounded-md">
          <div className="cursor-pointer">
            <Link to="/" className="text-lg font-bold">
              Logo
            </Link>
          </div>

          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-950 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen
                ? "fixed inset-0 z-50 bg-gray-800 text-white flex flex-col px-10 gap-4 pt-10"
                : "hidden"
            } lg:flex lg:space-x-4`}
          >
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden absolute top-4 right-4 text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className=" flex gap-4 lg:flex-row flex-col items-start">
              {navLinks.map((link) => (
                <Link key={link.id} to={link.path} className="">
                  {link.name}
                </Link>
              ))}
              {currentUser ? (
                <button
                  className="text-white bg-red-500"
                  onClick={()=> logOutUser()}
                >
                  <BiLogOutCircle className="text-2xl" />
                </button>
              ) : (
                <Link to="/auth" className="">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
