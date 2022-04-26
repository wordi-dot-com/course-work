import { Apple, Google, PlayCircleOutline } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import InputStyledButton from "../AuthServices/components/InputStyledButton";
import BaseSection from "../BaseSection";

export default function DownloadExtensionSection() { 
    return (
        <BaseSection title={"Download extension\nfor your browser"}>
            <Stack spacing={1}>
                <InputStyledButton startIcon={<Google />} onClick={() => {}} >Install to Chrome</InputStyledButton>
                <InputStyledButton startIcon={<Apple/>} onClick={() => {}} >Install to Safari</InputStyledButton>
            </Stack>
            <Box alignSelf="center"><Button startIcon={<PlayCircleOutline/>} color="inherit" onClick={() => {}}>How it works?</Button></Box>
        </BaseSection>
    )
}