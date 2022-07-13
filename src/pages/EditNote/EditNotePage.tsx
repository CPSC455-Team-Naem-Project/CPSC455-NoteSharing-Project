import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import UserNoteService from "../../services/UserNote.service";
import {UserNote} from "../../models/UserNote";


export default function EditNotePage() {
    const { noteId } = useParams();
    const location = useLocation();

    const [note, setNote] = useState<UserNote | null>(null)

    useEffect(() => {
        if (location.state)
            setNote((location.state as {userNote: UserNote}).userNote)
        else
            UserNoteService.getNoteById(noteId as string)
                .then(setNote)
    }, [])

    return (
        <div>
            {note &&

              <div>
                <h5>{note._id}</h5>
                <h5>{note.title}</h5>
                <h5>{note.date}</h5>
              </div>
            }
        </div>

    )
}
