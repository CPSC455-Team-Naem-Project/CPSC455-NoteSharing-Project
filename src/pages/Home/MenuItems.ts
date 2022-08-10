import { MENU } from './MenuSlice';
import NoteUploadPage from '../../components/NoteUploadPage/NoteUploadPage';
import {
  Feed as FeedIcon,
  FileCopy,
  Search as SearchIcon,
  Upload,
  Person,
} from '@mui/icons-material';
import UserNotesComponent from '../../components/UserNotes/UserNotesComponent';
import Feed from '../../components/Feed';
import Search from '../../components/Search';
import Profile from '../../components/Profile';
import ListenTo from '../../components/ListenTo';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import HearingIcon from '@mui/icons-material/Hearing';

type HomeComponentsType = {
  [menu in MENU]: {
    component: ({ options }: any) => JSX.Element;
    display: string;
    icon: OverridableComponent<any>;
    link: string;
    default?: boolean;
  };
};

export const HomeComponents: HomeComponentsType = {
  [MENU.UPLOAD]: {
    component: NoteUploadPage,
    display: 'Upload',
    icon: Upload,
    link: '/note-upload',
    default: true,
  },
  [MENU.NOTES]: {
    component: UserNotesComponent,
    display: 'Saved Notes',
    icon: FileCopy,
    link: '/notes',
  },
  [MENU.FEED]: {
    component: Feed,
    display: 'Feed',
    icon: FeedIcon,
    link: '/feed',
  },
  [MENU.SEARCH]: {
    component: Search,
    display: 'Search',
    icon: SearchIcon,
    link: '/search',
  },
  [MENU.PROFILE]: {
    component: Profile,
    display: 'Profile',
    icon: Person,
    link: '/profile',
  },
  [MENU.LISTEN_TO]: {
    component: ListenTo,
    display: 'Listen To',
    icon: HearingIcon,
    link: '/listen-to',
  },
};
