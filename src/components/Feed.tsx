import UserNoteService from "../services/UserNote.service";
import React, {useEffect, useState} from "react";
import { useAppSelector } from "../app/hooks";
import UserNoteComponent from "./UserNotes/UserNoteComponent";
import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material";

const Feed = () => {
  const {userId} = UserNoteService.getUserCredentials();
  const [currentNotes, setCurrentNotes] = useState<any[]>([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    initiateFeed();
  }, [])

  async function initiateFeed() {
    // get 100 most recent notes from users' following list
    console.log("getting notes");
    let allPublicNotes = await UserNoteService.getMostRecentNotes();
    let mostRecentNotes = allPublicNotes.data.reverse().slice(0, 100);
    setCurrentNotes(mostRecentNotes);

    // get user following list
    let updatedFollowing = await UserNoteService.getFollowingByUserId();
    setFollowing(updatedFollowing.data);
  }

  async function handleFollow(idToFollow: string) {
      await UserNoteService.followUser(idToFollow);
      await UserNoteService.addToFollowList(idToFollow);
  }

  return (
    <div className="profile">
      <div className="feed-container">
        <h1>Work in Progress</h1>
          {currentNotes.map((note, index) =>
              <Grid item xs={12} lg={6} key = {index}>
              <UserNoteComponent key={index} index={index} userNote={note} userId={note.userId}/>
            </Grid>
          )}
      </div>
    </div>
  );
}

export default Feed;