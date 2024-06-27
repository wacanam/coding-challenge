"use client";

import BookCard from '@/components/BookCard';
import Each from '@/components/Each';
import { useBooks } from '@/queries/useBooks';

interface BookListProps {}

export const BookList = ({}: BookListProps) => {
    const { data  } = useBooks();
    const books = data?.data;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 '>
      <Each
        of={books ?? []}
        render={(book, index) => {
          return (
            <BookCard
              key={book.id} book={book}
              style={{
                animation: `slideIn 0.5s ease-in forwards`,
                animationDelay: `${index * 0.1}s`,
                overflow: "visible"
              }} 
              />
          );
        }} 
      />
    </div>
  );
};
