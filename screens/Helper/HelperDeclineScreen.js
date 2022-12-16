import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import React from 'react';
import { useEffect, useState } from 'react';



export default function HelperMoreInfoScreen({ navigation }) {

  const PlaceholderImage = require("../../assets/Vector.png");

  //récupérer les données du store
  const user = useSelector((state) => state.user.value);



  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <View />
  }
  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.topContainer}>
        <View>
          <Text style={styles.profilName}> Bonjour {user.prenom}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Settings')}>
            <Image source={PlaceholderImage} style={styles.profilePic} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textNotification}>
        <Text style={styles.title}>Jane a trouvé un helper plus proche</Text>
      </View>

      <View style={styles.remerciementContainer}>
        <Text style={styles.text}> Merci pour ton aide.</Text>
        <Text style={styles.text}> Souhaites-tu rester disponible pour Jane ?</Text>
      </View>






      <View style={styles.buttonsContainer} >
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.textButton}>OUI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.textButton}>NON</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    //backgroundColor: 'brown',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profilePic: {
    width: 40,
    height: 40,
  },

  profilName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Raleway',
  },

  textNotification: {
    //backgroundColor: 'red',
    flex: 2,
    textAlign: 'center',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    width: '80%',
    fontSize: 32,
    color: "#33355C",
    fontWeight: '900',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Raleway',
  },

   remerciementContainer: {
    flex: 2,
    //  backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#33355C',
    margin: 5,
    fontFamily: 'Raleway',
    textAlign:'center',
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: "pink",
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  

  button1: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },

  button2: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
    opacity: 0.5,

  },

  textButton: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },

  
});