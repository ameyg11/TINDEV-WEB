import React from "react";

const UserCard = ({user}) => {

  const { firstName, lastName, photoUrl, age, gender, about} = user;

  console.log(user)
  // console.log(user.photoUrl)
  return (
    user && (
    <div>
      <div className="card bg-gray-900 w-96 shadow-sm ">
        <figure>
          <img
            src={photoUrl}
            alt="profile image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {age && gender ? <p>{age + " " +gender}</p> : ""}
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default UserCard;
