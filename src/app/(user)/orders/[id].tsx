import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { useOrderDetails } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscriptions';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();

  if (idString === undefined) {
    // Handle the case where idString is undefined
    console.error('idString is undefined');
    return null;
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  useUpdateOrderSubscription();

  if (!order) return <Text>Order not found!</Text>;

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  return (
    <View>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ padding: 5, gap: 5 }}
      />
    </View>
  );
}
