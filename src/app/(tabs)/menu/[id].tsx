import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
import { Stack } from 'expo-router';

export default function ProductDetailsScreen(){
    const { id } = useLocalSearchParams();

    return(
        <View>
            <Stack.Screen options={{title: 'Details ' + id}} />

            <Text style={{ fontSize: 20}}>Product Details for id: {id}</Text>
        </View>
    )
}