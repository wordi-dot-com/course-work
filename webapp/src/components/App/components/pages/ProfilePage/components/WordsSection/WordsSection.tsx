import BaseSection from "../BaseSection";
import {useCallback, useContext, useMemo} from "react";
import groupBy from "../../../../../../../util/groupBy";
import DayCard from "./components/DayCard";
import useWords from "../../../../../../../hooks/useWords";

export default function WordsSection() {
    const [snapshot, loading, err] = useWords()

    const groupedWords = useMemo(() => {
        return groupBy(
            snapshot?.docs.map(doc => doc.data()) || [],
                x => x.dateAdded
            )
    }, [snapshot])

    return (
        <BaseSection title="Your vocabulary" subTitle={`${snapshot?.docs.length || 0} words`}>
            {groupedWords.map((group) => (
                <DayCard date={group.key} words={group.elements}/>
            ))}
        </BaseSection>
    )
}
