import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="justify-center my-10">
      <h1 className="justify-center flex text-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { _id ,firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div key={_id} className="p-4 max-w-lg mx-auto">
            {/* The outer div provides a centered container for context */}
            <ul className="list bg-base-100 rounded-box shadow-xl divide-y divide-base-200">
              <li className="flex items-center p-4 space-x-4 hover:bg-base-200/50 transition-colors duration-150">
                {/* 1. User Photo/Avatar */}
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-base-300"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />
                </div>

                {/* 2. Name and About/Title (Flex-Grow to take up middle space) */}
                <div className="flex-grow min-w-0">
                  <div className="font-semibold text-lg truncate">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-sm font-medium text-opacity-70 text-neutral-content">
                    {about}
                  </div>
                </div>

                {/* 3. Action Buttons (Flex-Shrink-0 to keep them grouped on the right) */}
                <div className="flex space-x-1 flex-shrink-0">
                  {/* Play/Send Button */}
                  <button className="btn btn-square btn-ghost btn-sm text-primary hover:bg-base-300">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </svg>
                  </button>

                  {/* Heart/Like Button */}
                  <button className="btn btn-square btn-ghost btn-sm text-error/80 hover:bg-base-300">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </button>
                </div>
              </li>
              {/* You would repeat the <li> element for each item in your list */}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
