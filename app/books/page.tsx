import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
  const supabase = createClient();
  const { data: books } = await supabase.from("book").select();

  return <pre>{JSON.stringify(books, null, 2)}</pre>
}