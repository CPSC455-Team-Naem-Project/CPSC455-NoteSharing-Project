import React from 'react';
import './App.scss';
import { getAuth} from "firebase/auth";
import {Outlet} from "react-router-dom";
import {ProfileButton} from "./components/ProfileButton/ProfileButton";
import { CgProfile } from 'react-icons/cg';
import Authed from "./components/Authed";


function App() {
    return (
        <div className="app-container">
            <div id="circle1" className="circle"></div>
            <div id="circle2" className="circle"></div>
            <div id="circle3" className="circle"></div>
            <div id="circle4" className="circle"></div>
            <div id="circle5" className="circle"></div>
            <div id="circle6" className="circle"></div>
            <div id="circle7" className="circle"></div>
            <div id="circle8" className="circle"></div>
            <div id="circle9" className="circle"></div>
            <div id="circle10" className="circle"></div>
           <nav>
               <h1 id="title">YouNote</h1>
               <ProfileButton />
           </nav>

          <div className={'panel-container'}>
            <Authed>
              <Outlet/>
            </Authed>
          </div>

            {/*<div className={'panel-container'}>*/}
            {/*    <div className={'left-panel'}>*/}
            {/*        <h1 id="current-page">Menu</h1>*/}
            {/*        <a id="profile" href="/profile"><CgProfile/></a>*/}
            {/*    </div>*/}

            {/*    <div className={'main-panel'}>*/}
            {/*        <Outlet />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
