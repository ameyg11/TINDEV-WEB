import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TinderCard from "react-tinder-card";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Link2Icon } from "lucide-react";

const Feed = () => {
  const feedFromRedux = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [limitReached, setLimitReached] = useState(false); // ⬅ NEW

  useEffect(() => {
    const getFeed = async () => {
      if (!feedFromRedux || feedFromRedux.length === 0) {
        try {
          const res = await axios.get(BASE_URL + "/feed", {
            withCredentials: true,
          });
          dispatch(addFeed(res.data));
          setUsers(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        setUsers(feedFromRedux);
      }
    };
    getFeed();
  }, [feedFromRedux, dispatch]);

  const handleSendRequest = async (status, _id) => {
    if (limitReached) return; // ⬅ PREVENT SWIPE IF LIMIT REACHED

    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      // If backend says limit reached — stop swiping
      if (res.data?.isLimitReached) {
        setLimitReached(true);
        return;
      }

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      // When backend LIMIT is hit, error 400 comes here
      if (err.response?.data?.isLimitReached) {
        setLimitReached(true);
      }
      console.log(err);
    }
  };

  const swiped = (direction, userId) => {
    if (limitReached) return; // ⬅ block swipe actions entirely

    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else if (direction === "left") {
      handleSendRequest("ignored", userId);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      {/* Tinder Cards Container */}
      <div className="relative w-80 h-[28rem] md:w-96 mt-20">
        {!limitReached ? (
          users.length > 0 ? (
            users.map((user) => (
              <TinderCard
                className="absolute"
                key={user._id}
                preventSwipe={["up", "down"]}
                swipeRequirementType="position"
                flickOnSwipe={true}
                onSwipe={(dir) => swiped(dir, user._id)}
              >
                <UserCard
                  user={user}
                  onAction={(status) => handleSendRequest(status, user._id)}
                />
              </TinderCard>
            ))
          ) : (
            <p className="text-center text-2xl font-semibold text-neutral-400">
              No more profiles to show.
            </p>
          )
        ) : (
          // 🔥 LIMIT REACHED UI
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-xl bg-neutral-900/70 backdrop-blur-md shadow-lg border border-neutral-700">
            <FaInfoCircle className="text-red-400 text-4xl mb-4" />

            <h2 className="text-xl font-semibold text-white mb-2">
              Daily Swipe Limit Reached
            </h2>

            <p className="text-sm text-neutral-400 text-center mb-4">
              You’ve used all your swipes for today. New swipes will unlock
              after midnight.
            </p>
            <Link to="/premium">
              <button
                className="px-4 py-2 text-sm bg-red-500/90 hover:bg-red-600
                       text-white rounded-lg shadow transition-all flex p-2"
              >
                <Link2Icon className="mr-2"/> Come Back Tomorrow
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* 🔥 Instruction Section */}
      {!limitReached && (
        <div className="mt-8 mb-4 flex items-center gap-2 text-neutral-400">
          <FaInfoCircle className="text-sm opacity-80" />

          {/* Mobile */}
          <p className="text-xs block md:hidden">Swipe left or right</p>

          {/* Desktop */}
          <p className="text-xs hidden md:block">
            Prefer using the buttons below
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
