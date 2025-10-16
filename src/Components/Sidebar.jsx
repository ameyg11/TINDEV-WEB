// src/Components/Sidebar.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

// You can install react-icons for a better look: npm install react-icons
import { CgProfile } from "react-icons/cg";
import { FaUserFriends, FaRegBell } from "react-icons/fa";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const user = useSelector((store) => store.user); //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => { //
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true }); //
      dispatch(addUser()); //
      return navigate("/login"); //
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="mb-10">
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

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="flex flex-col gap-4 text-lg">
          <li className="p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200">
            <Link to="/" className="flex items-center gap-4">
              <IoHomeOutline size={24} /> Home
            </Link>
          </li>
          <li className="p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200">
            <Link to="/profile" className="flex items-center gap-4">
              <CgProfile size={24} /> Profile
            </Link>
          </li>
          <li className="p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200">
            <Link to="/connections" className="flex items-center gap-4">
              <FaUserFriends size={24} /> Connections
            </Link>
          </li>
          <li className="p-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200">
            <Link to="/requests" className="flex items-center gap-4">
              <FaRegBell size={24} /> Requests
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button at the bottom */}
      <div className="mt-auto">
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