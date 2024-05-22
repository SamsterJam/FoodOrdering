import Colors from "@/src/constants/Colors"
import { FontAwesome } from "@expo/vector-icons"
import { Link, Stack } from "expo-router"
import { Pressable } from "react-native"

export default function OrdersStack(){
    return(
        <Stack>
            <Stack.Screen name="list" options={{headerShown: false}} />
        </Stack>
    )
}