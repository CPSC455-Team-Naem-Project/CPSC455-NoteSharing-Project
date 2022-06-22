import { useSelector, useStore } from "react-redux";

export default function Search() {
    const recipes = useSelector((state) => state);
        console.log("TEMP IS", recipes)
    return <h1>Hello</h1>;
  }