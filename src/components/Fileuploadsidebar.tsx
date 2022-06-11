import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core'
import { faImage, faSearch, faFolder } from '@fortawesome/free-solid-svg-icons'
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useState } from 'react';


export default function Fileuploadsidebar({options}: any){
    const [radioValue, setRadiovalue] = useState('private');
    const [nameValue, setNameValue] = useState('');

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <p>
                Name:
            </p>
            <input type="text" name="name" style={{height: 20, width: 200}} onChange={(e) => setNameValue(e.target.value)} />
            <FormControl>
                <FormLabel sx={ { textAlign: "center", marginTop: 2 } }>Note visiblity</FormLabel>
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
                id="categoryAdd"
                options={options}
                size={'small'}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Subject" />}
            />
        </div>
    )

}
