import {UserNote} from "../../models/UserNote";
import {
    Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Collapse, Container,
    IconButton, IconButtonProps,
    Paper,
    Stack, styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {Attachment, Delete, Download, Edit, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import UserNoteService from "../../services/UserNote.service";
import {useDispatch} from "react-redux";
import {deleteNote} from "../../reducers/UserNoteSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(
    ({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    })
);

export default function UserNoteComponent(props: {userNote: UserNote, index: number, userId?: string}) {
    const {userNote, index, userId} = props;
    const nav = useNavigate();
    const [expanded, setExpanded] = useState(false);
    console.log("IN NOTE")
    const userControledNote = !userId || userId === userNote.userId ? true: false

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

    const editUserNote = () => {
        nav('/edit-note/' + userNote._id, {state: {userNote}})
    }

    return (
        <Card
            raised
        >

            <CardHeader
                title={userNote.title}
                subheader={<div>{new Date(userNote.date).toDateString()}<div>{!userControledNote && userNote.userDisplayName}</div></div>}
            />
            <CardContent>
            <Typography variant="body2">
                    Course: {userNote.course.label}
                </Typography>
                <Typography variant="body2">
                    Visibility: {userNote.visibility ? 'Public' : 'Private'}
                </Typography>
                <Typography variant="body2">
                    Rating: {userNote.rating}/5
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                { userControledNote &&<div>
                <IconButton onClick={deleteUserNote}>
                    <Delete />
                </IconButton>
                <IconButton onClick={editUserNote} aria-label="share">
                    <Edit />
                </IconButton>
                </div>
}
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
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
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>File Name</TableCell>
                                    <TableCell>Content Type</TableCell>
                                    <TableCell>Size</TableCell>
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
                </CardContent>
            </Collapse>

        </Card>
    )
}
