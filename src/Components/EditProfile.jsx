import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";

const EditProfile = ({ user }) => {
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || 25);
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(
    user.photoUrl ||
      "https://i.pinimg.com/736x/21/f6/fc/21f6fc4abd29ba736e36e540a787e7da.jpg"
  );
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills)
      ? user.skills.join(", ")
      : user.skills || "React, Node.js, Express, MongoDB"
  );

  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const updatedProfile = {
        // Use the local state variables here
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        photoUrl: photoUrl,
        about: about,
        skills: skills.split(",").map((s) => s.trim()),
      };

      Object.keys(updatedProfile).forEach(
        (key) => updatedProfile[key] === undefined && delete updatedProfile[key]
      );

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        updatedProfile,
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(res.data));

      if (res.status === 200) {
        setIsSaved(true);
        setError(""); // clear old errors
        setTimeout(() => {
          setIsSaved(false); 
        }, 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update profile. Please try again."
      );
      setIsSaved(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-neutral-900 text-neutral-content p-4 font-sans">
      <div className="w-full max-w-4xl p-8">
        {/* Avatar and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="avatar">
            <div className="bg-primary text-primary-content rounded-full w-20 h-20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="text-4xl w-10 h-10 fill-current"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.4 304 0 383.4 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.4 368.6 304 269.7 304H178.3z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">Edit Profile</h1>
        <p className="text-center text-neutral-400 mb-8">
          Update your public profile details and save your changes.
        </p>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">First Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Last Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Age</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral-300">Gender</span>
            </label>
            <select
              className="select select-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Email (disabled)
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">
                Email (Cannot be changed)
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 opacity-50 cursor-not-allowed"
              value={user.emailId || emailId}
              disabled
            />
          </div> */}

          {/* Photo URL */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">Photo URL</span>
            </label>
            <input
              type="url"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* About */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">About</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              maxLength={99}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <p className="text-xs text-neutral-400 text-right mt-1">
              {about.length} / 99
            </p>
          </div>

          {/* Skills */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-neutral-300">
                Skills (comma-separated)
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-neutral-700 border-neutral-600 focus:border-primary"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error my-4 rounded-lg shadow-md">
            <span>{error}</span>
          </div>
        )}

        {/* Save Button */}
        <div className="form-control mt-8">
          <button
            className="btn btn-primary btn-block text-lg font-bold py-3 transition-transform transform hover:scale-105"
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        {/* Success Message */}
        {isSaved && (
          <div className="alert alert-success my-4 rounded-lg shadow-md">
            <span>Profile updated successfully!</span>
          </div>
        )}
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }}
      />
    </div>
  );
};

export default EditProfile;
