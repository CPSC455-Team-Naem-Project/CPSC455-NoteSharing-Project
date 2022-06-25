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
import {Home} from "./pages/Home/Home";


function App() {
    return (
        <div className="app-container">
          {
            Array(10).fill(10).map((n, i) =>
              <div id={'circle' + (i + 1)} className="circle"></div>)
          }
           <nav>
               <h1 id="title">YouNote</h1>
               <ProfileButton />
           </nav>

          <div className={'panel-container'}>
            <Authed>
              <Home />
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
