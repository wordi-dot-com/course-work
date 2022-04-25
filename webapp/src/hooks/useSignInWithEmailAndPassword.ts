import {
    Auth,
    UserCredential,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    AuthError,
} from 'firebase/auth';
import {useContext, useState} from 'react';
import {FirebaseContext} from "../index";

export default () => {
    const {auth} = useContext(FirebaseContext);

    const [error, setError] = useState<AuthError>();
    const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
    const [loading, setLoading] = useState<boolean>(false);

    const signInWithEmailAndPassword = async (
        email: string,
        password: string
    ) => {
        setLoading(true);
        setError(undefined);
        try {
            const user = await firebaseSignInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setLoggedInUser(user);
        } catch (err) {
            setError(err as AuthError);
        } finally {
            setLoading(false);
        }
    };

    return [
        signInWithEmailAndPassword,
        loggedInUser,
        loading,
        error,
    ];
};
