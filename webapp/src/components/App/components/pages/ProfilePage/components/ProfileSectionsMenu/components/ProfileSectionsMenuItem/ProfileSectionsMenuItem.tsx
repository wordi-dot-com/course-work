import { Badge, Box, Chip, Container, Fade, Link, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";

export interface ProfileSectionsMenuItemProps {
    children?: React.ReactNode
    active?: boolean
    onClick?: () => any
    href?: string
    notificationsCount?: number
}

export default function ProfileSectionsMenuItem({ children, active, href, notificationsCount, onClick } : ProfileSectionsMenuItemProps) {
    const [hover, setHover] = useState(false)

    const theme = useTheme()
    //theme.palette.primary.darkx

    return (
        <Box alignItems="start" >
            <Badge badgeContent={notificationsCount} color="primary" sx={{ mt: 2, pr: 2 }}>
                <Link
                    href={href || "#"}
                    onClick={onClick}
                    color="inherit"
                    underline="none"
                    variant="h4"
                    sx={{ fontWeight: "medium" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    {children}
                    <Fade in={active || hover}>
                        <Box>
                            <Chip sx={{display: "flex", opacity: active ? 0.6 : 0.3, height: 10, mx: 1, position: "relative", top: -12, bgcolor: theme.palette.primary.dark }} />
                        </Box>
                    </Fade>
                </Link>
            </Badge>
        </Box>
    )
}
