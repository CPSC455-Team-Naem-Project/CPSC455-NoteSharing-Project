import React from 'react';
import './App.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Link, Outlet} from "react-router-dom";
import {ProfileButton} from "./components/ProfileButton/ProfileButton";
import Navbar from './components/Navbar';

import { useSelector } from 'react-redux'

function App() {
    const auth = getAuth();
    const options = [
        { label: 'CPSC 310', id: 1 },
        { label: 'ECON 101', id: 2 },
      ];

    return (
        <div className="app-container">
           <nav>
               <h1>YouNote</h1>
               <ProfileButton />
           </nav>
           <Navbar options= {options}/>
            <div className={'panel-container'}>
                <div className={'left-panel'}>
                    <h1>Menu</h1>
                    <h1>Feed</h1>
                    <h1>Your Notes</h1>
                </div>

                <div className={'main-panel'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
