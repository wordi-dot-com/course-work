import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import CssBaseline from '@mui/material/CssBaseline';
import AppToolbar from './components/AppToolbar';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './theme';
import {initializeApp, FirebaseApp} from "firebase/app";
import {getAuth, Auth, setPersistence, browserLocalPersistence} from "firebase/auth";
import {getFirestore, Firestore} from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyDhKGqB-opMYYP028Rv9QWZFFMUxRiRwIg",
    authDomain: "wordi-dcc9f.firebaseapp.com",
    projectId: "wordi-dcc9f",
    storageBucket: "wordi-dcc9f.appspot.com",
    messagingSenderId: "505074281800",
    appId: "1:505074281800:web:416a4ce1dd3b8643ad577d",
    measurementId: "G-RDXKV4XRMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

setPersistence(auth, browserLocalPersistence)

type FirebaseContextType = {
    app: FirebaseApp,
    auth: Auth,
    firestore: Firestore
}

const initialContext: FirebaseContextType = { app, auth, firestore };

export const FirebaseContext = createContext<FirebaseContextType>(initialContext);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <FirebaseContext.Provider value={initialContext} >
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme/>
                    <AppToolbar/>
                    <App/>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    </FirebaseContext.Provider>
);
