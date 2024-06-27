"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function ActionButton({children, ...props}: ActionButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button {...props} disabled={pending} >{children}</button>
    );
};
