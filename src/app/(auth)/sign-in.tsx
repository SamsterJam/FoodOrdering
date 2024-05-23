import {View, Text, TextInput, StyleSheet, Alert} from 'react-native'
import { useState } from 'react';
import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

export default function SignInScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(''); 
    const [loading, setLoading] = useState(false);

    async function signInWithEmail(){
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) Alert.alert(error.message)
        setLoading(false);
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: "Sign in"}}/>
            <Text style={styles.lable}>Name</Text>
            <TextInput autoComplete='email' inputMode='email' keyboardType='email-address' value={email} onChangeText={setEmail} placeholder='jon@gmail.com' style={styles.input}/>
            
            <Text style={styles.lable}>Password</Text>
            <TextInput autoComplete='password' secureTextEntry value={password} onChangeText={setPassword} style={styles.input}/>

            <Text style={{color: 'red'}}>{errors}</Text>
            <Button onPress={signInWithEmail} text={loading? "Signing in..." : "Sign in"}/>
            <Link href={"/sign-up"} asChild>
                <Text style={styles.textButton}>Create an account</Text>
            </Link>
        </View>
    );
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
        borderColor: 'lightgray',
        borderWidth: 2,
        paddingVertical: 5,
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