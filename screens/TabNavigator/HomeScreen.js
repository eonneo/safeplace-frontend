import { Image, StyleSheet, Text, View, KeyboardAvoidingView,  TextInput, TouchableOpacity } from 'react-native';
import { useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import React from "react";

const PlaceholderImage = require("../../assets/Vector.png");
import { LinearGradient } from "expo-linear-gradient";


export default function HomeScreen({ navigation }) {

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

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

<View style={styles.topprofilContainer}>
        <View>
          <Text style={styles.profilName}> Hello {user.prenom}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Settings')}>

          <Image source={PlaceholderImage} style={styles.profilePic}/>

          </TouchableOpacity>

        </View>

      </View>
          <Text style={styles.title}> Home Page  </Text>

<LinearGradient
        // Background Linear Gradient
        colors={["#E4513D", "#FFA647"]}
        style={styles.SosButton}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
                >
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('HelperLocation')}>
            <Text style={styles.SosText}>SOS</Text>
          </TouchableOpacity>

        </LinearGradient>

         
          
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

    topprofilContainer: {
      //backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      flexDirection: 'row',
      backgroundColor:'#ccc',
    },

    profilePic: {
      width: 40,
      height: 40,
    },
  
    profilName: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'left',
      width: 300,
    }
    ,
    image: {
      width: '100%',
      height: '50%',
    },
    title: {
      width: '80%',
      fontSize: 38,
      fontWeight: '600',
      textAlign:'center',
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
    SosButton: {
    marginTop: 10,
    width: 199,
    height: 199,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,

  },
  SosText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 64,
    alignItems: 'center'
  }
   });