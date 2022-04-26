import { Box, Card, CardActions, CardContent, CardMedia, Chip, Container, FormControlLabel, FormGroup, Skeleton, Stack, Switch, Typography } from "@mui/material";
import {useCallback, useContext, useMemo} from "react";
import { collection, doc, DocumentReference, setDoc } from "firebase/firestore";
import useUserData from "../../../../../../../hooks/useUserData";
import {FirebaseContext} from "../../../../../../../index";
import {UserData} from "../../../../../../../types";
import {useAuthState} from "../../../../../../../hooks/useAuthState";

export default function ExercisesSection() {
    const {auth, firestore} = useContext(FirebaseContext);
    const [user] = useAuthState();
    // @ts-ignore
    const userDataDocRef = useMemo(() => doc(firestore, `user-data/${user?.uid}`) as DocumentReference<UserData>, [user]);
    const [snapshot, loading, err] = useUserData()

    const toggleHighlighting = useCallback(() => {
        const was = snapshot?.data()?.settings?.highlighting;
        setDoc(userDataDocRef, {settings: {highlighting: !was}}, {merge: true, mergeFields: ["settings"]})
    }, [snapshot, userDataDocRef])

    // TODO: add to onClick somewhere
    const toggleThreeSteps = useCallback(() => {
        const was = snapshot?.data()?.settings?.threeSteps;
        setDoc(userDataDocRef, {settings: {threeSteps: !was}}, {merge: true, mergeFields: ["threeSteps"]})
    }, [snapshot, userDataDocRef])

    const isHighlightingActive = snapshot?.data()?.settings?.highlighting;

    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <Typography variant="h3" fontWeight="bold">Exercises</Typography>
                <Typography variant="h6">2 exercises</Typography>
            </Stack>
            <Card raised sx={{ borderRadius: 5 }}>
                <Skeleton variant="rectangular" width="100%" height={280}  animation="wave" />
                <Container sx={{ my: 1 }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5" fontWeight="bold">Simple repetition</Typography>
                            <Typography variant="h6" maxWidth="90%" >Reminders
                                about the words you are studying appear in the feed with some frequency.

                                A random reminder, with a short break in the study,
                                allows you to effectively memorize words.</Typography>
                        </Stack>
                        <Box mt={8} mb={3}>
                            <Typography variant="h6" sx={{ opacity: 0.5 }}>The main exercise. Always active</Typography>
                        </Box>
                    </CardContent>
                </Container>
            </Card>
            <Card raised sx={{ borderRadius: 5 }}>
                <Skeleton variant="rectangular" width="100%" height={280}  animation="wave" />
                <Container sx={{ my: 1 }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5" fontWeight="bold">Highlight in other contexts</Typography>
                            <Typography variant="h6" maxWidth="90%" >Word will highlight your studied words on other sites.
                                This way you will be able to pay attention to these words in other contexts
                                and it is easier to remember the translation.</Typography>
                        </Stack>
                        <Box mt={8} mb={3}>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={isHighlightingActive} onClick={toggleHighlighting} />} label={isHighlightingActive ? "Active" : "Inactive"} />
                            </FormGroup>
                        </Box>
                    </CardContent>
                </Container>
            </Card>
        </Stack>
    )
}
