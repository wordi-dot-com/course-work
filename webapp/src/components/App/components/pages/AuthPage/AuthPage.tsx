import { Box, Container, Stack } from "@mui/material";
import React, {} from "react";
import {
    useNavigate,
    Outlet
} from "react-router-dom";

export default function AuthPage() {

    const navigate = useNavigate();

    return (
        <Container maxWidth="xs">
            <Stack justifyContent="space-between" height="70vh">
                <Box />
                <Outlet/>
                <Box mb={1} />
            </Stack>

            {/* <Typography variant="subtitle2" align="center">Signed in for user with id={user?.uid} and email={user?.email}</Typography>
            <Button onClick={() => signOut(auth)} variant="contained" size="large" fullWidth>
                Logout
            </Button>
            <Button variant="contained" size="large" fullWidth
                    onClick={async () => {
                        await addDoc<Word>(wordsCollectionRef, {
                            word: "capabilities",
                            translation: "возможности",
                            dateAdded: new Date(),
                            learnRate: LearnRate.GREY
                        })
                    }}
            >AddWord</Button>*/}
        </Container>
    )
}
