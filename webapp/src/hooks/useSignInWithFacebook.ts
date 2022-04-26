import {Auth, CustomParameters, FacebookAuthProvider} from "firebase/auth";
import {useContext} from "react";
import {FirebaseContext} from "../index";
import useSignInWithPopup from "./useSignInWithPopup";

export const useSignInWithFacebook = () => {
    const {auth} = useContext(FirebaseContext);

    const createFacebookAuthProvider = (
        scopes?: string[],
        customOAuthParameters?: CustomParameters
    ) => {
        const provider = new FacebookAuthProvider();
        if (scopes) {
            scopes.forEach((scope) => provider.addScope(scope));
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    };
    return useSignInWithPopup(auth, createFacebookAuthProvider);
};
