import './FollowerAndFollowingTag.scss';
import { Button } from '@mui/material';
import UserNoteService from '../../services/UserNote.service';
import { useEffect, useState } from 'react';

export const FollowerAndFollowingTag = (props: { followerName: any }) => {
  const { followerName } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function init() {
      const followingFromServer = await UserNoteService.getFollowingByUserId();
      const following = followingFromServer.data;
      if (!following.includes(followerName)) {
        setVisible(false)
      }
    }
    init();
  });

  async function unfollow() {
    UserNoteService.removeFromFollowers(followerName);
    UserNoteService.unfollowUser(followerName);
    setVisible(false)

  }

  return (
    <div className="follower-following-container">
     {visible && followerName}
      {visible && (
        <Button
          id="unfollow-button"
          onClick={unfollow}
          variant="outlined"
          sx={{
            m: 2,
          }}
          size="small"
        >
          Unfollow
        </Button>
      )}
    </div>
  );
};
