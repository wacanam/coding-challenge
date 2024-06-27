"use client";


import { useSupabase } from "@/hooks/useSupabase";
import { BookType } from "@/types/Book.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBook = () => {

    const queryClient = useQueryClient();
    const supabase = useSupabase();

    const updateBook = async (payload: BookType) => {
        const {id , ...res} = payload;

        const {error} = await supabase.from("book").update({...res}).eq("id", id);
        if (error) {
            throw new Error(error.message);
        }
        return updateBook
    };
    
    return useMutation({
        mutationFn: (payload: BookType) => updateBook(payload),
        onMutate: async (payload) => {
            await queryClient.cancelQueries({
                queryKey: ["books"]
            });
            const previousValue = queryClient.getQueryData(["books"]);
            queryClient.setQueryData(["books"], (old: any) => {
                return old?.map?.((book: any) => {
                    if (book.id === payload.id) {
                        return {
                            ...book,
                            title: payload.title
                        }
                    }
                    return book;
                });
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
    });
}