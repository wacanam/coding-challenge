import AddBook from '../../components/AddBook';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { BookList } from './BookList';

export default async function Notes() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  
  // const { data: books } = await supabase.from("book").select().order("id", {ascending: false}); // Directly fetch from the server
  
  return (
    <div className='flex-1 max-w-4xl px-4'>
      <h1 className='sr-only'>Books</h1>
      <div className='flex justify-between my-5'>
        <h2 className='text-2xl font-bold'>Books</h2>
        <AddBook />
      </div>
      <BookList/>
    </div>
  )
}


