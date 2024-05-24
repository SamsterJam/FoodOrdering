import { View, Text, StyleSheet, Pressable } from "react-native";
import { Order } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

export default function OrderListItem({ order }: OrderListItemProps) {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderText}>Order #{order.id}</Text>
          <Text style={styles.ageText}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text
          style={[styles.statusText, { color: order.status === "Delivered" ? "gray" : "green" }]}
        >
          {order.status}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  ageText: {
    color: "gray",
    fontSize: 16,
  },
  statusText: {
    fontWeight: "500",
    fontSize: 18,
  },
});
