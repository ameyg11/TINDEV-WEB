import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center text-4xl font-semibold mt-10">
        No Connections Found
      </h1>
    );

  return (
    <div className="justify-center my-10">
      <h1 className="justify-center flex text-bold text-2xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
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
                  <Link to={"/chat/"+_id}>
                    <button className="btn text-lg btn-square btn-ghost btn-sm text-primary hover:bg-base-300">
                      Chat
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
