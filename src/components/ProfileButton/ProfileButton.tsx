import './ProfileButton.scss';
import {getAuth, GoogleAuthProvider, signInWithPopup, UserInfo} from "firebase/auth";
import React, {useEffect, useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from '@mui/icons-material';

export const ProfileButton = () => {
    const auth = getAuth();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const userSub = auth.onAuthStateChanged(setUser)
        return () => userSub();
    }, [auth, auth.currentUser])

    const showLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const logout = () => {
        auth.signOut()
            .then(handleClose)

    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
         <div className={'profile-button-container'}>
            {
                user ?
                    <>
                        <button className={'profile-container'} onClick={handleClick}>
                            <img src={user?.photoURL as string} alt={user?.displayName as string} />
                            <p>{user.displayName?.split(' ').shift()}</p>
                            <IconButton>
                                <KeyboardArrowDown />
                            </IconButton>
                        </button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </>
                    :
                    <a className={'login-btn'} onClick={showLogin}>Login</a>
            }

        </div>
    );
}
