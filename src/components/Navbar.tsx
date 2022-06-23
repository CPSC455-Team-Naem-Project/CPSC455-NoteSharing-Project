import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import {useNavigate} from 'react-router-dom';


interface Props {
  courses: any[];
}

const AddToFilter = (classFilter: any) => {
  return {
    type: 'ADD_GLOBAL_FILTER',
    payload: classFilter
  }
}





//Might want to use react router instead of these direct links
export default function Navbar(props : any) {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: unknown){
    dispatch(AddToFilter(newValue))
    console.log("VALUE", newValue)
    navigate('/search');
  }

  return (
    <div style= {{position: "relative", zIndex: 8000}}>
    <div>
      </div>
      <ul className="navBar">
      <Link to="/feed">
        <li className="headerItem">
                  Your Feed
        </li>
        </Link>
        <Link to="/notes">
        <li className="headerItem">
          Your Notes
        </li>
        </Link>
        <li className="headerItem">
          <Autocomplete
            disablePortal
            id="noteSearch"
            options={props.options}
            size={'small'}
            sx={{ width: 400 }}
            onChange={(event, newValue) => {
              onChangeHelper(event, newValue)
           }}
            renderInput={(params) => <TextField {...params} label="Subject" />}
          />
        </li>
        <Link  to="/upload">
        <li className="headerItemRight">
          Upload Notes 
        </li>
        </Link>
        <Link  to="/profile">
        <li>
          Profile 
        </li>
        </Link>
        <Link  to="/profile">
        <li>
            <FontAwesomeIcon icon={faUser as IconProp} size="2x" />
        </li>
        </Link>
      </ul>
    </div>
  );
}
