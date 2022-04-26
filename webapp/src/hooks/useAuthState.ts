import { onAuthStateChanged } from "firebase/auth";
import {useContext, useEffect} from "react";
import {FirebaseContext} from "../index";
import useLoadingValue from "./useLoadingValue";

export const useAuthState = () => {
    const {auth} = useContext(FirebaseContext);

    const { error, loading, setError, setValue, value } = useLoadingValue(() => auth.currentUser);

    useEffect(() => {
        const listener = onAuthStateChanged(
            auth,
            async (user) => {
                setValue(user);
            },
            setError
        );

        return () => {
            listener();
        };
    }, [auth]);

    return [value, loading, error];
}
