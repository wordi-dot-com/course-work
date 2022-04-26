import { Card, Container, CardContent, Stack, Box, Typography, Divider, CardActions, Button, useMediaQuery, useTheme, Skeleton } from "@mui/material";
import { useState } from "react";
import Blur from "./components/Blur";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import ScoreProgress from "../../../ScoreProgress";
import {Word} from "../../../../../../../../../types";

dayjs.extend(relativeTime)

export interface LearnCardProps {
    word: Word,
    onConfirmRemember: () => void
}

export default function LearnCard({ onConfirmRemember, word: {word, source, score, dateAdded, translations} } : LearnCardProps) {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.down("lg"))
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const [wordBlurred, setWordBlurred] = useState(true)

    const dateAgo = dateAdded && dayjs(dateAdded).fromNow();

    return (
        <Card raised sx={{ borderRadius: 5 }}>
            <Container sx={{ my: 1 }}>
                <CardContent>
                    <Stack spacing={2} divider={<Divider flexItem />}>
                        {(source.title || source.subtitle) &&
                        <Stack direction="row" height={45} spacing={2} justifyContent="start" alignItems="center">
                            <Box
                                minWidth="10%"
                                height="100%"
                                sx={{
                                    backgroundImage: `url(${JSON.stringify(source.image)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: 2
                                }}
                            />
                            <Box maxWidth="80%">
                                <Typography variant="body2">{source.subtitle}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.4 }}>{source.subtitle}</Typography>
                            </Box>
                        </Stack> }
                        <Stack direction={isTablet ? "column" : "row-reverse"} spacing={2} justifyContent="space-between">
                            <ScoreProgress score={score}/>
                            <Box>
                                {dateAgo && <Typography>You've added the word {dateAgo}.</Typography>}
                                <Typography fontWeight="bold">Do you remember the translation?</Typography>
                            </Box>
                        </Stack>
                        <Box>
                            {<Typography variant="h2" fontWeight="medium">{word || <Skeleton variant="text" width="30%" />}</Typography>}
                            <Blur radius={ wordBlurred ? 5 : 0 } transition="400ms">
                                <Typography variant="h6">{translations.join(', ') || <Skeleton variant="text" width="20%" />}</Typography>
                            </Blur>
                        </Box>
                    </Stack>
                </CardContent>
                <CardActions sx={{ my: 3 }}>
                    <Stack direction={isMobile ? "column" : "row"} spacing={1} width="100%">
                        <Button size="large" variant="contained" sx={{ borderRadius: 5 }} fullWidth={isMobile} onClick={onConfirmRemember}>Yes</Button>
                        <Button size="large" variant="outlined" sx={{ borderRadius: 5 }} fullWidth={isMobile} onClick={() => setWordBlurred(!wordBlurred)}>No, show the word</Button>
                    </Stack>
                </CardActions>
            </Container>
        </Card>
    )
}
