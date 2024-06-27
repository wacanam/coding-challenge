import BookCard from '@/components/BookCard';
import Each from '@/components/Each';
import AddBook from '../../components/AddBook';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Notes() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  
  const { data: books } = await supabase.from("book").select().order("id", {ascending: false});

  return (
    <div className='flex-1 max-w-4xl px-4'>
      <h1 className='sr-only'>Books</h1>
      <div className='flex justify-between my-5'>
        <h2 className='text-2xl font-bold'>Books</h2>
        <AddBook />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 '>
        <Each 
          of={books ?? []}
          render={(book, index) => {
            return (
              <BookCard 
                key={book.id} book={book} 
                style={{
                  animation: `slideIn 0.5s ease-in forwards`,
                  animationDelay: `${index * 0.1}s`
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

