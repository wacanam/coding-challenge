"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, ...props }: InputProps) {
    const { id } = props;
    return <div>
        <label htmlFor={id} className="text-gray-500">{label}</label>
        <input {...props} className="rounded-md border-2 focus:ring-2 border-slate-300 w-full px-2 py-2 focus:outline-none focus:border-blue-400 transition-colors" />
    </div>;
}
