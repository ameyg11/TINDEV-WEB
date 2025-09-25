import React from 'react'
import EditProfile from './editProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  console.log("this is user from profile", user);
  return (
    <div>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile

