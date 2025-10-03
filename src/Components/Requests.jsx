import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();


    const fetchRequests = async() => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true});
            dispatch(addRequests(res.data.data));
        }catch(err){

        }
    }

    const reviewRequests = async(status, _id) =>{
        try{
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        }catch(err){

        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

  if (!requests) return;

  if (requests.length === 0) return <h1  className="flex justify-center text-4xl font-semibold mt-10">No Requests Found</h1>;

  return (
    <div className="justify-center my-10">
      <h1 className="justify-center flex text-bold text-2xl">Requests</h1>
      {requests.map((request) => {
        const { _id ,firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

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

                {/* 2. Name and About/Title */}
                <div className="flex-grow min-w-0">
                  <div className="font-semibold text-lg truncate">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-sm font-medium text-opacity-70 text-neutral-content">
                    {about}
                  </div>
                </div>

                {/* 3. Action Buttons*/}
                <div>
                    <button onClick={() => reviewRequests("accepted", request._id)} className="btn btn-outline btn-info m-2">Accept</button>
                    <button onClick={() => reviewRequests("rejected", request._id)} className="btn btn-outline btn-error">Reject</button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Requests