import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { Note } from "../components/Noteteaser";

const globalSearchReducer:  Reducer = (state = [], action: AnyAction) => {
    switch (action.type) {
        case 'ADD_GLOBAL_FILTER/fulfilled':
          let newNotes = state.filter(
            (userNote: Note) => userNote.id !== parseInt(action.payload)
          );
          return newNotes;
        case 'REMOVE_GLOBAL_FILTER/fulfilled':
          return [...state, action.payload];
        default:
          return state;
      }
    };

export default globalSearchReducer