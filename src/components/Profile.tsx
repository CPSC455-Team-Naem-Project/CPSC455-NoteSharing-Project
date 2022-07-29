import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import UserNoteService from "../services/UserNote.service";
import { useLocation } from 'react-router-dom';

export default function Welcome() {

  const [id, setId] = useState('')


  const location = useLocation();
  console.log(location.search);
  useEffect(() => {
    const {userId} = UserNoteService.getUserCredentials();
    setId(userId)
    console.log("USER ID IS", userId)

  }, []);

  function handlePayment(){
    let fetchBaseURL = process.env.REACT_APP_PROD_URL ? process.env.REACT_APP_PROD_URL: process.env.REACT_APP_SERVER_URL
    let stripeURL =`${fetchBaseURL}/stripe-checkout`
    fetch(stripeURL, {
      method: "POST",
      headers: {
        "Content-type" : 'application/json'
      },
      body: JSON.stringify(
        {id}
      )
    }).then(res => {
      if (res.ok){
        let x = res.json()
        console.log("RES",x)
        return x
      } else{
        return res.json().then(json => {
          Promise.reject(json)
        })
      }
    }).then(({url})=> {
      console.log("URL IS", url)
      window.location = url
    }).catch(err => {
      console.log("SOMETHING WENT WRONG", err)
    })

  }

    return(<div>
      <h1>Hello</h1>
      <Button variant="outlined"  sx={ {marginTop: 2 } } onClick={handlePayment}>Filter</Button>

    </div> )
  }