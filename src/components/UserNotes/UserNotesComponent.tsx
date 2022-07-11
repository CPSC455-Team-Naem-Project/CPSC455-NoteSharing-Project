import {useEffect} from "react";
import UserNoteService from "../../services/UserNote.service";
import {
  Grid
} from "@mui/material";
import UserNoteComponent from "./UserNoteComponent";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {selectUserNotes, setNotes} from "../../reducers/UserNoteSlice";

export default function UserNotesComponent() {
  const notes = useAppSelector(selectUserNotes);
  const dispatch = useDispatch();

  // to get initial user notes
  useEffect(() => {
    const getInitialNotes = async () => {
      const notesData = await UserNoteService.getAllNotesByUserId();
      return notesData.data;
    }

    getInitialNotes().then(notes => dispatch(setNotes(notes)))
  }, [])

  return (
      <Grid container spacing={2}>
        {/*<Navbar/>*/}
        {/*<NoteGrid notes = {noteArr} options = {defaultOptions}/>*/}

        {
          notes.map((note, index) =>
              <Grid item xs={12} lg={6}>
                <UserNoteComponent index={index} userNote={note} />
              </Grid>
          )
        }
      </Grid>
  )
}