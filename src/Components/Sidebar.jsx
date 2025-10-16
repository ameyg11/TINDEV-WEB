import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

// Import your icons
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaRegBell } from "react-icons/fa";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(addUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const navItems = [
    { to: "/", icon: <IoHomeOutline size={24} />, text: "Home" },
    { to: "/profile", icon: <CgProfile size={24} />, text: "Profile" },
    {
      to: "/connections",
      icon: <FaUserFriends size={24} />,
      text: "Connections",
    },
    { to: "/requests", icon: <FaRegBell size={24} />, text: "Requests" },
  ];

  return (
    <div
      className="
      fixed bottom-0 left-0 w-full h-16 bg-black border-t border-neutral-800 z-50 flex items-center
      md:top-0 md:left-0 md:h-screen md:w-[244px] md:flex-col md:items-stretch md:border-t-0 md:border-r md:p-4
    "
    >
      {/* ✅ Mobile Mini Header (visible only on mobile, no click blocking) */}
      <div className="absolute top-0 left-0 w-full flex justify-center items-center py-2 md:hidden pointer-events-none">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="TinDev Logo" className="h-5 w-5" />
          <span className="text-sm font-semibold text-white">TinDev</span>
        </div>
      </div>

      {/* Logo: Hidden on mobile, visible on desktop */}
      <div className="mb-10 hidden md:block">
        <Link to="/" className="flex items-center font-bold text-xl">
          <img
            src="/logo.png"
            alt="TinDev Logo"
            className="h- w-8 pt-0.5 mr-2"
          />
          <span className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-transparent bg-clip-text">
            TinDev
          </span>
        </Link>
      </div>

      {/* Navigation Links container */}
      <nav className="flex-grow w-full">
        <ul
          className="
          flex flex-row justify-around items-center h-full
          md:flex-col md:justify-start md:items-stretch md:gap-2 text-lg
        "
        >
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="
                flex items-center justify-center p-3 rounded-lg
                hover:bg-neutral-800 transition-colors duration-200
                md:justify-start md:gap-4
              "
              >
                {item.icon}
                <span className="hidden md:inline">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button: Positioned at the bottom on desktop */}
      <div className="hidden md:block md:mt-auto">
        <div
          onClick={onLogoutClick}
          className="p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200 cursor-pointer flex items-center gap-4 text-lg"
        >
          <IoLogOutOutline size={24} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
