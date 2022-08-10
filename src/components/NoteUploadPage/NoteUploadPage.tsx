import { FilePond, registerPlugin } from 'react-filepond';
import { SyntheticEvent, useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Rating,
  Box,
  Stack,
} from '@mui/material';

// FilePond
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { defaultOptions } from '../../constants/courses';
import UserNoteService from '../../services/UserNote.service';
import { UserNoteCourseAttributes, UserNoteFile } from '../../models/UserNote';
import UploadedFileTable from './UploadedFileTable';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export default function NoteUploadPage({ options }: any) {
  const [files, setFiles] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UserNoteFile[]>([]);
  const [radioValue, setRadioValue] = useState('Private');
  const [nameValue, setNameValue] = useState('');
  const [labelValue, setLabelValue] = useState<UserNoteCourseAttributes>({
    _id: undefined,
    className: '',
    label: '',
    name: '',
  });
  const [ratingValue, setRatingValue] = useState(0);
  const [acceptedFileTypes, setAcceptedFileTypes] = useState([
    'application/pdf',
    'image/*',
  ]);

  async function setFileHelper(fileItems: any) {
    setFiles(fileItems);
  }

  useEffect(() => {
    UserNoteService.getPro().then((hasPro) => {
      if (hasPro) {
        setAcceptedFileTypes([
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/*',
          'application/pdf',
        ]);
      }
    });
  }, []);

  function onChangeHelper(
    event: SyntheticEvent<Element, Event>,
    newValue: UserNoteCourseAttributes
  ) {
    setLabelValue(newValue);
  }

  const uploadFiles = async () => {
    try {
      const uploadedNote = await UserNoteService.uploadFiles(files, {
        title: nameValue,
        course: labelValue,
        visibility: radioValue === 'Public',
        rating: ratingValue,
        date: new Date().toISOString(),
      });
      setUploadedFiles(uploadedNote.files);
    } catch (e) {}
  };

  return (
    <Paper elevation={5}>
      <Box padding={5}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <p>Name:</p>
          <input
            type="text"
            name="name"
            style={{ height: 20, width: 200 }}
            onChange={(e) => setNameValue(e.target.value)}
          />

          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              if (newValue === ratingValue) {
                setRatingValue(0);
              }
              // @ts-ignore
              setRatingValue(newValue);
            }}
          />
          <FormControl>
            <FormLabel
              sx={{ textAlign: 'center', marginTop: 2, color: '#fff' }}
            >
              Note Visibility
            </FormLabel>
            <RadioGroup
              defaultValue="private"
              onChange={(e) => setRadioValue(e.target.value)}
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
                sx={{ marginRight: 0, color: 'white' }}
              />
            </RadioGroup>
          </FormControl>
          <Autocomplete
            disablePortal
            id="categoryAdd"
            options={options || defaultOptions}
            size={'small'}
            sx={{ width: 400, backgroundColor: 'white', marginBottom: 2 }}
            isOptionEqualToValue={(option: any, value) =>
              option.id === value.id
            }
            onChange={(event, newValue) => {
              onChangeHelper(event, newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Subject" />}
          />
        </Stack>

        <Box padding={2} />

        <FilePond
          files={files}
          allowReorder={true}
          allowMultiple={true}
          dropValidation={true}
          labelFileTypeNotAllowed={
            'Standard users may only upload PNGs, JPGs, and PDFs while professional users may upload word documents.  Other file types are not allowed'
          }
          allowFileTypeValidation={true}
          onupdatefiles={setFileHelper}
          acceptedFileTypes={acceptedFileTypes}
          labelIdle='Drag and Drop your file or <span class="filepond--label-action">Browse</span>'
        />

        <Button
          disabled={!files.length}
          variant="outlined"
          sx={{ marginTop: 2 }}
          onClick={uploadFiles}
        >
          Upload
        </Button>

        <UploadedFileTable uploadedFiles={uploadedFiles} />
      </Box>
    </Paper>
  );
}
