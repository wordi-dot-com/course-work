import {
    Auth,
    AuthError,
    AuthProvider,
    CustomParameters,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
    UserCredential,
} from 'firebase/auth';
import {useContext, useMemo, useState} from 'react';
import useSignInWithPopup from "./useSignInWithPopup";
import {FirebaseContext} from "../index";

export const useSignInWithGoogle = () => {
    const {auth} = useContext(FirebaseContext);

    const createGoogleAuthProvider = (
        scopes?: string[],
        customOAuthParameters?: CustomParameters
    ) => {
        const provider = new GoogleAuthProvider();
        if (scopes) {
            scopes.forEach((scope) => provider.addScope(scope));
        }
        if (customOAuthParameters) {
            provider.setCustomParameters(customOAuthParameters);
        }
        return provider;
    };
    return useSignInWithPopup(auth, createGoogleAuthProvider);
};
