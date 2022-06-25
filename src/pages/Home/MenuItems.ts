import {MENU} from "./MenuSlice";
import NoteUploadPage from "../../components/NoteUploadPage";
import {Feed as FeedIcon, FileCopy, Note, Search as SearchIcon, Upload, Person} from "@mui/icons-material";
import Notes from "../../components/Notes";
import Feed from "../../components/Feed";
import Search from "../../components/Search";
import Profile from "../../components/Profile";
import Notepdfview from "../../components/Notepdfview";

export const HomeComponents = {
    [MENU.UPLOAD]: {
        component: NoteUploadPage,
        display: 'Upload',
        icon: Upload
    },
    [MENU.FEED]: {
        component: Feed,
        display: 'Feed',
        icon: FeedIcon
    },
    [MENU.VIEW_NOTE]: {
        component: Notepdfview,
        display: 'View Note',
        icon: Note
    },
    [MENU.SEARCH]: {
        component: Search,
        display: 'Search',
        icon: SearchIcon
    },
    [MENU.NOTES]: {
        component: Notes,
        display: 'Notes',
        icon: FileCopy
    },
    [MENU.PROFILE]: {
        component: Profile,
        display: 'Profile',
        icon: Person
    }
}
