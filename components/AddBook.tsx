"use client";

import React from "react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import { revalidatePath } from "@/actions/cache.action";
import ActionButton from "@/components/ActionButton";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";


interface AddBookProps {
}

export default function AddBook(props: AddBookProps){
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const action = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const author = formData.get("author") as string;
        const genre = formData.get("genre") as string;
        const publishedDate = formData.get("publishedDate") as string;

        const addBook = async () => {
            const {error} = await supabase.from("book").insert([{title, author, genre, publishedDate }]);
            if (error) {
                throw new Error(error.message);
            }
        }
        toast.promise(addBook, {
            loading: `Adding book ${title}...`,
            success: () => {
                revalidatePath("/books", "page");
                if(formRef.current) formRef.current.reset();
                handleCloseModal();
                return `${title} Book added successfully`
            },
            error: (error) => `Failed to add book, ERROR: ${error.message}`
        })
    };

    return (
        <>
            <button onClick={handleOpenModal} type="button" className="disabled:bg-gray-300 bg-blue-300 text-white hover:bg-blue-200 transition-colors px-3 py-2 rounded-lg" >New Book</button>
            <Modal label="New Book" isOpen={isOpen} onClose={handleCloseModal}>
                <form ref={formRef} action={action} className="flex flex-col justify-end min-w-[400px]">
                    <div className="space-y-4 my-5">
                        <Input label="Title" type="text" name="title"/>
                        <Input label="Author" type="text"name="author"/>
                        <Input label="Genre" type="text" name="genre"/>
                        <Input label="Published Date" type="date" name="publishedDate"/>
                    </div>
                    <div className="flex justify-end gap-5 items-center mt-5">
                        <button type="button" onClick={handleCloseModal}>Cancel</button>
                        <ActionButton className="disabled:bg-gray-300 bg-blue-400 text-white hover:bg-blue-300 transition-colors px-3 py-2 rounded-lg" >Add Book</ActionButton>
                    </div>
                    </form>
            </Modal>
        </>
    );
};
