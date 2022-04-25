import { Button, ButtonProps, useTheme } from "@mui/material";

export default function InputStyledButton(props: ButtonProps) {
    const theme = useTheme();

    const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    
    return (
        <Button 
            variant="outlined" 
            size="large" 
            color="inherit" 
            fullWidth
            sx={{textTransform: "none", borderColor: borderColor, ":hover": { borderColor: theme.palette.text.primary }}}
            {...props} />
    )
}