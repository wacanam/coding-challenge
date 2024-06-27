"use client";

import { useSupabase } from "@/hooks/useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteBook = () => {
    const queryClient = useQueryClient();
    const supabase = useSupabase();

    const deleteBook = async (id: number) => {
        const {error} = await supabase.from("book").delete().eq("id", id);
        if (error) {
            throw new Error(error.message);
        }
        return deleteBook;
    }

    return useMutation({
        mutationFn: (id: number) => deleteBook(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({
                queryKey: ["books"]
            });
            const previousValue = queryClient.getQueryData(["books"]);
            queryClient.setQueryData(["books"], (old: any) => {
                return old?.filter?.((book: any) => book.id !== id);
            });
            return {previousValue};
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(["books"], context?.previousValue);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["books"]
            });
        }
    })
};