import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Tabs, Tab, Typography, Box, Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Grid, Rating, TextField } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LockIcon from '@mui/icons-material/Lock';
import {defaultOptions} from '../constants/courses'
import { useAppSelector } from "../app/hooks";
import { selectUserNotes } from "../reducers/UserNoteSlice";
import UserNoteService from "../services/UserNote.service";
import UserNoteComponent from "./UserNotes/UserNoteComponent";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { FollowerAndFollowingTag } from './FollowerAndFollowingTag/FollowerAndFollowingTag';
const { v4: uuidv4 } = require('uuid');

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  const [labelValue, setLabelValue] = useState(null)
  const [newFilteredNotes, setNewFilteredNotes] = useState([])
  const [privateNotes, setPrivateNotes] = useState([]);
  const [id, setId] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const {userId} = UserNoteService.getUserCredentials();
    setId(userId);
    applyFilter();
  }, [newFilteredNotes, privateNotes]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function applyFilter() {
    try {
      let fromServer = await UserNoteService.getAllNotesByUserId();
      let notesFromServer = fromServer.data;
      setNewFilteredNotes(notesFromServer);

      notesFromServer.filter((note: any) => note.visibility === false)
      setPrivateNotes(notesFromServer);

      // Get followers and following
      let followers = await UserNoteService.getFollowersByUserId();
      let following = await UserNoteService.getFollowingByUserId();
      
      
      // should add yourself as a follower for now ******
      // ADD FUNCTIONALITY TO FOLLOWER'S ID ADDED HERE
      await UserNoteService.followUser("BWjfSniLNmbpkUdD0vOjrgmLeWl1");
      await UserNoteService.addToFollowList("BWjfSniLNmbpkUdD0vOjrgmLeWl1");
      setFollowers(followers.data);
      setFollowing(following.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box key={id} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} 
        onChange={handleChange} 
        aria-label="tabs"
        textColor="inherit"
        indicatorColor="primary">
          <Tab icon={<TableRowsIcon/>} label="All Notes" {...a11yProps(0)}/>
          <Tab icon={<LockIcon/>} label="Private Notes" {...a11yProps(1)} />
          <Tab icon={<PeopleAltIcon/>}label="Followers" {...a11yProps(2)} />
          <Tab icon={<PersonAddAltIcon/>}label="Following" {...a11yProps(3)} />
          <Tab icon={<SettingsIcon/>}label="Settings" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div>
        <Grid container spacing={2}>
          {
            newFilteredNotes.map((note, index) =>
                <Grid item xs={12} lg={6}>
                  <UserNoteComponent index={index} userNote={note} userId={id} />
                </Grid>
            )
          }
        </Grid>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
        <Grid container spacing={2}>
          {
            privateNotes.map((note, index) =>
                <Grid item xs={12} lg={6}>
                  <UserNoteComponent index={index} userNote={note} userId={id} />
                </Grid>
            )
          }
        </Grid>
      </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div>
        <Grid container spacing={2}>
        {
            followers.map((id) =>
                <Grid item xs={12} lg={6}>
                  <div className="user-tag">
                  <FollowerAndFollowingTag followId={id} />
                  </div>
                </Grid>
            )
          }
        </Grid>
      </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div>
        <Grid container spacing={2}>
          {
            following.map((id) =>
                <Grid item xs={12} lg={6}>
                  <div className="user-tag">
                  <FollowerAndFollowingTag followId={id} />
                  </div>
                </Grid>
            )
          }
        </Grid>
      </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Settings
      </TabPanel>
    </Box>
  );
}
