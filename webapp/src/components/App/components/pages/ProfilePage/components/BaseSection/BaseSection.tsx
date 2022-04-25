import { Stack, Typography } from "@mui/material";
import {ReactNode} from "react";

export interface BaseSectionProps {
    children?: ReactNode
    title?: ReactNode
    subTitle?: ReactNode
}

export default function BaseSection({ children, title, subTitle } : BaseSectionProps) {
    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <Typography variant="h3" fontWeight="bold">{title}</Typography>
                <Typography variant="h6">{subTitle}</Typography>
            </Stack>
            { children }
        </Stack>
    )
}
