import React, {useContext} from 'react';
import {FirebaseContext} from "../..";
import {useAuthState} from "react-firebase-hooks/auth";
import AuthPage from './components/pages/AuthPage';
import ProfilePage from './components/pages/ProfilePage';
import {
    Routes,
    Route,
    Navigate, useNavigate
} from "react-router-dom";
import LoginSection from "./components/pages/AuthPage/components/LoginSection";
import RegisterSection from "./components/pages/AuthPage/components/RegisterSection";
import DownloadExtensionSection from "./components/pages/AuthPage/components/DownloadExtensionSection";
import WordsSection from "./components/pages/ProfilePage/components/WordsSection";
import LearnSection from "./components/pages/ProfilePage/components/LearnSection";
import ExercisesSection from "./components/pages/ProfilePage/components/ExercisesSection";

export default function App() {

    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    // TODO: if not authed, then path "/" redirects to "/login"

    return (
        <Routes>
            <Route path="/auth" element={ <AuthPage/>} >
                <Route path="login" element={ <LoginSection />} />
                <Route path="register" element={ <RegisterSection />} />
            </Route>
            <Route path="/install" element={ <AuthPage/>}>
                <Route index element={ <DownloadExtensionSection/> } />
            </Route>

            {<Route path="/" element={<ProfilePage />} >
                <Route index element={ <WordsSection/> } />
                <Route path="learn" element={ <LearnSection/> } />
                <Route path="exercises" element={ <ExercisesSection/> } />
            </Route>}
        </Routes>
    );
}
