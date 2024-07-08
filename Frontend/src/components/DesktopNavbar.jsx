/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Context} from "../main.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function DesktopNav({ menuItems, logo }) {
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
    <div className={`absolute top-0 w-full z-50 ${isHomePage || isAboutPage || isContactPage ? 'bg-transparent' : 'bg-transparent'}`}>
      <div className="h-20 flex justify-between items-center px-6 lg:px-12">
        <a href="/">
          <img className="h-16 w-16" src={logo} alt="logo" />
        </a>
        <ul className="flex gap-7">
          {menuItems?.map((menu, index) => (
            <li key={index}>
              <Link to={menu} className="font-medium capitalize text-primary cursor-pointer">
                {menu}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          <li>
            {isAuthenticated ? (
              <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="bg-primary text-white px-4 py-2 rounded-lg" onClick={gotoLogin}>
                Login
              </button>
            )}
          </li>
          <li>
            <Link to="register">
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DesktopNav;
