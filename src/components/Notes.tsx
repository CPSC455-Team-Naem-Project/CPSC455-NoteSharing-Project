import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { courses, defaultOptions } from "../constants/courses";
import Navbar from "./Navbar";
import NoteGrid from "./NoteGrid";
import { Note } from "./Noteteaser";
import { useAppSelector } from "../app/hooks";

export default function Notes() {
  const dispatch = useDispatch()
  let noteArr  = useAppSelector(state => state.userNotes)

    return (<div style={{backgroundColor: "white"}}>
      <Navbar/>
      <NoteGrid notes = {noteArr} options = {defaultOptions}/>
    </div>)
  }