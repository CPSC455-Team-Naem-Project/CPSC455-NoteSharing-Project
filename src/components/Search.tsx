import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Grid, Rating, TextField } from "@mui/material";
import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserNotes } from "../reducers/UserNoteSlice";
import UserNoteService from "../services/UserNote.service";
import UserNoteComponent from "./UserNotes/UserNoteComponent";
import {defaultOptions} from '../constants/courses'

export default function Search() {
  const [ratingValue, setRatingValue] = useState(0);
  const [labelValue, setLabelValue] = useState( null)
  const [newFilteredNotes, setNewFilteredNotes] = useState([])
  const [id, setId] = useState('')

  const notes = useAppSelector(selectUserNotes);
  console.log("NOTES ARE", notes)

  useEffect(() => {
    const {userId} = UserNoteService.getUserCredentials();
    setId(userId)
    applyFilter();
  }, []);



  async function applyFilter(){

    let fromServer = await UserNoteService.getSavedNotes()
    let notesFromServer = fromServer.data
    notesFromServer = notesFromServer.filter((note: any) => note.userId !== id)
    console.log("SERVICE IS", notesFromServer)
    
    if(labelValue !==  null) {
      // @ts-ignore
      notesFromServer = notesFromServer.filter( note => note.rating >= ratingValue && note.course.name === labelValue.name  )

    } else{
      notesFromServer = notesFromServer.filter( (note: any) => note.rating >= ratingValue  )
    }

    setNewFilteredNotes(notesFromServer)
  }


  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: any){

    setLabelValue(newValue)
  }
  
    return(
     <div>
     <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '5px solid black',
        }}
      >
        <p>Filter by:</p>
        <Rating
          name="simple-controlled"
          value={ratingValue}
          onChange={(event, newValue) => {
            // @ts-ignore
            setRatingValue(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="categoryAdd"
          options={defaultOptions}
          size={'small'}
          isOptionEqualToValue={(option : any, value) => option.id === value.id}
          onChange={(event, newValue) => {
              onChangeHelper(event, newValue)
           }}
          sx={{ width: 200, marginBottom: 0 }}
          renderInput={(params) => <TextField {...params} label="Subject" />}
        />
      <Button variant="outlined"  sx={ {marginTop: 2 } } onClick={applyFilter}>Filter</Button>

      </div>
      <Grid container spacing={2}>
        {/*<Navbar/>*/}
        {/* <NoteGrid notes = {noteArr} options = {defaultOptions}/> */}

        {
          newFilteredNotes.map((note, index) =>
              <Grid item xs={12} lg={6}>
                <UserNoteComponent index={index} userNote={note} userId={id} />
              </Grid>
          )
        }
      </Grid>
     
     </div>
     
    )
  }
