import { AppBar, Autocomplete, Avatar, Box, Container, Grid, Slide, Stack, TextField, Toolbar, Typography, useScrollTrigger, useTheme } from '@mui/material';
import Logo from "../../assets/logo.svg"
import {useContext} from "react";
import {FirebaseContext} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

export default function AppToolbar() {
    const {auth} = useContext(FirebaseContext);
    const [user, loading] = useAuthState(auth);
    const trigger = useScrollTrigger();

    const theme = useTheme()

    // TODO
    const transp = false


    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="sticky" elevation={transp ? 0 : 4} color="inherit" sx={{ bgcolor: transp ? "transparent" : theme.palette.background.paper }}>
                <Toolbar variant="dense">
                    <Grid container rowSpacing={2}>
                        <Grid item xs md={3}><Typography variant="h4" fontFamily="Martel Sans" fontWeight={900} mt={2} mb={1}>wordi</Typography></Grid>
                        <Grid item xs md={6}>
                            <Stack justifyContent="center" alignItems="center" sx={{height: "100%", width: "100%"}}>
                                {/*<Autocomplete
                                sx={{ mt: 1, mb: 1}}
                                freeSolo
                                disableClearable
                                options={["lol"]}
                                onOpen={() => {

                                  }}
                                  onClose={() => {

                                  }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        variant="outlined"
                                        sx={{ borderRadius: 10 }}
                                        InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        }}
                                    />
                                )}
                                    />*/}
                            </Stack>

                        </Grid>
                        <Grid item xs md={3}>
                            <Stack justifyContent="center" alignItems="end" sx={{height: "100%", width: "100%"}}>
                                <Avatar alt={user?.displayName || "User"} src={user?.photoURL || "path"} />
                            </Stack>
                        </Grid>
                    </Grid>

                    {/*<Box
                        component="img"
                        minHeight={50}
                        my={3}
                        mx={4}
                        src={Logo}
                    />*/}
                </Toolbar>
            </AppBar>
        </Slide>
    );
}
