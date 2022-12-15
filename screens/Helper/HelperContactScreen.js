import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function HelperMoreInfoScreen({ navigation }) {

  const PlaceholderImage = require("../../assets/Vector.png");

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

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <AppLoading />
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
        <Text style={styles.title}>Garde le contact avec Jane, avant de la retrouver</Text>
      </View>


      <View style={styles.mapContainer}>
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
      </View>


      <View style={styles.messagerieContainer}>
        <Image source={PlaceholderImage} style={styles.profilePic} />
        <Text style={styles.textDistance}> Messagerie</Text>
      </View>
      <View style={styles.lineStyle} />



      <View style={styles.buttonsContainer} >
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.textButton}>retour vers Home</Text>
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
    // backgroundColor: 'brown',
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
    flex: 1,
    textAlign: 'center',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    width: '80%',
    fontSize: 24,
    color: "#33355C",
    fontWeight: '900',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Raleway',
  },

 map: {
    flex: 1,
    width: '90%',
  },

  mapContainer: {
    flex: 3,
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  messagerieContainer: {
    flexDirection: 'row',
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  textDistance: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    margin: 5,
    fontFamily: 'Raleway',
  },

  lineStyle: {
    borderWidth: 0.5,
    width: '90%',
    borderColor: 'black',
    margin: 10,
    alignSelf: 'center'
  },

  buttonsContainer: {
    flex: 4,
    // backgroundColor: "pink",
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },

  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
   
});