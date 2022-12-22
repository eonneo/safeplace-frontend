import { Button, StyleSheet, Text, View, KeyboardAvoidingView, Switch, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from '@use-expo/font';

export default function CguScreen({ navigation }) {


  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <View />
  }
  return (

    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CGU </Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.Quis hendrerit dolor magna eget est lorem ipsum dolor. Quam lacus suspendisse faucibus interdum. Nisl suscipit adipiscing bibendum est. Ultrices dui sapien eget mi proin. Ut sem nulla pharetra diam. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Potenti nullam ac tortor vitae purus. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Tellus cras adipiscing enim eu.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
          <Text style={styles.text}>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
            et dolore magna aliqua. 
          </Text>
        </ScrollView>
        <Text style={styles.bottomText}>
          Veuillez accepter les conditions générales pour poursuivre votre inscription
        </Text>
      </View>
      <View style={styles.container3}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>J'accepte</Text>
        </TouchableOpacity>
      </View>
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
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    margin: 10,
  },
  mainContainer: {
    flex: 3,
    alignItems:'center',
    justifyContent: 'center',
    width: '90%',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '200',
    fontFamily: 'Raleway',
    color: "#33355C",
    textAlign: 'justify',
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  title: {
    width: '100%',
    fontSize: 54,
    fontWeight: '600',
    fontFamily: 'Raleway',
    color: "#33355C",
    textAlign: 'center',
  },
  button1: {
    marginTop: 10,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    // fontFamily: ,
    fontWeight: "bold",
    fontSize: 20,
  },
  bottomText: {
    color: "#5CA4A9",
    fontWeight: '600',
    fontFamily: 'Raleway',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
  },



});