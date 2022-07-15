import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { Note } from "../components/Noteteaser";
import { courses } from "../constants/courses";

let noteArr: Note[] = []
let i = 0;

for(let property in courses) {
  let myCourse = courses[property as keyof typeof courses]
  let icon = i%2 == 0? faImage: faFilePdf
  i++

  let noteObject = {
    title: property,
    iconType: icon,
    course: myCourse,
    desription: "",
    rating: 5,
    visibility: "Private",
    id: i
  }
  noteArr.push(noteObject)
}

export enum UserNoteReducerActionTypes {
    SET_NOTES,
}

const userNoteReducer:  Reducer = (state = noteArr, action: AnyAction) => {
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
        case UserNoteReducerActionTypes.SET_NOTES:
            return action.payload;
        default:
          return state;
      }
    };

export default userNoteReducer
