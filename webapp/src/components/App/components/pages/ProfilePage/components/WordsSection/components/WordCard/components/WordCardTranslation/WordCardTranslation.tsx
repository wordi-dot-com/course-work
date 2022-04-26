import { Typography } from "@mui/material";


export interface WordCardTranslationProps {
    word?: string
    primary?: boolean
}

export default function WordCardTranslation({ word, primary }: WordCardTranslationProps) {
    return (
        <Typography variant="h5" fontWeight={primary ?  "bold" : "regular"} sx={{ opacity: primary ? 1 : 0.8 }}>{word}</Typography>
    )
}