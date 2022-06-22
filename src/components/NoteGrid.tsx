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
import { useState } from 'react';

interface Props {
  notes: Note[];
  options: any;
}

export default function NoteGrid({ notes, options }: Props) {
  const [value, setValue] = useState(0);
  const [radioValue, setRadiovalue] = useState('');

  let allNotes = notes.map((note) => (
    <Grid item xs={4}>
      <Noteteaser
        title={note.title}
        iconType={note.iconType}
        course={note.course}
        rating={note.rating}
        visibility={note.visibility}
        id = {note.id}
      />
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
          value={value}
          onChange={(event, newValue) => {
            // @ts-ignore
            setValue(newValue);
          }}
        />
        <FormGroup row>
          <FormControlLabel
            value="private"
            control={<Checkbox defaultChecked />}
            label="Private"
          />
          <FormControlLabel
            value="public"
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
          sx={{ width: 200, marginBottom: 10 }}
          renderInput={(params) => <TextField {...params} label="Subject" />}
        />
      </div>
      <Grid container rowSpacing={8}>
        {allNotes}
      </Grid>
    </div>
  );
}
