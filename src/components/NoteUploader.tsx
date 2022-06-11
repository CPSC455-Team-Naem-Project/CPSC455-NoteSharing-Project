import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export default function NoteUploader(){
    const [files, setFiles] = useState<any[]>([]);

    return (
        <div>
            <FilePond
                files={files}
                allowReorder={true}
                allowMultiple={true}
                onupdatefiles={setFiles}
                labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    )
}
