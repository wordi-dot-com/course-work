import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormHelperText, Link, Typography } from "@mui/material"

export interface EmailRegistrationInputProps {
    error?: string
    onChange?: CheckboxProps["onChange"]
}


export default function EmailRegistrationCheckbox({ error, onChange }: EmailRegistrationInputProps) {
    return ( 
        <FormControl error={!!error}>
            <FormHelperText sx={{m: 0}}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked onChange={onChange} required color={error ? "error" : "primary"} />} label={
                        <Typography variant="subtitle2">I agree to <Link href="#" color={error ? "error" : "inherit"}>Wordi Terms</Link> and <Link href="#" color={error ? "error" : "inherit"}>Privacy Policy</Link>.</Typography>
                    } />
                </FormGroup>
            </FormHelperText>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}