import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import {initializeApp} from "firebase/app";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import A from "./components/A";
import B from "./components/B";
import {Home} from "./pages/Home/Home";
import Welcome from './components/test';
import { element } from 'prop-types';
import Notes from './components/Notes';
import Feed from './components/Feed';
import Search from './components/Search';
import Profile from './components/Profile';
import UploadNotes from './components/UploadNotes';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';


const container = document.getElementById('root')!;
const root = createRoot(container);

const firebaseConfig = {
    apiKey: "AIzaSyD77bItNXnMrKHnWwnAkdj0FEFzql1cztU",
    authDomain: "cpsc455-notes-app.firebaseapp.com",
    projectId: "cpsc455-notes-app",
    storageBucket: "cpsc455-notes-app.appspot.com",
    messagingSenderId: "292570927581",
    appId: "1:292570927581:web:6856d9c57a0f08d10a6634",
    measurementId: "G-NFZNMB8938"
};

initializeApp(firebaseConfig)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/" element={<Welcome />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
