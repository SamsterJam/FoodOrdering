import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function CreateProductScreen() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFeilds = () => {
        setName('');
        setPrice('');
    };

    const validateInput = () => {
        setErrors('');
        if(!name){
            setErrors('Name is required')
            return false;
        }
        if(!price){
            setErrors('Price is required')
            return false;
        }
        if(isNaN(parseFloat(price))){
            setErrors('Price is not a number')
            return false;
        }
        return true;
    }

    const onSubmit = () => {
        if(isUpdating){
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onUpdate = () => {
        if (!validateInput()) return;

        console.warn("Updating Product: ", name);
        resetFeilds();
    };
    
    const onCreate = () => {
        if (!validateInput()) return;

        console.warn("Creating Product: ", name);
        resetFeilds();
    };

    const onDelete = () => {
        console.warn("Deleting Product: ", name);
        resetFeilds();
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating? "Edit Product" : "Create Product"}}/>
            <Image source={{uri : image || defaultPizzaImage}} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.lable}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input}/>
            
            <Text style={styles.lable}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder='$9.99' style={styles.input} keyboardType='numeric'/>

            <Text style={{color: 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={ isUpdating? "Update" : "Create"}/>
            {isUpdating && (<Text onPress={confirmDelete} style={[styles.textButton, {color: 'orangered'}]}>Delete</Text>)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,

    },
    lable: {
        color: 'gray',
        fontSize: 16,

    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
});