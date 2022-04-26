import {createTheme} from "@mui/material/styles";

const light = true

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'inter'
        ].join(','),
        
    },
    palette: light ? {
        text: {
            primary: "#2A3A50",
            //secondary: styles.tt,
            //disabled: styles.ttt,
            //hint: styles.tttt,
        },
        background: {
            default: "#FCFCFE"
        }
    } : {
        mode: "dark"
    },
});
