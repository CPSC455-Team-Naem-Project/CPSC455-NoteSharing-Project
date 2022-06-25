import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core'
import { faImage, faSearch, faFolder } from '@fortawesome/free-solid-svg-icons'
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useState } from 'react';


export default function Fileuploadsidebar({options}: any){
    const [radioValue, setRadiovalue] = useState('private');
    const [nameValue, setNameValue] = useState('');

    return (
        <div id="name-note">
            <h2>Name:</h2>
            <input type="text" name="name" id="name-input" placeholder="CPSC 310 Lectures" style={{height: 30, width: 200}} onChange={(e) => setNameValue(e.target.value)} />
            <FormControl>
                <FormLabel sx={ { textAlign: "center", marginTop: 2, color: "white" } }>
                    <h2>Note visiblity</h2>
                </FormLabel>
                <RadioGroup
                    defaultValue="private"
                    onChange={(e) => setRadiovalue(e.target.value)}
                    row
                >
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                    <FormControlLabel value="public" control={<Radio />} label="Public" sx={ { marginRight: 0 } } />
                </RadioGroup>
            </FormControl>
            <Autocomplete
                disablePortal
                id="category-add"
                options={options}
                size={'small'}
                renderInput={(params) => <TextField {...params} label="Subject" />}
            />
        </div>
    )

}
