"use client";

import React from "react";
import ActionButton from "./ActionButton";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { revalidatePath } from "@/actions/cache.action";

interface DeleteBookProps {
    id: number;
    title: string;
}

export const DeleteBook = ({id, title}: DeleteBookProps) => {

    const action = async () => {
        const deleteBook = async () => {
            const {error} = await supabase.from("book").delete().eq("id", id);
            if (error) {
                throw new Error(error.message);
            }
            
        };
        toast.promise(deleteBook, {
            loading: `Deleting book ${title}...`,
            success: () => {
                revalidatePath("/books", "page");
                return `${title} Book deleted successfully`
            },
            error: (error) => `Failed to delete book, ERROR: ${error.message}`
        })
    };

    return (
        <form action={action} className="flex justify-end">
            <ActionButton className="disabled:bg-gray-300 bg-red-400 text-white hover:bg-red-300 transition-colors px-3 py-2 rounded-lg" >Delete</ActionButton>
        </form>
    );
};
