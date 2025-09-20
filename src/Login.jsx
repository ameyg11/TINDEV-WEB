import axios from "axios";
import React, { useState } from "react";

const Login = () => {

  const [ emailId, setEmailId ]= useState("naruto@gmail.com");
  const [ password, setPassword]= useState("Ameygawade@11");

  const handleLoginClick = async () => {
    try{
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password
      },
      { withCredentials: true, }
    )
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input type="text" className="input" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLoginClick}>Login </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
