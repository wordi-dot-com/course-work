import {Auth, AuthError, AuthProvider, CustomParameters, signInWithPopup, UserCredential} from "firebase/auth";
import {useMemo, useState} from "react";

export default function (
    auth: Auth,
    createProvider: (
        scopes?: string[],
        customOAuthParameters?: CustomParameters
    ) => AuthProvider
) {
    const [error, setError] = useState<AuthError>();
    const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
    const [loading, setLoading] = useState<boolean>(false);

    const signInWithGoogle = async (
        scopes?: string[],
        customOAuthParameters?: CustomParameters
    ) => {
        setLoading(true);
        setError(undefined);
        try {
            const provider = createProvider(scopes, customOAuthParameters);
            const user = await signInWithPopup(auth, provider);
            setLoggedInUser(user);
        } catch (err) {
            setError(err as AuthError);
        } finally {
            setLoading(false);
        }
    };

    return [
        signInWithGoogle,
        loggedInUser,
        loading,
        error,
    ];
};
