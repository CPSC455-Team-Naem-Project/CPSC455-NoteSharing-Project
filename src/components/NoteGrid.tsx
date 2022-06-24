import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from '@mui/material';
import Noteteaser, { Note } from './Noteteaser';
import { SyntheticEvent, useState } from 'react';
import {
 Route, Link
} from "react-router-dom"
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
interface Props {
  notes: Note[];
  options: any;
}

export default function NoteGrid({ notes, options }: Props) {
  const [ratingValue, setRatingValue] = useState(0);
  const [radioValue, setRadiovalue] = useState('');
  const [labelValue, setLabelValue] = useState( null)
  const [allNoteItems, setAllNoteItems] = useState(notes)
  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [publicNote, setPublicNote] = useState(true)
  const [privateNote, setPrivateNote] = useState(true)


  function applyFilter(){
    let newFilteredNotes = []
    if(labelValue !==  null) {
      // @ts-ignore
      newFilteredNotes = allNoteItems.filter( note => note.rating >= ratingValue && note.course.name === labelValue.name  )

    } else{
      newFilteredNotes = allNoteItems.filter( note => note.rating >= ratingValue  )
    }
    if(publicNote && !privateNote){
      newFilteredNotes = newFilteredNotes.filter(note => note.visibility === "Public")
    } else if(privateNote && !publicNote){
      newFilteredNotes = newFilteredNotes.filter(note => note.visibility === "Private")
    }

    setFilteredNotes(newFilteredNotes)

    console.log(newFilteredNotes)
    console.log(filteredNotes)


  }

  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: any){

    setLabelValue(newValue)
  }



  let allNotes = filteredNotes.map((note) => (
    <Grid item xs={4}>
              <Link  to="/viewnote" state={note}>
      <Noteteaser
        title={note.title}
        iconType={note.iconType}
        course={note.course}
        rating={note.rating}
        visibility={note.visibility}
        id = {note.id}
      />
      </Link>
    </Grid>
  ));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
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
      <Grid container rowSpacing={8}>
        {allNotes}
      </Grid>
    </div>
  );
}
