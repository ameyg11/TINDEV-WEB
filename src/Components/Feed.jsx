// src/Components/Feed.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TinderCard from "react-tinder-card";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedFromRedux = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

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
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, userId) => {
    if (direction === "right") {
      handleSendRequest("interested", userId);
    } else if (direction === "left") {
      handleSendRequest("ignored", userId);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-80 h-[28rem] md:w-96 mt-10">
        {users && users.length > 0 ? (
          users.map((user) => (
            <TinderCard
              className="absolute"
              key={user._id}
              preventSwipe={["up", "down"]}
              swipeRequirementType="position"
              flickOnSwipe={true} // ✅ ensures proper swipe physics
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
        )}
      </div>
    </div>
  );
};

export default Feed;
