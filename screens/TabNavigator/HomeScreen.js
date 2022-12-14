import { Button,
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView, 
  TextInput, 
  TouchableOpacity, 
Image } from 'react-native';
import { useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@expo-google-fonts/inter";
import React from "react";
import HelperConfirmRequestScreen from '../HelpRequest/HelperConfirmRequestScreen';

export default function HomeScreen({ navigation }) {

  /*const [fontsLoaded] = useFonts({
    OpenSans: require("../assets/OpenSans/OpenSans-Regular.ttf"),
  });
  
  if (!fontsLoaded) {
    return <View />;
  }*/
  

  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);

  //récupérer les données de géolocalisation
  useEffect(() => {
    (async () => {
      //demander la permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      //si permission accordée
      if (status === 'granted') {
        //récupérer la localisation tous les 5 minutes
        Location.watchPositionAsync({ timeInterval: 300000 },
          (location) => {
            //transmettre les données des dernières coordonnées
            setCurrentPosition(location.coords);
          });
      }
    })();
  }, []);

  const HelpeRequest = () => {
    navigation.navigate('HelperLocation')
  }

  const homePic = require('../../assets/mains.jpg')

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title1}>Hello {user.prenom}</Text>
          <Text style={styles.title2}>x utilisateurs autour de toi</Text>
          <Text style={styles.title2}>Déjà x utilisateurs sauvé.e.s depuis le début de Safe Place</Text>
          <Image source={homePic} style={styles.homePic}></Image>
          <TouchableOpacity onPress={() => HelpeRequest()}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#E4513D", "#FFA647"]}
          style={styles.SosButton}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.SosText}>SOS</Text>
        </LinearGradient>
      </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      Margin: 0,
    },
    homePic: {
      width: '100%',
      height: '50%',
      marginTop: 20,
    },
    title1: {
      width: '80%',
      fontSize: 36,
      fontWeight: '600',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: "#33355C",
      padding: 0,
      marginTop: 40,
      marginBottom: 10,
    },
    title2: {
      width: '80%',
      fontSize: 20,
      fontWeight: '400',
      color: "#33355C",
      padding: 0,
      marginTop: 10,
    },
    input: {
      width: '80%',
      marginTop: 25,
      borderBottomColor: '#EC6E5B',
      borderBottomWidth: 1,
      fontSize: 20,
    },
    SosButton: {
      width: 199,
      height: 199,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      opacity: 1,
      position: 'absolute',
      top: -100,
      left: "-27%",
      zIndex: 1,
  
    },
    SosText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 64,
      alignItems: "center",
      fontFamily: 'OpenSans',
    },
   });