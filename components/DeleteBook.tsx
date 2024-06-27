"use client";

import React from "react";
import ActionButton from "./ActionButton";
import { toast } from "sonner";
import { revalidatePath } from "@/actions/cache.action";
import { useSupabase } from "@/hooks/useSupabase";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBook } from "@/queries/useDeleteBook";

interface DeleteBookProps {
  id: number;
  title: string;
}

export const DeleteBook = ({ id, title }: DeleteBookProps) => {
  // const supabase = useSupabase()
  // const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteBook();

  // const action = async () => {
  //     const deleteBook = async () => {
  //         const {error} = await supabase.from("book").delete().eq("id", id);
  //         if (error) {
  //             throw new Error(error.message);
  //         }

  //     };
  //     toast.promise(deleteBook, {
  //         loading: `Deleting book ${title}...`,
  //         success: () => {
  //             queryClient.invalidateQueries({
  //               queryKey: ["books"]
  //             })
  //             // revalidatePath("/books", "page"); // This is an alternative to the above line
  //             return `${title} Book deleted successfully`
  //         },
  //         error: (error) => `Failed to delete book, ERROR: ${error.message}`
  //     })
  // };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(mutateAsync(id), {
      loading: `Deleting book ${title}...`,
      success: () => {
        return `${title} Book deleted successfully`;
      },
      error: (error) => `Failed to delete book, ERROR: ${error.message}`
    });
  };
  return (
    <form
      // action={action}
      onSubmit={handleSumbit}
      className="flex justify-end"
    >
      <ActionButton className="disabled:bg-gray-300 bg-red-400 text-white hover:bg-red-300 transition-colors px-3 py-2 rounded-lg">
        Delete
      </ActionButton>
    </form>
  );
};
