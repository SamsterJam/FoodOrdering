import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { supabase } from '@/src/lib/supabase';
import { useProductList } from '@/src/api/products';
import Button from '@/src/components/Button';

export default function TabOneScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 5, padding: 5 }}
      columnWrapperStyle={{ gap: 5 }}
      ListFooterComponent={
        <Button
          text="Sign Out"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
      }
    />
  );
}
