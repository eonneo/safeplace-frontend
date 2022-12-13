import { SafeAreaView, Image, Button, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//imports cards
import FontAwesome from "react-native-vector-icons/FontAwesome";
const PlaceholderImage = require("../../assets/Vector.png");

export default function HelperLocatorScreen({ navigation }) {

  //récupérer les données du store
  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);

  //récupérer les données de géolocalisation
  useEffect(() => {
    (async () => {
      //demander la permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      //si permission accordée
      if (status === 'granted') {
        //récupérer la localisation tous les 20m
        Location.watchPositionAsync({ distanceInterval: 20 },
          (location) => {
            //transmettre les données des dernières coordonnées
            setCurrentPosition(location.coords);
          });
      }
    })();
  }, []);


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.helloText}>Bonjour Bidule</Text>
      <Text style={styles.helpersText}>Helpers proches de toi</Text>
      {currentPosition && <MapView mapType="standard" 
      showsUserLocation={true} 
      followsUserLocation={true} 
      initialRegion={{
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }} 
    
      style={styles.map}>
      </MapView>}
      <View>
        <TouchableOpacity style={styles.cardContent}>
          <View style={styles.leftContent}>
            <Image source={PlaceholderImage} style={styles.profilePic}></Image>
            <View style={styles.middleContent}>
              <Text style={styles.name}>Name</Text>
              <Text style={styles.description}>Description</Text>
              <Text style={styles.distance}>Distance</Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <View style={styles.isFavorite}>
              <FontAwesome name="heart" size={20} color="#ec6e5b" />
            </View>
            <View style={styles.isConnected}>
              <FontAwesome name="circle" size={20} color="green" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('HelperConfirmRequest')}>
        <Text style={styles.textButton}>Poursuivre pour confirmer request</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
  },
    image: {
      width: '100%',
      height: '50%',
    },
    helloText: {
      width: '80%',
      fontSize: 24,
      fontWeight: '600',
      paddingTop: 10,
    },
    helpersText: {
      width: '80%',
      fontSize: 24,
      fontWeight: '600',
      paddingBottom: 10,
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 8,
      width: '80%',
      marginTop: 10,
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
    map: {
      flex: 0.9,
      width: "95%",
    },
    cardContent: {
      width: "100%",
      height: 70,
      marginTop: 10,
      backgroundColor: "white",
      flexDirection: "row",
    },
    middleContent: {
      marginLeft: 15,
      color: '#33355C'
    },
    leftContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    rightContent: {
      flexDirection: "row",
      marginLeft: 160,
      alignItems: 'center',
      marginBottom: 20,
    },
    profilePic: {
      width: 40,
      height: 40,
    },
    name: {
      fontSize: 24,
      color: "#5CA4A9",
    },
    description: {
      fontSize: 16,
      color: "#33355C",
    },
    distance: {
      fontSize: 16,
      color: "#33355C",
    },
    isFavorite: {
      marginRight: 20,
    }
   });