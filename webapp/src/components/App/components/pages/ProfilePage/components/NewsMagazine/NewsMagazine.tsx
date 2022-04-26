import Magazine from "./components/Magazine";
import { Stack, Typography } from "@mui/material";

export default function NewsMagazine() {
    return (
        <Stack spacing={4}>
            <Typography variant="h6">wordi magazine</Typography>
            <Stack spacing={3}>
                <Magazine title="wordi" content="Why are there 3 exercises for each word?"/>
                <Magazine title="learning" content="How to learn 100 new words in 30 days?"/>
                <Magazine title="interview" content='Professor of Linguistics Galina Efstefeeva: "Having learned one word, you know +15 words"'/>
            </Stack>
        </Stack>
    )
}
