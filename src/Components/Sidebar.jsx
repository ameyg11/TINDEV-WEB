// src/Components/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { FaUserFriends, FaRegBell, FaRegCommentDots, FaCrown } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const dropdownRef = useRef(null);
  const messageRef = useRef(null);

  const onLogoutClick = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(addUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (dropdownRef.current && dropdownRef.current.contains(e.target)) ||
        (messageRef.current && messageRef.current.contains(e.target))
      )
        return;
      setShowDropdown(false);
      setShowMessagePopup(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { to: "/", icon: <IoHomeOutline size={24} />, text: "Home" },
    { to: "/requests", icon: <FaRegBell size={24} />, text: "Requests" },
    { to: "/connections", icon: <FaUserFriends size={24} />, text: "Connections" },
    { to: "/premium", icon: <FaCrown size={24} />, text: "Premium" },
  ];

  return (
    <>
      {/* ✅ MOBILE HEADER */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 bg-black border-b border-neutral-800 z-50 md:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="TinDev Logo" className="h-6 w-6" />
          <span className="text-base font-semibold text-white">TinDev</span>
        </div>

        <div className="relative" ref={messageRef}>
          <button
            onClick={() => setShowMessagePopup(!showMessagePopup)}
            className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
          >
            <FaRegCommentDots size={22} />
          </button>
          {showMessagePopup && (
            <div className="absolute right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg px-4 py-2 text-sm text-gray-300">
              💬 Messages — Coming soon
            </div>
          )}
        </div>
      </div>

      {/* ✅ MAIN SIDEBAR */}
      <div
        className="
        fixed bottom-0 left-0 w-full h-16 bg-black border-t border-neutral-800 z-40 flex items-center
        md:top-0 md:left-0 md:h-screen md:w-[244px] md:flex-col md:items-stretch md:border-t-0 md:border-r md:p-4
      "
      >
        {/* Desktop Logo */}
        <div className="mb-10 hidden md:block">
          <Link to="/" className="flex items-center font-bold text-xl">
            <img src="/logo.png" alt="TinDev Logo" className="h- w-8 pt-0.5 mr-2" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#EC4899] text-transparent bg-clip-text">
              TinDev
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow w-full">
          <ul className="flex flex-row justify-around items-center h-full md:flex-col md:justify-start md:items-stretch md:gap-2 text-lg">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center justify-center p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200 md:justify-start md:gap-4"
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.text}</span>
                </Link>
              </li>
            ))}

            {/* 💬 Messages */}
            <li className="relative hidden md:block" ref={messageRef}>
              <button
                onClick={() => setShowMessagePopup(!showMessagePopup)}
                className="flex items-center justify-center p-3 rounded-lg hover:bg-neutral-800 transition duration-200 md:justify-start md:gap-4"
              >
                <FaRegCommentDots size={24} />
                <span className="hidden md:inline">Messages</span>
              </button>
              {showMessagePopup && (
                <div className="absolute left-14 top-1 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg px-3 py-1 text-sm text-gray-300">
                  💬 Coming soon
                </div>
              )}
            </li>

            {/* 👤 Profile Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center p-3 rounded-full hover:bg-neutral-800 transition duration-200 md:justify-start md:gap-4"
              >
                <img
                  src={user?.photoUrl || "/default-avatar.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border border-gray-600"
                />
                <span className="hidden md:inline">Profile</span>
              </button>

              {showDropdown && (
                <div className="absolute bottom-14 right-0 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl w-44 md:bottom-auto md:left-14 md:top-0">
                  <Link to="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 hover:bg-neutral-800">Edit Profile</Link>

                  {/* ✅ Mobile Only: Terms inside Profile Dropdown */}
                  <Link
                    to="/terms"
                    onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 hover:bg-neutral-800 text-gray-300 md:hidden"
                  >
                    Terms & Conditions
                  </Link>

                  <button onClick={onLogoutClick} className="block w-full text-left px-4 py-2 hover:bg-neutral-800 text-red-400">
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* ✅ Desktop Only: Terms at Bottom of Sidebar */}
        <div className="hidden md:block mt-auto mb-4 text-center">
          <Link
            to="/terms"
            className="text-sm text-gray-400 hover:text-gray-200 hover:underline"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
