import { Button, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFirstSignupFields } from '../../reducers/signup';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMatch, setPasswordMatch] = useState (false);

  const [emailError, setEmailError] = useState(false);
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email) && password === passwordConfirmation) {
      setPasswordMatch(true)
      const loginInfos = {
        email: email,
        password: password
      }
      dispatch(getFirstSignupFields(loginInfos));
      console.log(loginInfos)
      navigation.navigate('Cgu')
    } else {
      setEmailError(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Text style={styles.title}>Login Page </Text> */}
      <Text>Tu as déja un compte SAFE PLACE ?</Text>
      <TouchableOpacity style={styles.button5} activeOpacity={0.9} onPress={() => navigation.navigate('SigninScreen')}>
        <Text style={styles.text5}>Connecte toi</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="jane@exemple.com"
          placeholderTextColor='#C9D6DF'
          onChangeText={(value) => setEmail(value)}
        />
        {emailError && <Text style={styles.error}>Invalid email address</Text>}
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor='#C9D6DF'
          onChangeText={(value) => setPassword(value)}
        />

        <Text style={styles.text}>Confirmation du mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          placeholderTextColor='#C9D6DF'
          onChangeText={(value) => setPasswordConfirmation(value)}

        />
      </View>
      <TouchableOpacity style={styles.button5} activeOpacity={0.9} onPress={() => handleSubmit()}>
        <Text style={styles.text5}>S'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
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
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 80,
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
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});