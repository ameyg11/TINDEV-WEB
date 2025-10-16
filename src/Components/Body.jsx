// src/Components/Body.jsx

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Sidebar from "./Sidebar";
import Suggestions from "./Suggestions";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // This user fetching logic remains the same
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
        console.error(err);
      }
    };

    if (!userData) {
      fetchUser();
    }
  }, [userData, dispatch, navigate]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Column 1: Sidebar (Fixed Width) */}
      <div className="w-[244px] border-r border-neutral-800 p-4 hidden md:block">
        <Sidebar />
      </div>

      {/* Column 2: Main Content (Flexible Width) */}
      <main className="flex-1 max-w-2xl mx-auto py-6 px-4">
        <Outlet /> {/* This renders Feed, Profile, etc. */}
      </main>

      {/* Column 3: Suggestions (Fixed Width, hidden on smaller screens) */}
      <div className="w-[380px] border-l border-neutral-800 p-6 hidden lg:block">
        <Suggestions />
      </div>
    </div>
  );
};

export default Body;