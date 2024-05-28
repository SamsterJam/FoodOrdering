import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { InsertTables } from '@/src/types';
import { useMutation } from '@tanstack/react-query';

export function useInsertOrderItems() {
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newProduct } = await supabase.from('order_items').insert(items).select();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
  });
}
