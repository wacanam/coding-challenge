import { useSupabase } from '@/hooks/useSupabase';
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
    const supabase = useSupabase();
    
    const getBooks = async () => supabase.from('book').select('*').order('id', { ascending: false });

    return useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
    });
    
}