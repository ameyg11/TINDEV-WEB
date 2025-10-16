import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  //console.log(_id);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(user._id));
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    user && (
      <div>
        <div className="card bg-gray-900 w-96 shadow-sm ">
          <figure>
            <img src={photoUrl} alt="profile image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{about}</p>
            {age && gender ? <p>{age + " " + gender}</p> : ""}
            <div className="card-actions justify-center">
              <button
                onClick={() => handleSendRequest("ignored", _id)}
                className="btn btn-outline btn-error"
              >
                Ignore
              </button>
              <button
                onClick={() => handleSendRequest("interested", _id)}
                className="btn btn-outline btn-info"
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
