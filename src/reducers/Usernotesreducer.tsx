import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { Note } from "../components/Noteteaser";

const userNoteReducer:  Reducer = (state = [], action: AnyAction) => {
    switch (action.type) {
        case 'DELETE_NOTE/fulfilled':
          let newNotes = state.filter(
            (userNote: Note) => userNote.id !== parseInt(action.payload)
          );
          return newNotes;
        case 'EDIT_NOTE/fulfilled':
          let newState = state.map((userNote: Note) =>
          userNote.id === parseInt(action.payload.id) ? action.payload : userNote
          );
          return newState;
        case 'ADD_NOTE/fulfilled':
          return [...state, action.payload];
        default:
          return state;
      }
    };

export default userNoteReducer