"use client";

import { BookType } from '@/types/Book.type';

import { useSupabase } from "@/hooks/useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBook = () => {
    const queryClient = useQueryClient();

    const supabase = useSupabase();

    const addBook = async (payload: Omit<BookType, "id">) => {
        const { data, error } = await supabase.from("book").insert(payload).single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    return useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books"]
            });
        }
    });
}