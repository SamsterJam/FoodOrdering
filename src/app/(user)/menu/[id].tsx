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
            
            <Text>Select size</Text>

            <View style={styles.sizes}>
            {sizes.map(size => (
                <Pressable onPress={() => setSelectedSize(size)} key={size} style={[styles.size, {backgroundColor: (selectedSize===size)? 'gainsboro' : 'white'}]}>
                    <Text style={[styles.sizeText, {color: (selectedSize===size)? 'black' : 'gray'}]}>{size}</Text>
                </Pressable>))}
            </View>
            
            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text="Add to cart" />
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
        aspectRatio: 2/1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});