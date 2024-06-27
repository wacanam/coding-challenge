"use client";

import React from "react";
import ActionButton from "./ActionButton";
import { toast } from "sonner";
import { revalidatePath } from "@/actions/cache.action";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { useSupabase } from "@/hooks/useSupabase";
import { useUpdateBook } from "@/queries/useUpdateBook";

interface UpdateBookProps {
    book: {
        id: number;
        title: string;
        author: string;
        genre: string;
        publishedDate: string;
    }
}

export const UpdateBook = ({book: {id, title, author, genre, publishedDate}}: UpdateBookProps) => {
    // const supabase = useSupabase()
    const { mutateAsync } = useUpdateBook();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    // const action = async (formData: FormData) => {
    //     const title = formData.get("title") as string;
    //     const author = formData.get("author") as string;
    //     const genre = formData.get("genre") as string;
    //     const publishedDate = formData.get("publishedDate") as string;
        
    //     const updateBook = async () => {
    //         const {error} = await supabase.from("book").update({title, author, genre, publishedDate }).eq("id", id);
    //         if (error) {
    //             throw new Error(error.message);
    //         }
    //     }
    //     toast.promise(updateBook, {
    //         loading: `Updating book ${title}...`,
    //         success: () => {
    //             revalidatePath("/books", "page");
    //             handleCloseModal();
    //             return `${title} Book updated successfully`
    //         },
    //         error: (error) => `Failed to delete book, ERROR: ${error.message}`
    //     })
    // };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;
        const publishedDate = formData.get("publishedDate") as string;

        toast.promise(mutateAsync({id, title, author, genre, publishedDate}), {
            loading: `Updating book ${title}...`,
            success: () => {
                // revalidatePath("/books", "page");
                handleCloseModal();
                return `${title} Book updated successfully`
            },
            error: (error) => `Failed to update book, ERROR: ${error.message}`
        })
    }


    const formattedDate = new Date(publishedDate).toISOString().split("T")[0];

    return (
        <>
            <button onClick={handleOpenModal} type="button" className="disabled:bg-gray-300 bg-slate-300 text-black hover:bg-slate-200 transition-colors px-3 py-2 rounded-lg" >Edit</button>
            <Modal label="Update Book" isOpen={isOpen} onClose={handleCloseModal}>
                <form 
                    // action={action}
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-end min-w-[400px]">
                    <div className="space-y-4 my-5">
                        <Input label="Title" type="text" defaultValue={title} name="title"/>
                        <Input label="Author" type="text" defaultValue={author} name="author"/>
                        <Input label="Genre" type="text" defaultValue={genre} name="genre"/>
                        <Input label="Published Date" type="date" defaultValue={formattedDate} name="publishedDate"/>
                    </div>
                    <div className="flex justify-end gap-5 items-center mt-5">
                        <button type="button" onClick={handleCloseModal}>Cancel</button>
                        <ActionButton className="disabled:bg-gray-300 bg-blue-400 text-white hover:bg-blue-300 transition-colors px-3 py-2 rounded-lg" >Save Changes</ActionButton>
                    </div>
                    </form>
            </Modal>
        </>
    );
};
