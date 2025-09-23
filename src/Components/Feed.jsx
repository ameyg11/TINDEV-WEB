import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      console.log("Fetched data:", res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
  <div className="flex flex-wrap justify-center gap-6 mt-10">
    {feed && feed.length > 0 ? (
      <UserCard user={feed[0]} />
    ) : (
      <p>Loading...</p>
    )}
  </div>
);

};

export default Feed;
