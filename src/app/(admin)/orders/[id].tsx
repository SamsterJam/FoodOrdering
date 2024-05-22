import { View, Text, FlatList, Pressable } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import React from "react";

export default function OrderDetailsScreen(){
    const { id } = useLocalSearchParams();

    const order = orders.find(order => order.id.toString() === id);
    
    if (!order) return <Text>Order not found!</Text>;

    return(
        <View>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order}/>

            <FlatList 
                data={order.order_items}
                renderItem={({item}) => <OrderItemListItem item={item} />}
                contentContainerStyle={{padding: 5, gap: 5}}
                ListFooterComponent={() => 
                    <>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            {OrderStatusList.map((status) => (
                            <Pressable
                                key={status}
                                onPress={() => console.warn('Update status')}
                                style={{
                                borderColor: Colors.light.tint,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginVertical: 10,
                                backgroundColor:
                                    order.status === status
                                    ? Colors.light.tint
                                    : 'transparent',
                                }}
                            >
                                <Text
                                style={{
                                    color:
                                    order.status === status ? 'white' : Colors.light.tint,
                                }}
                                >
                                {status}
                                </Text>
                            </Pressable>
                            ))}
                        </View>
                        </>
                }
            />
        </View>
    )
}