import { Alert, Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Grid, Rating, TextField } from "@mui/material";
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
  const [hasError, setHasError] = useState(false)


  const notes = useAppSelector(selectUserNotes);

  useEffect(() => {
    const {userId} = UserNoteService.getUserCredentials();
    setId(userId)
    applyFilter(userId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasError(false)

    }, 4000);
    return () => clearTimeout(timer);
  }, [hasError]);



  async function applyFilter(userId: string){

    let filterObject = {ratingValue,
      labelValue,
      id: userId
      }
try{
  let fromServer = await UserNoteService.getPublicFilteredNotes(filterObject)
  let notesFromServer = fromServer.data
  notesFromServer = notesFromServer.filter((note: any) => note.userId !== id)
  console.log("SERVICE IS", notesFromServer)

  setNewFilteredNotes(notesFromServer)

} catch(e) {
  setHasError(true)
}

  }


  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: any){

    setLabelValue(newValue)
  }
  
    return(
     <div>
                  {hasError &&<Alert severity="error" sx={{color: "black !important"}}>Something went wrong</Alert>}
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
      <Button variant="outlined"  sx={ {marginTop: 2 } } onClick={() => applyFilter(id)}>Filter</Button>

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
