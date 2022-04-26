import { Stack } from "@mui/material";
import { useContext } from "react";
import { FirebaseContext } from "../../../../../../..";
import AuthServices from "../AuthServices";
import BaseSection from "../BaseSection";
import EmailRegistration from "./components/EmailRegistration";
import {useNavigate} from "react-router-dom";
import useCreateUserWithEmailAndPassword from "../../../../../../../hooks/useCreateUserWithEmailAndPassword";

export default function RegisterSection() {
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword();
    const navigate = useNavigate();

    return (
        <BaseSection title="Get started">
            <Stack spacing={1}>
                <AuthServices />
                <EmailRegistration onSubmit={async ({ email, password }) => {
                     // @ts-ignore
                    await createUserWithEmailAndPassword(email, password)
                         .then(() => navigate("/"));
                }} />
            </Stack>
        </BaseSection>
    )
}
