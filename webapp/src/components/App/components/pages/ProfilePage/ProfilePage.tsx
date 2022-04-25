import { Box, Container, Grid, Paper, Stack, useMediaQuery, useTheme} from "@mui/material";
import NewsMagazine from "./components/NewsMagazine";
import ProfileSectionsMenu from "./components/ProfileSectionsMenu";
import {Outlet, Route, Routes, useLocation} from "react-router-dom";
import React, {PropsWithChildren} from "react";

export type ProfilePageProps = PropsWithChildren<{}>

export default function ProfilePage({children}: ProfilePageProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    return (
        <Box sx={{ bgcolor: theme.palette.background.paper, mb: 8, pt: 10, [theme.breakpoints.down('md')]: { pt: 0 } }} >
            <Grid container rowSpacing={2}>
                <Grid item xs={12} md={3}>
                    <Container sx={{ overflowX: "auto" }}>
                        <Box sx={{ position: isMobile ? "initial" : "fixed",  }}>
                            <ProfileSectionsMenu />
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Container maxWidth="md">
                        <Outlet/>
                    </Container>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Container sx={{ mt: isMobile ? 4 : 8 }}>
                        <NewsMagazine />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}
