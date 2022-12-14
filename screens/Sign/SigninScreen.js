import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { login } from '../../reducers/users';
import { useDispatch, useSelector } from 'react-redux';

export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const handleSignin = () => {
<<<<<<< HEAD
        fetch('http://192.168.1.181:3000/users/signin', {
=======
        fetch('http://192.168.42.89:3000/users/signin', {
>>>>>>> 5edd0616b4878f8182d1c91ce90cd304f5006b42
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        }).then(response => response.json())
            .then(userData => {

                if (userData.result) {
                    console.log('ok connecte', userData)
                    // reducer user => isconnected email et prenom
                    const loginInfos = {
                        email: email,
                        prenom: userData.userInfos.prenom,
                        isConnected: true,
                    }
                    console.log('loginInfos:', loginInfos)

                    // reducer user => isconnecte mail et prenom
                    dispatch(login(loginInfos))

                    //  update isconnecte in database
                    fetch('http://192.168.42.89:3000/users/isconnected', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, isConnected: true }),
                    }).then(response => response.json())
                    .then(updateStatus => {
                            console.log('status isConnected à jour en bdd')
                    })

                    //  navigate to home
                    navigation.navigate('TabNavigator', { screen: 'Home' })
                    

                } else {
                    console.log('Mauvais mot de passe ou mauvaise adresse email')
                }
            });
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.title}>Bienvenue sur SAFE PLACE</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.text}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="jane@exemple.com"
                    placeholderTextColor='#C9D6DF'
                    autoCapitalize="none"
                    onChangeText={(value) => setEmail(value)}
                />
                {emailError && <Text style={styles.error}>Invalid email address</Text>}
                <Text style={styles.text}>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    placeholderTextColor='#C9D6DF'
                    autoCapitalize="none"
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <TouchableOpacity style={styles.button5} activeOpacity={0.9} onPress={() => handleSignin()}>
                <Text style={styles.text5}>Se connecter</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: '80%',
        fontSize: 38,
        fontWeight: '600',
        textAlign: 'center',
    },
    inputGroup: {
        marginTop: 60,
        display: 'flex',
        justifyContent: 'space-around',
    },
    text: {
        color: '#5CA4A9',
        fontSize: 12,
        marginTop: 30,
    },
    input: {
        width: 320,
        height: 40,
        borderBottomColor: "#5CA4A9",
        borderBottomWidth: 1,
        fontSize: 18,
    },
    button5: {
        marginTop: 10,
        width: 176,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#33355C",
        alignItems: "center",
        justifyContent: "center",
    },
    text5: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans',
        fontWeight: "bold",
        fontSize: 20,
    },
})