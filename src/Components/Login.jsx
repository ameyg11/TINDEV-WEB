import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaLock, FaEnvelope, FaUser } from "react-icons/fa";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ isLoginForm, setIsLoginForm ] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        // console.log(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        // console.log(err);
      }
    }
  };

  const handleSignupClick = async() => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900 text-neutral-content p-4">
      <div className="card w-full max-w-sm bg-neutral-800 shadow-2xl rounded-2xl">
        <div className="card-body p-8">
          <div className="flex justify-center mb-8">
            <div className="avatar">
              <div className="bg-primary text-primary-content rounded-full w-20 h-20 flex items-center justify-center">
                <FaLock className="text-4xl m-5 " />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="card-title text-4xl font-extrabold mb-2">
              Welcome!
            </h2>
            <p className="text-neutral-400">{isLoginForm ? "Login in to your account.": "SignUp for finding your new team members!"}</p>
          </div>

          {!isLoginForm && <><div className="form-control mb-4">
            <label className="input input-bordered flex items-center gap-3 bg-neutral-700 border-neutral-600 focus-within:border-primary">
              <FaUser className="text-neutral-500" />
              <input
                type="text"
                placeholder="First Name"
                className="grow"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mb-4">
            <label className="input input-bordered flex items-center gap-3 bg-neutral-700 border-neutral-600 focus-within:border-primary">
              <FaUser className="text-neutral-500" />
              <input
                type="text"
                placeholder="Last Name"
                className="grow"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div></>}

          <div className="form-control mb-4">
            <label className="input input-bordered flex items-center gap-3 bg-neutral-700 border-neutral-600 focus-within:border-primary">
              <FaEnvelope className="text-neutral-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="grow"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mb-6">
            <label className="input input-bordered flex items-center gap-3 bg-neutral-700 border-neutral-600 focus-within:border-primary">
              <FaLock className="text-neutral-500" />
              <input
                type="password"
                placeholder="Password"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {error && (
            <div className="alert alert-error my-4">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <button
              className="btn btn-primary btn-block text-lg font-bold py-3 transition-transform transform hover:scale-105"
              onClick={isLoginForm ? handleLoginClick: handleSignupClick}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="text-indigo-200 flex justify-center cursor-pointer mt-2 pt-2 "  onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "Create an account" : "Already have an account: Login!"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
