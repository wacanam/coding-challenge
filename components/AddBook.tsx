"use client";

import React from "react";
import { toast } from "sonner";
import { revalidatePath } from "@/actions/cache.action";
import ActionButton from "@/components/ActionButton";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useAddBook } from "@/queries/useAddBook";
import { useSupabase } from "@/hooks/useSupabase";

interface AddBookProps {}

export default function AddBook(props: AddBookProps){
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
    const { mutateAsync, isPending } = useAddBook();
    // const supabase = useSupabase()

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

    //     const addBook = async () => {
    //         const {error} = await supabase.from("book").insert([{title, author, genre, publishedDate }]);
    //         if (error) {
    //             throw new Error(error.message);
    //         }
    //     }
    //     toast.promise(addBook, {
    //         loading: `Adding book ${title}...`,
    //         success: () => {
    //             revalidatePath("/books", "page");
    //             if(formRef.current) formRef.current.reset();
    //             handleCloseModal();
    //             return `${title} Book added successfully`
    //         },
    //         error: (error) => `Failed to add book, ERROR: ${error.message}`
    //     })
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formRef.current) {
            
            const formData = new FormData(formRef.current);
            const title = formData.get("title") as string;
            const author = formData.get("author") as string;
            const genre = formData.get("genre") as string;
            const publishedDate = formData.get("publishedDate") as string;
            const payload = {title, author, genre, publishedDate};

            toast.promise(mutateAsync(payload), {
                loading: `Adding book ${title}...`,
                success: () => {
                    revalidatePath("/books", "page");
                    if(formRef.current) formRef.current.reset();
                    handleCloseModal();
                    return `${title} Book added successfully`
                },
                error: (error) => `Failed to add book, ERROR: ${error.message}`
            })
        }
    }

    return (
        <>
            <button onClick={handleOpenModal} type="button" className="disabled:bg-gray-300 bg-blue-300 text-white hover:bg-blue-200 transition-colors px-3 py-2 rounded-lg" >New Book</button>
            <Modal label="New Book" isOpen={isOpen} onClose={handleCloseModal}>
                <form 
                ref={formRef}
                //  action={action} 
                 onSubmit={handleSubmit}
                 className="flex flex-col justify-end min-w-[400px]">
                    <div className="space-y-4 my-5">
                        <Input label="Title" type="text" name="title"/>
                        <Input label="Author" type="text"name="author"/>
                        <Input label="Genre" type="text" name="genre"/>
                        <Input label="Published Date" type="date" name="publishedDate"/>
                    </div>
                    <div className="flex justify-end gap-5 items-center mt-5">
                        <button type="button" onClick={handleCloseModal}>Cancel</button>
                        <ActionButton disabled={isPending} className="disabled:bg-gray-300 bg-blue-400 text-white hover:bg-blue-300 transition-colors px-3 py-2 rounded-lg" >Add Book</ActionButton>
                    </div>
                    </form>
            </Modal>
        </>
    );
};
