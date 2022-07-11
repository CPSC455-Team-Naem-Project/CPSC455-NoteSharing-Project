import Fileuploadsidebar from "../Fileuploadsidebar";
import {FilePond, registerPlugin} from "react-filepond";
import {SyntheticEvent, useReducer, useState} from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Rating, Box, Stack
} from "@mui/material";
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, FullMetadata  } from "firebase/storage";
import {Download} from '@mui/icons-material';

// FilePond
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {FilePondFile} from "filepond";
import { Note } from "../Noteteaser";
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { defaultOptions } from "../../constants/courses";
import UserNoteService from "../../services/UserNote.service";
import {getAuth} from "firebase/auth";
import {UserNoteCourseAttributes, UserNoteFile} from "../../models/UserNote";
import UploadedFileTable from "./UploadedFileTable";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function NoteUploadPage({options} : any) {
    const [files, setFiles] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<UserNoteFile[]>([]);
    const [radioValue, setRadioValue] = useState('Private');
    const [nameValue, setNameValue] = useState('');
    const [labelValue, setLabelValue] = useState<UserNoteCourseAttributes>( {
        _id: undefined,
        className: "",
        label: "",
        name: ""
    })
    const [ratingValue, setRatingValue] = useState(5);

    const dispatch = useDispatch()

    const AddNewNote = (newNote: Note) => {
        return {
            //Will need to change when backend added
            type: 'ADD_NOTE/fulfilled',
            payload: newNote
        }
    }

    function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: UserNoteCourseAttributes){

        setLabelValue(newValue)
    }

    const uploadFiles = async () => {
        try {
            const uploadedNote = await UserNoteService.uploadFiles(files, {
                title: nameValue,
                course: labelValue,
                visibility: radioValue === 'Public',
                rating: ratingValue,
                date: new Date().toISOString()
            })
            console.log("NEW OBJECT", uploadedNote)
            setUploadedFiles(uploadedNote.files)
            dispatch(AddNewNote(uploadedNote as unknown as Note))
        } catch (e) {
            console.log(e);
        }
    }


    return(
        <Paper elevation={5}>
            <Box padding={5}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <p>
                        Name:
                    </p>
                    <input type="text" name="name" style={{height: 20, width: 200}} onChange={(e) => setNameValue(e.target.value)} />

                    <Rating
                        name="simple-controlled"
                        value={ratingValue}
                        onChange={(event, newValue) => {
                            // @ts-ignore
                            setRatingValue(newValue);
                        }}
                    />
                    <FormControl>
                        <FormLabel sx={ { textAlign: "center", marginTop: 2 } }>Note Visibility</FormLabel>
                        <RadioGroup
                            defaultValue="private"
                            onChange={(e) => setRadioValue(e.target.value)}
                            row
                        >
                            <FormControlLabel value="Private" control={<Radio />} label="Private" />
                            <FormControlLabel value="Public" control={<Radio />} label="Public" sx={ { marginRight: 0 } } />
                        </RadioGroup>
                    </FormControl>
                    <Autocomplete
                        disablePortal
                        id="categoryAdd"
                        options={options || defaultOptions}
                        size={'small'}
                        sx={{ width: 400, backgroundColor: "white", marginBottom: 2 }}
                        isOptionEqualToValue={(option : any, value) => option.id === value.id}
                        onChange={(event, newValue) => {
                            onChangeHelper(event, newValue)
                        }}
                        renderInput={(params) => <TextField {...params} label="Subject" />}
                    />
                </Stack>

                <Box padding={2} />

                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={true}
                    onupdatefiles={setFiles}
                    acceptedFileTypes={['.pdf', '.doc', 'image/*', 'video/*']}
                    labelIdle='Drag and Drop your file or <span class="filepond--label-action">Browse</span>'
                />

                <Button disabled={!files.length} variant="outlined"  sx={ {marginTop: 2 } } onClick={uploadFiles}>Upload</Button>

                <UploadedFileTable uploadedFiles={uploadedFiles} />
            </Box>
        </Paper>
    )

}
