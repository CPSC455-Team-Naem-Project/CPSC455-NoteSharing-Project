import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { useAppSelector } from "../app/hooks";


const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null)
  const [photoURL, setPhotoURL] = useState(require("../media/defaultProfileImage.jpg"));

  useEffect(() => {
      return  auth.onAuthStateChanged(user => {
          setUser(user)
          if (!user) {
              console.log('user not found')
          } else {
              console.log('user found', user)
              setUser(user)
          }
      })
  }, [auth])

  function handleClick() {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }

  return (
    <div className="profile-container">
      <button className="profile-image-button" title="Change profile picture">
        <img src={photoURL} alt="Change profile picture" className="profile-picture" onClick={handleClick}/>
      </button>
      <div className="name">{user?.displayName}</div>
    </div>
  );
}

export default Profile;