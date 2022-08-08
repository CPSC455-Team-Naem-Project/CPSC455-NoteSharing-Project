import './FollowerAndFollowingTag.scss';
import { Button } from "@mui/material";
import UserNoteService from "../../services/UserNote.service";
import { useEffect, useState } from 'react';

export const FollowerAndFollowingTag = (props: { followerName: any }) => {
    const { followerName } = props;
    const [test, setTest] = useState(false);

    useEffect(() => {

    }, []);

    async function unfollow() {
        UserNoteService.removeFromFollowers(followerName);
        UserNoteService.unfollowUser(followerName);
        setTest(true);
        console.log("render");
    }

    return (
         <div className="follower-following-container">
             {followerName}
             <Button 
             id="unfollow-button" 
             onClick={unfollow} 
             variant="outlined"
             sx={{
                 m: 2
             }}
             size="small"
             >Unfollow</Button>
         </div>
    );
}
