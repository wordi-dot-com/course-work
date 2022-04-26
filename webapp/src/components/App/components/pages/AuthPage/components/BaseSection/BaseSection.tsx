import { Stack, Typography } from "@mui/material";

export interface BaseSectionProps {
    title?: React.ReactNode
    children?: React.ReactNode
}

export default function BaseSection({ title, children }: BaseSectionProps) {
    return (
        <Stack alignItems="stretch" spacing={4}>
            <Typography variant="h4" align="center" sx={{whiteSpace: 'pre-line'}}>{title}</Typography>
            {children}
        </Stack>
    )
}