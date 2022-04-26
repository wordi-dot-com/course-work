import {useContext, useMemo} from "react";
import {FirebaseContext} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {doc, DocumentReference, DocumentSnapshot} from "firebase/firestore";
import {UserData} from "../types";
import {useDocument} from "react-firebase-hooks/firestore";

export default (): [DocumentSnapshot<UserData>, boolean, any] => {
    const {auth, firestore} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    const userDataDocRef = useMemo(() => doc(firestore, `user-data/${user?.uid}`) as DocumentReference<UserData>, [user]);
    const [snapshot, loading, err] = useDocument(userDataDocRef)

    // @ts-ignore
    return [snapshot, loading, err]
}
