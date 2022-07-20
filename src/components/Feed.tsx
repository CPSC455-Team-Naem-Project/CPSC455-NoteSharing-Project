import UserNoteService from "../services/UserNote.service";
import React, {useEffect, useState} from "react";
import { useAppSelector } from "../app/hooks";

const Feed = () => {
  const userCredentials = UserNoteService.getUserCredentials();
  const [currentNotes, setCurrentNotes] = useState([]);

  useEffect(() => {
    initiateFeed();
  }, [])

  function initiateFeed() {
    // get 100 most recent notes from users' following list
    // let following = UserNoteService.getFollowingByUserId(userCredentials.userId);
  }

  return (
    <div className="profile">
      <div className="">

      </div>
    </div>
  );
}

export default Feed;