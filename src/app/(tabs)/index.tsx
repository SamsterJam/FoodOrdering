import { View, FlatList} from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItem';

export default function TabOneScreen() {
  return (
      <FlatList 
        data={products}
        renderItem={({ item }) => <ProductListItem product={item}/>}
      />
  );
}

