import { TextField, BaseTextFieldProps } from "@mui/material";
import React from "react";

export interface EmailAuthInputProps {
    label?: React.ReactNode
    type?: BaseTextFieldProps["type"]
    required?: boolean
    error?: string
    inputRef?: BaseTextFieldProps["inputRef"]
    onBlur?: BaseTextFieldProps["onBlur"]
}

export default function EmailAuthInput({ label, type, required, error, inputRef, onBlur }: EmailAuthInputProps) {
    return <TextField 
        variant="outlined" 
        label={label} 
        type={type}
        required={required}

        error={!!error} 
        helperText={error} 

        inputRef={inputRef} 
        onBlur={onBlur} />
}