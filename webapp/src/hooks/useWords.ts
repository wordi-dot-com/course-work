import {useCollection} from "react-firebase-hooks/firestore";
import {useContext, useMemo} from "react";
import {FirebaseContext} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, CollectionReference, QuerySnapshot} from "firebase/firestore";
import {Word} from "../types";

export default (): [QuerySnapshot<Word>, boolean, any] => {
    const {auth, firestore} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);
    const wordsCollectionRef = useMemo(() => collection(firestore, `user-data/${user?.uid}/words`) as CollectionReference<Word>, [user]);
    const [snapshot, loading, err] = useCollection(wordsCollectionRef)

    // @ts-ignore
    return [snapshot, loading, err]
}
