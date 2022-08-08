import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography, Box, Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Grid, Rating, TextField, Alert } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LockIcon from '@mui/icons-material/Lock';
import UserNoteService from "../services/UserNote.service";
import UserNoteComponent from "./UserNotes/UserNoteComponent";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { FollowerAndFollowingTag } from './FollowerAndFollowingTag/FollowerAndFollowingTag';
import { useLocation } from 'react-router-dom';
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
  const [newFilteredNotes, setNewFilteredNotes] = useState([])
  const [privateNotes, setPrivateNotes] = useState([]);
  const [id, setId] = useState('');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [pro, setPro] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [success, setSuccess] = useState(false)


  const location = useLocation();

  async function getAndSetPro(){
    try{
    setPro(await UserNoteService.getPro() )
    } catch(e){
      setHasError(true)
    }

  }


  useEffect(() => {
    const {userId} = UserNoteService.getUserCredentials();
    setId(userId);
    applyFilter();
    initializeFollowers();
    getAndSetPro()
    let purchaseSucceeded = location.search === "?success"
    let purchaseFailed = location.search === "?failure"
    if(purchaseSucceeded){
      setSuccess(true)
    }
    if(purchaseFailed){
      setHasError(true)
    }
    const timer = setTimeout(() => {
      setSuccess(false)
      setHasError(false)

    }, 4000);
    return () => clearTimeout(timer);
    

  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasError(false)

    }, 4000);
    return () => clearTimeout(timer);
  }, [hasError]);

  async function initializeFollowers() {
    let updatedFollowers = await UserNoteService.getFollowersByUserId();
    let updatedFollowing = await UserNoteService.getFollowingByUserId();
    setFollowers(updatedFollowers.data);
    setFollowing(updatedFollowing.data);
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handlePayment(){
    let fetchBaseURL = process.env.REACT_APP_PROD_URL ? process.env.REACT_APP_PROD_URL: process.env.REACT_APP_SERVER_URL
    let stripeURL =`${fetchBaseURL}/stripe-checkout`
    fetch(stripeURL, {
      method: "POST",
      headers: {
        "Content-type" : 'application/json'
      },
      body: JSON.stringify(
        {id}
      )
    }).then(res => {
      if (res.ok){
        let x = res.json()
        return x
      } else{
        return res.json().then(json => {
          Promise.reject(json)
        })
      }
    }).then(({url})=> {
      window.location = url
    }).catch(err => {
      setHasError(true)
    })

  }

  async function applyFilter() {
    try {
      let fromServer = await UserNoteService.getAllNotesByUserId();
      let notesFromServer = fromServer.data;
      setNewFilteredNotes(notesFromServer);

      let pNotes = notesFromServer.filter((note: any) => note.visibility === false)
      setPrivateNotes(pNotes);
    } catch (error) {
      setHasError(true)
    }
  }

  return (
    <Box key={uuidv4()} sx={{ width: '100%' }}>
            {hasError &&<Alert severity="error" sx={{color: "black !important"}}>Something went wrong with your purchase</Alert>}
            {success && <Alert severity="success" sx={{color: "black !important"}}>Success!  You now have professional mode enabled</Alert>}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} 
        onChange={handleChange} 
        aria-label="tabs"
        textColor="inherit"
        indicatorColor="primary">
          <Tab icon={<TableRowsIcon/>} label="My Notes" {...a11yProps(0)}/>
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
                  <FollowerAndFollowingTag followerName={id} />
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
                  <FollowerAndFollowingTag followerName={id} />
                  </div>
                </Grid>
            )
          }
        </Grid>
      </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Edition: {pro? "Professional" : "Standard"}
        {!pro && <div><Button variant="outlined" sx={ {marginTop: 2 } } onClick={handlePayment}>Click to purchase professional edition</Button></div> }
        
      </TabPanel>
    </Box>
  );
}