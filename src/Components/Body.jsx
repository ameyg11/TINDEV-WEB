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
    <div className="bg-black min-h-screen text-white">
      {/* Sidebar is now a self-positioning component */}
      <Sidebar />

      {/* Main Content Wrapper */}
      {/* On desktop (md), we add margin-left to make space for the sidebar. */}
      {/* On mobile, this div has no margin, and content flows naturally. */}
      <div className="md:ml-[244px]">
        <div className="flex justify-center">
          
          {/* Main Content Area (Feed, Profile, etc.) */}
          {/* We add padding-bottom on mobile (pb-20) to prevent the bottom nav from hiding content. */}
          <main className="flex-1 max-w-2xl mx-auto py-6 px-4 pb-20 md:pb-6">
            <Outlet /> {/* This renders Feed, Profile, etc. */}
          </main>

          {/* Suggestions Column */}
          {/* This remains hidden on small/medium screens and appears on large screens. */}
          <aside className="w-[380px] border-l border-neutral-800 p-6 hidden lg:block">
            <Suggestions />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Body;