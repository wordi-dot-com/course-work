import { Stack, Chip, useTheme } from "@mui/material";
import { amber, green, orange, yellow } from "@mui/material/colors";

export interface ScoreProgressProps {
    score?: number
    height?: number
    width?: number
}

export default function ScoreProgress({ score=0, height=8, width=120 }: ScoreProgressProps) {
    const theme = useTheme()
    
    const activeColor = score < 2 ? amber[500] : score === 2 ? orange[500] : green[500]
    const inactiveColor = theme.palette.divider

    return (
        <Stack direction="row" spacing={0.3} justifyContent="stretch" width={width}>
            <Chip sx={{display: "flex", height, bgcolor: score > 0 ? activeColor : inactiveColor, borderRadius: "10px 0 0 10px", width: "100%" }} />
            <Chip sx={{display: "flex", height, bgcolor: score > 1 ? activeColor : inactiveColor, borderRadius: "0", width: "100%" }} />
            <Chip sx={{display: "flex", height, bgcolor: score > 2 ? activeColor : inactiveColor, borderRadius: "0px 10px 10px 0px", width: "100%" }} />
        </Stack>
    )
}