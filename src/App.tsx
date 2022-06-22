import React from 'react';
import './App.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Link, Outlet} from "react-router-dom";
import {ProfileButton} from "./components/ProfileButton/ProfileButton";

function App() {
    const auth = getAuth();

    return (
        <div className="app-container">
           <nav>
               <h1>YouNote</h1>
               <ProfileButton />
           </nav>

            <div className={'panel-container'}>
                <div className={'left-panel'}>
                    <h1>Menu</h1>
                </div>

                <div className={'main-panel'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
