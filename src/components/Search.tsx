import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Grid, Rating, TextField } from "@mui/material";
import { SetStateAction, SyntheticEvent, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUserNotes } from "../reducers/UserNoteSlice";
import UserNoteService from "../services/UserNote.service";
import UserNoteComponent from "./UserNotes/UserNoteComponent";

export default function Search() {
  const [ratingValue, setRatingValue] = useState(0);
  const [radioValue, setRadiovalue] = useState('');
  const [labelValue, setLabelValue] = useState( null)
  const [allNoteItems, setAllNoteItems] = useState(null)
  const [filteredNotes, setFilteredNotes] = useState(null)
  const [publicNote, setPublicNote] = useState(true)
  const [privateNote, setPrivateNote] = useState(true)
  const [newFilteredNotes, setNewFilteredNotes] = useState([])

  const notes = useAppSelector(selectUserNotes);
  console.log("NOTES ARE", notes)


  async function applyFilter(){
    if(labelValue !==  null) {
      // @ts-ignore
      newFilteredNotes = allNoteItems.filter( note => note.rating >= ratingValue && note.course.name === labelValue.name  )

    } else{
     // newFilteredNotes = allNoteItems.filter( note => note.rating >= ratingValue  )
    }
    if(publicNote && !privateNote){
      //newFilteredNotes = newFilteredNotes.filter(note => note.visibility === "Public")
    } else if(privateNote && !publicNote){
      //newFilteredNotes = newFilteredNotes.filter(note => note.visibility === "Private")
    }

   let x = await UserNoteService.getPublicFilteredNotes()
   setNewFilteredNotes(x.data)
   console.log("SERVICE IS", x)

   // setFilteredNotes(newFilteredNotes)

    console.log(newFilteredNotes)
    console.log(filteredNotes)


  }


  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: any){

    setLabelValue(newValue)
  }
  
    const myState = useSelector((state) => state);
        console.log("STATE IS", myState)
        const options = [
            { label: 'CPSC 310', id: 1 },
            { label: 'ECON 101', id: 2 },
          ];
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
        <FormGroup row>
          <FormControlLabel
            value= {privateNote}
            control={<Checkbox defaultChecked />}
            label="Private"
            onChange = {() => setPrivateNote(!privateNote)}
          />
          <FormControlLabel
            value= {publicNote}
            onChange={() => setPublicNote(!publicNote)}
            control={<Checkbox defaultChecked />}
            label="Public"
            sx={{ marginRight: 0 }}
          />
        </FormGroup>
        <Autocomplete
          disablePortal
          id="categoryAdd"
          options={options}
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
        {/*<NoteGrid notes = {noteArr} options = {defaultOptions}/>*/}

        {
          newFilteredNotes.map((note, index) =>
              <Grid item xs={12} lg={6}>
                <UserNoteComponent index={index} userNote={note} />
              </Grid>
          )
        }
      </Grid>
     
     </div>
     
    )
  }
