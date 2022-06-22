import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core'
import { faImage, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Button, Rating } from '@mui/material'
import { useState } from 'react'


export interface Note {
    title: string
    iconType: IconDefinition
    course: any
    visibility: string,
    rating: number
    id: number
  }

export default function Noteteaser({ iconType, course, title, visibility, rating } :Note){

    const [value, setValue] = useState(rating);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>

        <FontAwesomeIcon icon= {iconType as IconProp}  size="2x"/>
        <p style={{marginTop: 2, marginBottom: 2}}>{title}</p>
        <Rating
  name="simple-controlled"
  value={value}
  onChange={(event, newValue) => {
         // @ts-ignore
    setValue(newValue);
  }}
/>
        <p style={{marginTop: 5, marginBottom: 5}}>{visibility}</p>
        <Button className={course.className} variant="outlined" size = "small" sx={ { borderRadius: 8, color:"black" }}>{course.name}</Button> 
                
         </div>
    )
    
}