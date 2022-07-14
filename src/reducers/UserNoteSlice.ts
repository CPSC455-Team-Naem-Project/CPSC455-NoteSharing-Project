import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserNote} from "../models/UserNote";
import {RootState} from "../app/store";

export interface UserNotesState {
    userNotes: UserNote[];
}

const initialState: UserNotesState = {
    userNotes: []
};

export const userNotesSlice = createSlice({
    name: 'userNotes',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<UserNote[]>) => {
            if (action.payload)
                state.userNotes = action.payload;
        },
        deleteNote: (state, action: PayloadAction<number>) => {
            state.userNotes = state.userNotes.filter((note, index) => index !== action.payload)
        }
    },
});

export const { setNotes, deleteNote } = userNotesSlice.actions;

export const selectUserNotes = (state: RootState) => state.userNotes_.userNotes;

export default userNotesSlice.reducer;
