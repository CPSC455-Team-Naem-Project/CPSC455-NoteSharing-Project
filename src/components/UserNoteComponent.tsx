import {UserNote} from "../models/UserNote";
import {
    Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Collapse,
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
import {Delete, Download, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import UserNoteService from "../services/UserNote.service";
import {useDispatch} from "react-redux";
import {deleteNote} from "../reducers/UserNoteSlice";
import {useState} from "react";

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

export default function UserNoteComponent(props: {userNote: UserNote, index: number}) {
    const {userNote, index} = props;
    const [expanded, setExpanded] = useState(false);

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
        <Card
            raised
        >
            <CardHeader
                action={
                    <IconButton  onClick={deleteUserNote}>
                        <Delete/>
                    </IconButton>
                }
                title={userNote.title}
                subheader={new Date(userNote.date).toDateString()}
            />
            <CardContent>
                <Typography variant="body2">
                    Visibility: {userNote.visibility ? 'Public' : 'Private'}
                </Typography>
                <Typography variant="body2">
                    Rating: {userNote.rating}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <h3>Note Files</h3>
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
