import './FollowerAndFollowingTag.scss';
import React, {useEffect, useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from '@mui/icons-material';

export const FollowerAndFollowingTag = (props: { followId: any }) => {
    const { followId } = props;

    return (
         <div className="follower-following-container">
             {followId}
         </div>
    );
}
