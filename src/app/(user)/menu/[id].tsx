import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize, Product } from '@/src/types';
import { useProduct } from '@/src/api/products';
import RemoteImage from '@/src/components/RemoteImage';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

export default function ProductDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  if (idString === undefined) {
    // Handle the case where idString is undefined
    console.error('idString is undefined');
    return null;
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  // Ensure useProduct is properly typed
  const {
    data: product,
    error,
    isLoading,
  } = useProduct(id) as {
    data: Product | undefined;
    error: any;
    isLoading: boolean;
  };

  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const { addItem } = useCart();

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch Products</Text>;
  }

  if (!product) {
    return <Text>Product not found :(</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage style={styles.image} path={product.image} fallback={defaultPizzaImage} />

      <Text>Select size</Text>

      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' },
            ]}
          >
            <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: '20%',
    aspectRatio: 2 / 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
});
