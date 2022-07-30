import './FollowerAndFollowingTag.scss';
import DeleteIcon from '@mui/icons-material/Delete';
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
             <DeleteIcon onClick={unfollow}/>
         </div>
    );
}
