import { faFilePdf, faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { courses } from "../constants/courses";
import Navbar from "./Navbar";
import NoteGrid from "./NoteGrid";
import { Note } from "./Noteteaser";
import { useAppSelector } from "../app/hooks";

export default function Notes() {
  const dispatch = useDispatch()
  let noteArr  = useAppSelector(state => state.userNotes)

 const options = [
  { label: 'CPSC 310', id: 1 },
  { label: 'ECON 101', id: 2 },
];
    return (<div style={{backgroundColor: "white"}}>
      <Navbar/>
      <NoteGrid notes = {noteArr} options = {options}/>
    </div>)
  }