import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Download} from "@mui/icons-material";
import {UserNoteFile} from "../../models/UserNote";

export default function UploadedFileTable(props: {uploadedFiles: Partial<UserNoteFile>[]}) {
    const {uploadedFiles} = props;

    const downloadFile = (url: string | undefined) => {
        const win = window.open(url, '_blank');
        win?.focus();
    }

    return (
        <>
            {uploadedFiles && uploadedFiles.length > 0 &&
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
                                  key={uploadedFile.fileName}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                  <TableCell component="th" scope="row">{uploadedFile.fileName}</TableCell>
                                  <TableCell component="th" scope="row">{uploadedFile.contentType}</TableCell>
                                  <TableCell component="th" scope="row">{uploadedFile.size}</TableCell>
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
        </>
    )
}
