/* eslint-disable react/prop-types */
import { useContext } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../main.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function MobileNav({ menuItems, logo, onClose, hideLeft, onOpen }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isContactPage = location.pathname === "/contact";

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/v1/user/client/logout", { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  const gotoLogin = () => {
    navigateTo("/login");
  };

  return (
    <div className="absolute top-0 mt-4 w-full z-20">
      <div className={`h-20 ${isHomePage || isAboutPage || isContactPage ? 'bg-transparent' : 'bg-transparent'} flex justify-between items-center px-6 lg:px-12`}>
        <a href="/">
          <img className="h-20 w-20" src={logo} alt="Logo" />
        </a>
        <button onClick={onOpen}>
          <HiBars3BottomRight className="w-7 h-7 text-primary" />
        </button>
      </div>

      <div className={`transition-all w-full h-full fixed bg-background z-50 top-0 ${hideLeft} flex justify-center items-center`}>
        <button onClick={onClose} className="absolute right-8 top-10">
          <IoClose className="w-7 h-7 text-primary" />
        </button>
        <div className="mr-auto">
          <img className="h-20 w-20 relative bottom-28 mt-16 ml-4" src={logo} alt="Logo" />
          <ul className="flex flex-col gap-4 ml-4">
            {menuItems.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu}
                  className="font-medium capitalize text-primary text-xl"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 my-8 ml-4">
            {isAuthenticated ? (
              <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={gotoLogin}>
                Login
              </button>
            )}
            <Link to="register">
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
