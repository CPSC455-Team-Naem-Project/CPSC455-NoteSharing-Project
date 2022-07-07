import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.scss';
import {initializeApp} from "firebase/app";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NoteUploadPage from "./components/NoteUploadPage";
import {HomeComponents} from "./pages/Home/MenuItems";
import {MENU} from "./pages/Home/MenuSlice";

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
                    <Route index element={<NoteUploadPage />} />
                    {
                        (Object.keys(HomeComponents) as unknown as MENU[])
                            .map(homeCompKey => {
                                const menuData = HomeComponents[homeCompKey];
                                const Component = menuData.component;
                                return (
                                    <Route key={menuData.link} index={menuData.default} path={menuData.link} element={<Component />}/>
                                )
                            })
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
