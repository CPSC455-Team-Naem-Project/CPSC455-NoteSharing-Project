import {SyntheticEvent, useEffect, useState} from "react";
import UserNoteService from "../../services/UserNote.service";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Grid, Rating, Stack, TextField
} from "@mui/material";
import UserNoteComponent from "./UserNoteComponent";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {selectUserNotes, setNotes} from "../../reducers/UserNoteSlice";
import { defaultOptions } from "../../constants/courses";

export default function UserNotesComponent() {
  const [ratingValue, setRatingValue] = useState(0);
  const [labelValue, setLabelValue] = useState( null)
  const [newFilteredNotes, setNewFilteredNotes] = useState([])
  
  const notes = useAppSelector(selectUserNotes);
  console.log("NOTES RAN")
  let notesFromServer: any[] = []
  const dispatch = useDispatch();

  // to get initial user notes
  useEffect(() => {
    const getInitialNotes = async () => {
      const notesData = await UserNoteService.getAllNotesByUserId();
      return notesData.data;
    }

    getInitialNotes().then(notes =>{

     dispatch(setNotes(notes))
     setNewFilteredNotes(notes)
     console.log("DONE")
    })
  }, [])


  async function applyFilter(){
    
    if(labelValue !==  null) {
      // @ts-ignore
      notesFromServer = notes.filter( note => note.rating >= ratingValue && note.course.name === labelValue.name  )

    } else{
      notesFromServer = notes.filter( (note: any) => note.rating >= ratingValue  )
    }
    // @ts-ignore
    setNewFilteredNotes(notesFromServer)
  }

  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: any){

    setLabelValue(newValue)
  }


  return (
      <>
        {
          (notes && notes.length > 0) ?
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
                {
                  newFilteredNotes.map((note, index) =>
                      <Grid item xs={12} lg={6}>
                        <UserNoteComponent index={index} userNote={note} />
                      </Grid>
                  )
                }
              </Grid> </div> :

              <Box marginTop={5}>
                <Stack direction={'row'} justifyContent={'center'}>
                  <Alert variant={'filled'}  severity="info">
                    You have not uploaded any notes yet
                  </Alert>
                </Stack>
              </Box>
        }
      </>
  )
}
