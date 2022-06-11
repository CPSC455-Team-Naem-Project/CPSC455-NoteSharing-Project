import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faImage, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Autocomplete, TextField } from '@mui/material';

interface Props {
  courses: any[];
}

//Might want to use react router instead of these direct links
export default function Navbar(props : any) {
  return (
    <div>
      <ul className="navBar">
        <li className="headerItem">
          <a href="feed.html">Your Feed</a>
        </li>
        <li className="headerItem">
          <a href="mynotes.html">Your Notes</a>
        </li>
        <li className="headerItem">
          <Autocomplete
            disablePortal
            id="noteSearch"
            options={props.options}
            size={'small'}
            sx={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Subject" />}
          />
        </li>
        <li className="headerItemRight">
          <a href="upload.html">Upload Notes </a>
        </li>
        <li>
          <a href="about.html">Profile </a>
        </li>
        <li>
          <a href="about.html">
            <FontAwesomeIcon icon={faUser as IconProp} size="2x" />
          </a>
        </li>
      </ul>
    </div>
  );
}
