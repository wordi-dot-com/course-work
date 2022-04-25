import {
    Auth,
    AuthError,
    createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';
import {useContext, useMemo, useState} from 'react';
import {FirebaseContext} from "../index";

export default () => {
    const {auth} = useContext(FirebaseContext);

    const [error, setError] = useState<AuthError>();
    const [registeredUser, setRegisteredUser] = useState<UserCredential>();
    const [loading, setLoading] = useState<boolean>(false);

    const createUserWithEmailAndPassword = async (
        email: string,
        password: string
    ) => {
        setLoading(true);
        setError(undefined);
        try {
            const user = await firebaseCreateUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setRegisteredUser(user);
        } catch (error) {
            setError(error as AuthError);
        } finally {
            setLoading(false);
        }
    };

    return [
        createUserWithEmailAndPassword,
        registeredUser,
        loading,
        error,
    ];
};
