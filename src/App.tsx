import React from 'react';
import './App.scss';
import './App2.scss';
import { getAuth} from "firebase/auth";
import {Outlet} from "react-router-dom";
import {ProfileButton} from "./components/ProfileButton/ProfileButton";
import Navbar from './components/Navbar';

import { useSelector } from 'react-redux'
import { defaultOptions } from './constants/courses';
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


           {/*<Navbar options= {defaultOptions}/>*/}
           {/* <div className={'panel-container'}>*/}
           {/*     <div className={'left-panel'}>*/}
           {/*         <h1>Menu</h1>*/}
           {/*         <h1>Feed</h1>*/}
           {/*         <h1>Your Notes</h1>*/}
           {/*     </div>*/}

           {/*     <div className={'main-panel'}>*/}
           {/*         <Outlet />*/}
           {/*     </div>*/}
           {/* </div>*/}
        </div>
    );
}

export default App;
