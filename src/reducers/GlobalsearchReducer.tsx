import { AnyAction, Reducer } from '@reduxjs/toolkit';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { Note } from '../components/Noteteaser';

const globalSearchReducer: Reducer = (state = [], action: AnyAction) => {
  console.log('IN REDUCER', action);
  switch (action.type) {
    //Add /fulfilled
    case 'REMOVE_GLOBAL_FILTER':
      let newNotes = state.filter(
        (userNote: Note) => userNote.id !== parseInt(action.payload)
      );
      return newNotes;
    //Add /fulfilled when back end running
    case 'ADD_GLOBAL_FILTER':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default globalSearchReducer;
