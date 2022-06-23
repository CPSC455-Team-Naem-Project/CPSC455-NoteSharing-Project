import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { defaultOptions } from '../constants/courses';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Notepdfview({ options, pdfFilePath }: any) {
  const location = useLocation();
  const data: any = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [file, setFile] = useState(pdfFilePath);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [radioValue, setRadiovalue] = useState(data.visibility);
  const [nameValue, setNameValue] = useState(data.title);
  const [labelValue, setLabelValue] = useState(data.course);
  const [ratingValue, setRatingValue] = useState(data.rating);

  console.log(data);
  const options2 = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  // @ts-ignore
  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  // @ts-ignore
  function onDocumentLoadSuccess(test) {
    console.log('NUM PAGES', test._pdfInfo.numPages);
    setNumPages(test._pdfInfo.numPages);
  }

  function onChangeHelper(
    event: SyntheticEvent<Element, Event>,
    newValue: object
  ) {
    setLabelValue(newValue);
  }

  const editNote = (noteObject: any) => {
    return {
      type: 'EDIT_NOTE/fulfilled',
      payload: noteObject,
    };
  };

  function onSaveHelper() {
    let editNoteObject = {
      title: nameValue,
      course: labelValue,
      iconType: data.iconType,
      visibility: radioValue,
      rating: ratingValue,
      id: data.id,
    };
    dispatch(editNote(editNoteObject));
    navigate('/notes');
  }

  const deleteNote = (noteId: any) => {
    return {
      type: 'DELETE_NOTE/fulfilled',
      payload: noteId,
    };
  };

  function onDeleteHelper() {
    dispatch(deleteNote(data.id));
    navigate('/notes');
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p>Name:</p>
        <input
          type="text"
          name="name"
          style={{ height: 20, width: 200 }}
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <Rating
          name="simple-controlled"
          value={ratingValue}
          onChange={(event, newValue) => {
            // @ts-ignore
            setRatingValue(newValue);
          }}
        />
        <FormControl>
          <FormLabel sx={{ textAlign: 'center', marginTop: 2 }}>
            Note visiblity
          </FormLabel>
          <RadioGroup
            defaultValue={radioValue}
            onChange={(e) => setRadiovalue(e.target.value)}
            row
          >
            <FormControlLabel
              value="Private"
              control={<Radio />}
              label="Private"
            />
            <FormControlLabel
              value="Public"
              control={<Radio />}
              label="Public"
              sx={{ marginRight: 0 }}
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          disablePortal
          id="categoryAdd"
          options={options || defaultOptions}
          size={'small'}
          sx={{ width: 400 }}
          defaultValue={data.course}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option: any, value) => option.id === value.id}
          onChange={(event, newValue) => {
            onChangeHelper(event, newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Subject" />}
        />
        <div>
          <Button
            variant="outlined"
            sx={{ marginTop: 2, marginRight: 5 }}
            onClick={onSaveHelper}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{ marginTop: 2 }}
            onClick={onDeleteHelper}
          >
            Delete
          </Button>
        </div>
      </div>{' '}
      <img
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        alt="new"
      />
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{' '}
            <input onChange={onFileChange} type="file" />
          </div>
          <div className="Example__container__document">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options2}
            >
              <Page pageNumber={currentPage} />
            </Document>
          </div>
          <div onClick={() => setCurrentPage(currentPage + 1)}>CLICK ME</div>
        </div>
      </div>
    </div>
  );
}
