import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { OrderStatus, OrderStatusList } from '@/src/types';
import Colors from '@/src/constants/Colors';
import React from 'react';
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const { mutate: updateOrder } = useUpdateOrder();

  if (idString === undefined) {
    // Handle the case where idString is undefined
    console.error('idString is undefined');
    return null;
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  if (!order) return <Text>Order not found!</Text>;

  const updateStatus = (status: OrderStatus) => {
    updateOrder({ id: id, updatedFeilds: { status } });
  };

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ padding: 5, gap: 5 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor: order.status === status ? Colors.light.tint : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color: order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}
