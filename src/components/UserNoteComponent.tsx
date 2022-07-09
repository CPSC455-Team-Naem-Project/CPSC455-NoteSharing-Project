import {UserNote} from "../models/UserNote";
import {
    Box, Button, ButtonGroup,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Delete, Download} from "@mui/icons-material";
import UserNoteService from "../services/UserNote.service";
import {useDispatch} from "react-redux";
import {deleteNote} from "../reducers/UserNoteSlice";

export default function UserNoteComponent(props: {userNote: UserNote, index: number}) {
    const {userNote, index} = props;

    const dispatch = useDispatch();

    const downloadFile = (url: string) => {
        const win = window.open(url, '_blank');
        win?.focus();
    }

    const deleteUserNote = () => {
        if (window.confirm(`Are you sure you want to delete note titled:${userNote.title}?`))
            UserNoteService.deleteNoteById(userNote._id)
                .then(() => dispatch(deleteNote(index)));
    }

    return (
        <Box>
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
                <h3>Title: {userNote.title}</h3>
                <ButtonGroup>
                    <Button
                        onClick={deleteUserNote}
                        variant="contained"
                    >
                        <Delete/>
                    </Button>
                </ButtonGroup>
            </Stack>
            <h3>Course: {userNote.course.name} | {userNote.course.className} | {userNote.course.label}</h3>
            <h3>Visibility: {userNote.visibility ? 'Public' : 'Private'}</h3>
            <h3>Rating: {userNote.rating}</h3>

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
                            userNote.files.map((file) => (
                                <TableRow
                                    key={file.fileName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{file.fileName}</TableCell>
                                    <TableCell component="th" scope="row">{file.contentType}</TableCell>
                                    <TableCell component="th" scope="row">{file.size}</TableCell>
                                    <TableCell component="th" scope="row">
                                        <IconButton onClick={() => downloadFile(file.url)}>
                                            <Download/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
