import { Box, Button, Container, FormControl, FormHelperText, Link, Stack, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import EmailAuthInput from "../../../EmailAuthInput";

export interface EmailLoginErrors {
    email?: string,
    password?: string
}

export interface EmailLoginInternalErrors extends EmailLoginErrors {
}

export interface EmailLoginSubmitArgs {
    email: string
    password: string
}

export interface EmailLoginProps {
    onSubmit?: (args: EmailLoginSubmitArgs) => void
    errors?: EmailLoginErrors
}


export default function EmailLogin({ onSubmit, errors }: EmailLoginProps) {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const onClickHandler = useCallback(() => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!(email && password)) {
            // TODO: MAKE NORMAL!!!
            return
        }
        
        onSubmit && onSubmit({ email, password })
    }, [onSubmit])

    const displayedErrors = {
        ...errors
    }


    return (
        <Stack spacing={3}>
            <Typography variant="subtitle2">or use your email to login:</Typography>
            <Stack spacing={1}>
                <EmailAuthInput inputRef={emailRef} label="Email" required error={displayedErrors.email} />
                <Stack>
                    <EmailAuthInput inputRef={passwordRef} label="Password" type="password" required error={displayedErrors.password} />
                    <FormControl>
                        <FormHelperText><Link href="#" color="inherit">Forgot the password?</Link></FormHelperText>
                    </FormControl>
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Button onClick={onClickHandler} variant="contained" size="large" fullWidth>
                    Log in
                </Button>
                <Typography variant="subtitle2" alignSelf="center">Don't have an account? <Link href="#" color="inherit">Register here</Link></Typography>
            </Stack>
        </Stack>
    )
}