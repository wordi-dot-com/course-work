import BaseSection from "../BaseSection";
import LearnCard from "./components/LearnCard";
import {useContext, useMemo} from "react";
import {FirebaseContext} from "../../../../../../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, CollectionReference, setDoc} from "firebase/firestore";
import {Word} from "../../../../../../../types";
import {useCollection} from "react-firebase-hooks/firestore";
import useWords from "../../../../../../../hooks/useWords";

export default function LearnSection() {
    const [snapshot, loading, err] = useWords()

    return (
        <BaseSection title="Today" subTitle={`${snapshot?.docs.length || 0} words to learn`}>
            {snapshot?.docs.map(wordDoc => {
                const incrementScore = async () => {
                    const was = wordDoc.data()?.score;
                    // @ts-ignore
                    await setDoc(wordDoc.ref, {score: was + 1}, {merge: true})
                }

                return <LearnCard word={wordDoc.data()} onConfirmRemember={incrementScore}/>
            })}
        </BaseSection>
    )
}
