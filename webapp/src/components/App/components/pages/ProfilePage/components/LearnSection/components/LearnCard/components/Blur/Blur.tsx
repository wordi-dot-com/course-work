import { Box } from "@mui/material";
import React from "react";

export interface BlurProps {
    children?: React.ReactNode
    radius?: number
    transition?: string
}

export default function Blur ({ children, radius, transition }: BlurProps) {
	return (
        <Box sx={{ transition: `filter ${(transition || "0s")}`, filter: `blur(${(radius || 0)}px)`, userSelect: !radius ? "auto" : "none"  }}>
            {children}
        </Box>
    )
};
