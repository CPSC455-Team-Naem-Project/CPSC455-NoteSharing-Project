import Fileuploadsidebar from "./Fileuploadsidebar";
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
    Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Rating, Box
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
import { Note } from "./Noteteaser";
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { defaultOptions } from "../constants/courses";
import UserNoteService from "../UserNote.service";
import {getAuth} from "firebase/auth";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// -- FilePond --

type UploadedFile = {
    metadata: FullMetadata,
    url: string
}

type Course = {
    name: string;
}

export default function NoteUploadPage({options} : any) {
    const storage = getStorage();
    const [files, setFiles] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [radioValue, setRadioValue] = useState('Private');
    const [nameValue, setNameValue] = useState('');
    const [labelValue, setLabelValue] = useState<Course>( {name: ""})
    const [ratingValue, setRatingValue] = useState(5);

    const dispatch = useDispatch()
    const auth = getAuth();


    const AddNewNote = (newNote: Note) => {
        return {
            //Will need to change when backend added
            type: 'ADD_NOTE/fulfilled',
            payload: newNote
        }
    }

    function onChangeHelper(event: SyntheticEvent<Element, Event>, newValue: Course){

        setLabelValue(newValue)
    }

    const uploadFiles = async () => {
        try {
            const snapshot = await upload(files[0])
            const {name: fileName, size, contentType} = snapshot.metadata;
            const url = await getDownloadURL(snapshot.ref)
            await UserNoteService.uploadNote(auth.currentUser, {
                fileName,
                size,
                contentType,
                url,
                title: nameValue,
                course: labelValue.name,
                visibility: radioValue === 'Public',
                rating: ratingValue,
            })
        } catch (e) {
            console.log(e);
        }
    }

    const upload = async (file: any) => {
        const file_ = (file as FilePondFile).file;
        let fileName =  file_.name
        let fileType = fileName.slice(fileName.length - 3)
        let typeOfIcon = fileType === "pdf" ? faFilePdf: faImage
        let newNoteObject = {
            title: nameValue,
            course: labelValue,
            iconType: typeOfIcon,
            visibility: radioValue,
            rating: ratingValue,
            id: -1
        }
        console.log("NEW OBJECT", newNoteObject)
        dispatch(AddNewNote(newNoteObject))
        const storageRef = ref(storage, file_.name);
        const fileBuffer = await file_.arrayBuffer();
        return await uploadBytes(storageRef, fileBuffer, {contentType: file_.type})
    }

    const downloadFile = (url: string) => {
        const win = window.open(url, '_blank');
        win?.focus();
    }

    return(
        <Paper elevation={5}>
            <Box padding={5}>
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
                </div>
                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={false}
                    onupdatefiles={setFiles}
                    labelIdle='Drag and Drop your file or <span class="filepond--label-action">Browse</span>'
                />

                <Button disabled={!files.length} variant="outlined"  sx={ {marginTop: 2 } } onClick={uploadFiles}>Upload</Button>

                {
                    uploadedFiles.length > 0 &&
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>File Name</TableCell>
                          <TableCell>Content Type</TableCell>
                          <TableCell>Bucket</TableCell>
                          <TableCell>Download</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                              uploadedFiles.map((uploadedFile) => (
                                  <TableRow
                                      key={uploadedFile.metadata.name}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                      <TableCell component="th" scope="row">{uploadedFile.metadata.name}</TableCell>
                                      <TableCell component="th" scope="row">{uploadedFile.metadata.contentType}</TableCell>
                                      <TableCell component="th" scope="row">{uploadedFile.metadata.bucket}</TableCell>
                                      <TableCell component="th" scope="row">
                                          <IconButton onClick={() => downloadFile(uploadedFile.url)}>
                                              <Download/>
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))
                          }
                      </TableBody>
                    </Table>
                  </TableContainer>
                }
            </Box>
        </Paper>
    )

}
