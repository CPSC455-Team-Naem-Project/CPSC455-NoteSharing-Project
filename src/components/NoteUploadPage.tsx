import Fileuploadsidebar from "./Fileuploadsidebar";
import {FilePond, registerPlugin} from "react-filepond";
import {useState} from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
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
import firebase from "firebase/compat";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// -- FilePond --

type UploadedFile = {
    metadata: FullMetadata,
    url: string
}

export default function NoteUploadPage({options} : any) {
    const storage = getStorage();
    const [files, setFiles] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const uploadFiles = () => {
        const promises = []
        for (const file of files) {
            promises.push(upload(file));
        }

        Promise.all(promises)
            .then(async snapshots => {
                const urls = [];
                for (const snapshot of snapshots) {
                    urls.push({
                        metadata: snapshot.metadata,
                        url: await getDownloadURL(snapshot.ref)
                    });
                }
                setUploadedFiles(urls);
            })
            .catch(console.log)
    }

    const upload = async (file: any) => {
        const file_ = (file as FilePondFile).file;
        const storageRef = ref(storage, file_.name);
        const fileBuffer = await file_.arrayBuffer();
        return await uploadBytes(storageRef, fileBuffer, {contentType: file_.type})
    }

    const downloadFile = (url: string) => {
        const win = window.open(url, '_blank');
        win?.focus();
    }

    return(
        <div>
            <Fileuploadsidebar options={options}/>

            <FilePond
                files={files}
                allowReorder={true}
                allowMultiple={true}
                onupdatefiles={setFiles}
                labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
            />

            <Button variant="outlined"  sx={ {marginTop: 2 } } onClick={uploadFiles}>Upload</Button>

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
                      {uploadedFiles.map((uploadedFile) => (
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
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
        </div>
    )

}
