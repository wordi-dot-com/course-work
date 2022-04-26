import { Button, Link, Stack, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import EmailRegistrationCheckbox from "./components/EmailRegistrationCheckbox";
import EmailAuthInput from "../../../EmailAuthInput";

export interface EmailRegistrationErrors {
    email?: string,
    password?: string
}

export interface EmailRegistrationInternalErrors extends EmailRegistrationErrors {
    repeatPassword?: string
    termsAgree?: string
}

export interface EmailRegistrationSubmitArgs {
    email: string
    password: string
}

export interface EmailRegistrationProps {
    onSubmit?: (args: EmailRegistrationSubmitArgs) => void
    errors?: EmailRegistrationErrors
}

export default function EmailRegistration({ onSubmit, errors } : EmailRegistrationProps) {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const repeatPasswordRef = useRef<HTMLInputElement>();

    let [termsAgree, setTermsAgree] = useState(false);

    const [internalErrors, setInternalErrors] = useState<EmailRegistrationInternalErrors>({});
    const updateInternalErrors = useCallback((updatedInternalErrors?: EmailRegistrationInternalErrors) => setInternalErrors({ ...internalErrors, ...updatedInternalErrors }), [internalErrors])

    const onClickHandler = useCallback(() => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const repeatPassword = repeatPasswordRef.current?.value;

        if(!(email && password && password === repeatPassword)) {
            // TODO: MAKE NORMAL!!!
            return
        }

        if(!termsAgree) {
            updateInternalErrors({ termsAgree: "You must agree first." })
            return
        }

        onSubmit && onSubmit({ email, password })
    }, [onSubmit, updateInternalErrors, termsAgree])



    const onEmailBlur = () => {
        const value = emailRef.current?.value;

        updateInternalErrors({ email: undefined })
    }

    const onPasswordBlur = () => {
        const value = passwordRef.current?.value;

        updateInternalErrors({ password: undefined })
    }

    const onRepeatPasswordBlur = () => {
        const value = repeatPasswordRef.current?.value;

        if (value !== passwordRef.current?.value) {
            updateInternalErrors({repeatPassword: "Is not equal to password"})
        }

        updateInternalErrors({ repeatPassword: undefined })
    }

    const onTermsAgreeChange = (_: any, checked: boolean) => {
        setTermsAgree(checked)
        if(checked) {
            updateInternalErrors({ termsAgree: undefined })
        }
    }

    const displayedErrors = {
        ...errors,
        ...internalErrors
    }

    // required error variant="filled" color="error"

    return (
        <Stack spacing={1}>
            <Stack spacing={3}>
                <Typography variant="subtitle2">or use your email to register:</Typography>
                <Stack spacing={1}>
                    <EmailAuthInput inputRef={emailRef} label="Email" required error={displayedErrors.email} onBlur={onEmailBlur} />
                    <EmailAuthInput inputRef={passwordRef} label="Password" type="password" required error={displayedErrors.password} onBlur={onPasswordBlur} />
                    <EmailAuthInput inputRef={repeatPasswordRef} label="Repeat password" type="password" required error={displayedErrors.repeatPassword} onBlur={onRepeatPasswordBlur} />
                </Stack>
            </Stack>
            <EmailRegistrationCheckbox error={displayedErrors.termsAgree} onChange={onTermsAgreeChange}/>
            <Stack alignItems="center" spacing={1}>
            <Button onClick={onClickHandler} variant="contained" size="large" fullWidth>
                Get started now
            </Button>
                <Typography variant="subtitle2">Already have an account? <Link href="#" color="inherit">Login here</Link></Typography>
            </Stack>

        </Stack>
    )
}
