import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button from '@components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

export default function ProductDetailsScreen(){
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const product = products.find((p) => p.id.toString()===id);
    const {addItem} = useCart();

    const addToCart = () => {
        if(!product) return;
        addItem(product, selectedSize);
        router.push('/cart')
    };

    if(!product){
        return <Text>Product not found :(</Text>
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: product.name}} />
            <Image style={styles.image} source={{uri: product.image || defaultPizzaImage}}/>
            
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
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
    },
});