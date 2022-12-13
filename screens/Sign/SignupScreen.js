import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestSignupFields } from '../../reducers/signup';
import DateField from 'react-native-datefield';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [naissance, setNaissance] = useState('12-12-2022');
  const [telephone, setTelephone] = useState('');
  const [numeroRue, setNumeroRue] = useState('');
  const [rue, setRue] = useState('');
  const [codePostal, setCodePostal] = useState(0);
  const [ville, setVille] = useState('');

console.log('naissance:', naissance)

  const handleSubmit = () => {

    const userInfos = {
      prenom: prenom,
      nom: nom,
      naissance: naissance,
      telephone: telephone,
      numeroRue: numeroRue,
      rue: rue,
      codePostal: codePostal,
      ville: ville,
    }
    dispatch(getRestSignupFields(userInfos))
    console.log('userInfos:', userInfos)
    navigation.navigate('Upload')
    // naviiiiiiiiiiiiiiiiiiiigate
    navigation.navigate('Upload')
  }
  const totalUserInfo = useSelector((state) => state.signup.value)
  console.log("Full user infos:", totalUserInfo)
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeView}>
        <Text style={styles.title}>SignUp Page Form </Text>
        <ScrollView>
          <View style={styles.inputGroup}>
            <Text style={styles.text}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Jane"
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setPrenom(value)}
            />
            <Text style={styles.text}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Martin"
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setNom(value)}
            />
            <Text style={styles.text}>Date de naissance</Text>
            <DateField
              labelDate="Jour"
              labelMonth="Mois"
              labelYear="Année"
              onSubmit={(value) => setNaissance(value)}
            />
            
            <Text style={styles.text}>Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setTelephone(value)}
            />
            <Text style={styles.text}>adresse n°</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setNumeroRue(value)}
            />

            <Text style={styles.text}>Rue</Text>
            <TextInput
              style={styles.input}
              placeholder="Rue"
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setRue(value)}
            />

            <Text style={styles.text}>Code postal</Text>
            <TextInput
              style={styles.input}
              placeholder="69001"
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setCodePostal(value)}
            />

            <Text style={styles.text}>Ville</Text>
            <TextInput
              style={styles.input}
              placeholder="Ville"
              placeholderTextColor='#C9D6DF'
              onChangeText={(value) => setVille(value)}
            />

            <TouchableOpacity style={styles.button5} activeOpacity={0.9} onPress={() => handleSubmit()}>
              <Text style={styles.text5}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  safeView: {
    marginTop: 30,
  },
  datePickerStyle: {
    width: 230,
  },
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
  button5: {
    marginTop: 30,
    marginBottom: 30,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
  },
  text5: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
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
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});