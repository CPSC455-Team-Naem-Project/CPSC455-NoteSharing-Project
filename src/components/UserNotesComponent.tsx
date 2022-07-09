import {useEffect, useState} from "react";
import {UserNote} from "../models/UserNote";
import UserNoteService from "../services/UserNote.service";
import {
  Paper,
  Stack
} from "@mui/material";
import UserNoteComponent from "./UserNoteComponent";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../app/hooks";
import {selectUserNotes, setNotes} from "../reducers/UserNoteSlice";

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
      <Stack spacing={2}>
        {/*<Navbar/>*/}
        {/*<NoteGrid notes = {noteArr} options = {defaultOptions}/>*/}

        {
          notes.map((note, index) =>
              <Paper>
                <UserNoteComponent index={index} userNote={note} />
              </Paper>
          )
        }
      </Stack>
  )
}
