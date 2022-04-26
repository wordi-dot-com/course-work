import { Container, Stack } from "@mui/material";
import AuthServices from "../AuthServices";
import BaseSection from "../BaseSection";
import EmailLogin from "./components/EmailLogin";
import {useNavigate} from "react-router-dom";
import useSignInWithEmailAndPassword from "../../../../../../../hooks/useSignInWithEmailAndPassword";

export default function LoginSection() {
    const [signIn] = useSignInWithEmailAndPassword();
    const navigate = useNavigate();

    return (
        <BaseSection title="Welcome back!">
            <Stack spacing={1}>
                <AuthServices />
                <EmailLogin onSubmit={async ({email, password}) => {
                    // @ts-ignore
                    await signIn(email, password)
                        .then(() => navigate("/"))
                }}/>
            </Stack>
        </BaseSection>
    )
}
