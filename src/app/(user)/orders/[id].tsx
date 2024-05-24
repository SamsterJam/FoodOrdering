import { View, Text, FlatList } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import orders from "@/assets/data/orders";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/src/components/OrderItemListItem";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  const order = orders.find((order) => order.id.toString() === id);

  if (!order) return <Text>Order not found!</Text>;

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
