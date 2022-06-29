import React from 'react';
import './App.scss';
import './App2.scss';
import Authed from "./components/Authed";
import {ProfileButton} from "./components/ProfileButton/ProfileButton";
import {Home} from "./pages/Home/Home";


function App() {
    return (
        <div className="app-container">
            {
                Array(10).fill(1).map((n, i) =>
                    <div id={'circle' + (i +1)} className="circle"></div>)
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
        </div>
    );
}

export default App;
