import { Facebook, Google } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useContext } from "react";
import { FirebaseContext } from "../../../../../../..";
import InputStyledButton from "./components/InputStyledButton";
import {useNavigate} from "react-router-dom";
import {useSignInWithGoogle} from "../../../../../../../hooks/useSignInWithGoogle";
import {useSignInWithFacebook} from "../../../../../../../hooks/useSignInWithFacebook";

export default function AuthServices() {
    const [signInWithGoogle] = useSignInWithGoogle();
    const [signInWithFacebook] = useSignInWithFacebook();
    const navigate = useNavigate();

    return (
        <Stack direction="row" spacing={1}>
            {/* @ts-ignore */}
            <InputStyledButton startIcon={<Google/>} onClick={() => signInWithGoogle().then(() => navigate("/"))} >Google</InputStyledButton>
            {/* @ts-ignore */}
            <InputStyledButton startIcon={<Facebook/>} onClick={() => signInWithFacebook().then(() => navigate("/"))} >Facebook</InputStyledButton>
        </Stack>
    )
}
