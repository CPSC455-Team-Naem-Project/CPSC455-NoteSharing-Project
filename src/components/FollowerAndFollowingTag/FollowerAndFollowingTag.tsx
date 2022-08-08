import './FollowerAndFollowingTag.scss';
import { Button } from "@mui/material";
import UserNoteService from "../../services/UserNote.service";
import { useEffect, useState } from 'react';

export const FollowerAndFollowingTag = (props: { followerName: any }) => {
    const { followerName } = props;
    const [unfollowButton, setUnfollowButton] = useState(true);

    useEffect(() => {
        async function init() {
            const followingFromServer = await UserNoteService.getFollowingByUserId();
            const following = followingFromServer.data
            if (!following.includes(followerName)) {
                setUnfollowButton(false);
            }
        }
        init()
    })

    async function unfollow() {
        UserNoteService.removeFromFollowers(followerName);
        UserNoteService.unfollowUser(followerName);
    }

    return (
         <div className="follower-following-container">
             {followerName}
             {unfollowButton && <Button 
             id="unfollow-button" 
             onClick={unfollow} 
             variant="outlined"
             sx={{
                 m: 2
             }}
             size="small"
             >Unfollow</Button>}
         </div>
    );
}
