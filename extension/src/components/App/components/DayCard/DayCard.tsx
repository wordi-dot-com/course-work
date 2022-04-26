
import {Stack, Typography} from "@mui/material";
import WordCard from "../WordCard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Word } from "../../../../types";

dayjs.extend(relativeTime)

interface DayCardProps {
    date: string,
    words: Word[]
}

export  default function DayCard ({date, words}: DayCardProps) {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">{dayjs(date).fromNow()}</Typography>
            {words.map((word) => (
                <WordCard word={word}/>
            ))}
        </Stack>
    )
}
