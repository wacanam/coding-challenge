import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { DeleteBook } from "./DeleteBook";
import { UpdateBook } from "./UpdateBook";

interface BookCardProps {
    style?: React.CSSProperties;
    book: {
        id: number;
        title: string;
        author: string;
        genre: string;
        publishedDate: string;
    }
}

export default function BookCard({ book, style}: BookCardProps) {
    const {id, title, author, genre, publishedDate} = book;
    const [applyStyle, setApplyStyle] = useState(true);
    const cardRef = useRef<HTMLDivElement | null>(null); // Ref to access the DOM element
    
    useEffect(() => {
        const card = cardRef.current;
        if (card) {
          const handleAnimationEnd = () => {
            setApplyStyle(false); // Remove style after animation ends
          };
    
          card.addEventListener('animationend', handleAnimationEnd);
    
          // Cleanup to remove the event listener
          return () => {
            card.removeEventListener('animationend', handleAnimationEnd);
          };
        }
      }, []);

    return (
        <div 
        style={applyStyle ? style : {}}
        ref={cardRef}
          className=" group/actions shadow-lg max-w-[300px] rounded-lg overflow-hidden ">
            <Image src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="book" width={500}  height={500} className=" w-full object-cover aspect-square bg-red-300 overflow-hidden " />
            <div className="flex-1 p-3">
                <div className="flex-1 space-y-3 mt-2">
                    <div className="line-clamp-2">
                        {title}
                    </div>
                    <p className="italic text-slate-500 text-sm">
                        {new Date(publishedDate).toDateString()}
                    </p>
                    <div className="flex gap-2 items-center">
                        <span>{author}</span>
                        <span className="bg-slate-300 px-2 rounded-full truncate max-w-32">{genre}</span>
                    </div>   
                </div> 
                <div className=" group-hover/actions:visible transition-all flex gap-2 justify-end my-5">
                    <UpdateBook book={book} />
                    <DeleteBook id={id} title={title} />
                </div>
            </div>
        </div>
    );
}

