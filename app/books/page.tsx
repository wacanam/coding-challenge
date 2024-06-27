import BookCard from '@/components/BookCard';
import Each from '@/components/Each';
import AddBook from '../../components/AddBook';
import { useSupabase } from '@/hooks/useSupabase';

export default async function Notes() {
  const supabase = useSupabase()

  const { data: books } = await supabase.from("book").select().order("id", {ascending: false});

  const addBookAction = async () => {
    "use server";
    // delay for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Added");
  }
  
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
          render={(book) => {
            return (
              <BookCard key={book.id} book={book} />
            )
          }}
        />
      </div>
    </div>
  )
}

