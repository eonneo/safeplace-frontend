import { Button, StyleSheet, Text, View, KeyboardAvoidingView,  TextInput, TouchableOpacity } from 'react-native';
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

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title}>`Hello ${prenom}`</Text>
          <Text style={styles.title}>`${count} utilisateurs autour de toi`</Text>
          <Text style={styles.title}>`Déjà ${countSaved} utilisateurs sauvé.e.s depuis le début de Safe Place`</Text>
          <Image></Image>
          <TouchableOpacity>
        <LinearGradient
          // Background Linear Gradient
          colors={["#E4513D", "#FFA647"]}
          style={styles.SosButton}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          onPress={() => HelpeRequest()}
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
    input: {
      width: '80%',
      marginTop: 25,
      borderBottomColor: '#EC6E5B',
      borderBottomWidth: 1,
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