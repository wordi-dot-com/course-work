import { Chip, Stack, Typography } from "@mui/material";
import ScoreProgress from "../../../ScoreProgress";
import WordCardTranslation from "./components/WordCardTranslation";
import {Word} from "../../../../../../../../../types";

export interface WordCardProps {
    word?: Word
}

export default function WordCard({ word } : WordCardProps) {
    return (
        <Stack direction="row" spacing={2} alignItems="center" maxWidth="80%" flexWrap="wrap">
            <ScoreProgress score={word?.score} />
            <WordCardTranslation word={word?.word} primary />
            {word?.translations.map(tr => (
                <WordCardTranslation word={tr} />
            ))}
        </Stack>
    )
}
