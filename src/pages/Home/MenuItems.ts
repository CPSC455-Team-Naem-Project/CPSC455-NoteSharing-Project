import {MENU} from "./MenuSlice";
import NoteUploadPage from "../../components/NoteUploadPage";
import {FileCopy, Upload} from "@mui/icons-material";
import {CgProfile} from "react-icons/cg";

export const HomeComponents = {
    [MENU.UPLOAD]: {
        component: NoteUploadPage,
        display: 'Upload',
        icon: Upload
    },
    [MENU.MY_NOTES]: {
        component: NoteUploadPage,
        display: 'My Notes',
        icon: FileCopy
    },
    [MENU.PROFILE]: {
        component: CgProfile,
        display: 'My Notes',
        icon: FileCopy
    }
}
