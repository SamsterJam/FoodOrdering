import { View, Text, Image, StyleSheet } from "react-native";
import { OrderItem } from '../types';
import { defaultPizzaImage } from "./ProductListItem";
import Colors from "../constants/Colors";

type OrderItemListItemProps = {
    item: OrderItem;
}

export default function OrderItemListItem({item}: OrderItemListItemProps){

    return(
        <View style={styles.container}>
            <Image style={styles.image} src={item.products.image || defaultPizzaImage}/>
            <View style={styles.infochunk}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>{item.products.name}</Text>
                <View style={styles.pricensize}>
                    <Text style={{color: Colors.light.tint, fontWeight: 'bold'}}>${item.products.price}</Text>
                    <Text style={{marginHorizontal: 10}}>Size: {item.size}</Text>
                </View>
            </View>
            <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '20%',
        aspectRatio: 1,
        resizeMode: 'contain',
        marginRight: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    infochunk: {
        flex: 1,
    },
    pricensize: {
        flexDirection: 'row',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: '500',
        marginRight: 15,
    }
});