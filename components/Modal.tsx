"use client";
import React from "react";

interface ModalProps {
    label: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;

}
export const Modal = ({ isOpen, onClose, children, label }: ModalProps) => {
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
            <div className="bg-white px-10 py-8 rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{label}</h2>
                    <button onClick={onClose} className="text-black font-bold bg-slate-100 px-2 rounded">X</button>
                </div>
                {children}
            </div>
        </div>
    );
};
