import { UserNote } from '../../models/UserNote';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  Attachment,
  Delete,
  Download,
  Add,
  Remove,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import UserNoteService from '../../services/UserNote.service';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../../reducers/UserNoteSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserNoteComponent(props: {
  userNote: UserNote;
  index: number;
  userId?: string;
}) {
  const { userNote, index, userId } = props;
  const [expanded, setExpanded] = useState(false);
  const [disableFollow, setDisableFollow] = useState(false);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableSave, setDisableSave] = useState(false);
  const [disableUnSave, setDisableUnSave] = useState(true);
  const userControledNote =
    !userId || userId === userNote.userId ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      let nameToFollow = userNote.userDisplayName;
      let following = await UserNoteService.getFollowingByUserId();
      let savedNotesFromServer = await UserNoteService.getSavedNotes();
      const { userId, userDisplayName } =
        await UserNoteService.getUserCredentials();

      // If user doesn't follow and isn't themselves, follow.
      if (
        following.data.includes(nameToFollow) ||
        nameToFollow === userDisplayName
      ) {
        setDisableFollow(true);
      }

      // If users' note, enable delete button
      if (userId === userNote.userId) {
        setDisableDelete(false);
      }

      // If note is saved, allow user to unsave AND disable save
      let savedNotesData = savedNotesFromServer.data;
      if (savedNotesData !== '') {
        savedNotesData.map((note: any) => {
          if (note._id == userNote._id) {
            setDisableSave(true);
            setDisableUnSave(false);
          }
        });
      }
    }
    init();
  }, []);

  const downloadFile = (url: string) => {
    const win = window.open(url, '_blank');
    win?.focus();
  };

  const deleteUserNote = () => {
    if (
      window.confirm(
        `Are you sure you want to delete note titled:${userNote.title}?`
      )
    )
      UserNoteService.deleteNoteById(userNote._id).then(() =>
        dispatch(deleteNote(index))
      );
  };

  const saveNote = () => {
    UserNoteService.saveNoteToSavedNotes(userNote);
  };

  async function unsaveNote() {
    await UserNoteService.unsaveNote(userNote._id);
  }

  async function followUser() {
    let nameToFollow = userNote.userDisplayName;
    let following = await UserNoteService.getFollowingByUserId();
    const { userDisplayName } = await UserNoteService.getUserCredentials();

    // If user doesn't follow and isn't themselves, follow.
    if (
      !following.data.includes(nameToFollow) &&
      nameToFollow !== userDisplayName
    ) {
      let idToFollow = await UserNoteService.getUserIdByNoteId(userNote._id);
      await UserNoteService.followUser(idToFollow);
      await UserNoteService.addToFollowList(idToFollow);
    }
  }

  return (
    <Card raised className="note">
      <CardHeader
        title={<div id="note-title">{userNote.title}</div>}
        subheader={
          <div>
            <div id="user-name">{userNote.userDisplayName}</div>
            <div>
              {new Date(userNote.date).toDateString()}
              <div>{!userControledNote && userNote.userDisplayName}</div>
            </div>
          </div>
        }
      />
      <CardContent>
        <Typography variant="body2">
          Course: {userNote.course?.label}
        </Typography>
        <Typography variant="body2">
          Visibility: {userNote.visibility ? 'Public' : 'Private'}
        </Typography>
        <Typography variant="body2">Rating: {userNote.rating}/5</Typography>
      </CardContent>

      <CardActions disableSpacing>
        {
          <div>
            <IconButton onClick={deleteUserNote} disabled={disableDelete}>
              <Delete />
            </IconButton>
            <IconButton
              aria-label="add"
              onClick={saveNote}
              disabled={disableSave}
            >
              <Add />
            </IconButton>
            <IconButton
              aria-label="subtract"
              onClick={unsaveNote}
              disabled={disableUnSave}
            >
              <Remove />
            </IconButton>
            <Button
              id="follow-button"
              onClick={followUser}
              variant="outlined"
              disabled={disableFollow}
            >
              Follow
            </Button>
          </div>
        }
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          className="button"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Attachment />
            <Typography variant="h6" component="h5">
              Attached Files
            </Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Content Type</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userNote.files.map((file) => [
                  <TableRow
                    key={file.fileName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {file.fileName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {file.contentType}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {file.size}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton onClick={() => downloadFile(file.url)}>
                        <Download />
                      </IconButton>
                    </TableCell>
                  </TableRow>,
                ])}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
}
