import UserNoteService from "../services/UserNote.service";
import React, {useEffect} from "react";
import ProfileTabBar from './ProfileTabBar';

const Profile = () => {
  const userCredentials = UserNoteService.getUserCredentials();

  useEffect(() => {
  }, [])

  return (
    <div className="profile">
      <div className="name">{userCredentials.userDisplayName}</div>
      <div className="profile-tab-bar">
        <ProfileTabBar/>
      </div>
    </div>
  );
}

export default Profile;
