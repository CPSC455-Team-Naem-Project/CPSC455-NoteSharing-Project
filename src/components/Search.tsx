import { useSelector, useStore } from "react-redux";
import Navbar from "./Navbar";

export default function Search() {
    const recipes = useSelector((state) => state);
        console.log("TEMP IS", recipes)
        const options = [
            { label: 'CPSC 310', id: 1 },
            { label: 'ECON 101', id: 2 },
          ];
    return <div><Navbar options = {options}/><h1>Hello</h1></div>
  }