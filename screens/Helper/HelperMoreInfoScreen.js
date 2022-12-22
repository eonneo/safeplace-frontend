import {
  Image,
  StyleSheet,
  Text,
  View,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function HelperMoreInfoScreen({ navigation }) {



  //récupérer les données du store
  const position = useSelector((state) => state.location.value);
  const user = useSelector((state) => state.user.value);
  const fakeAsker = {
    prenom: 'Louise',
    avatarUri: 'uri',
    isConnected: true,
    telephone: '0766290787',
    latitude: 45.760,
    longitude: 4.852,
  }
  const askerMarker = <Marker coordinate={{latitude: fakeAsker.latitude, longitude: fakeAsker.longitude}} title={fakeAsker.prenom} pinColor="#E4513D"/>;

  const [currentPosition, setCurrentPosition] = useState({
    latitude: position.latitude,
    longitude: position.longitude
  });

  //calcul d'une distance en km
  function distance(latHelper, lonHelper, latRequest, lonRequest) {
    if ((latHelper === latRequest) && (lonHelper === lonRequest)) {
      return 0;
    }
    else {
      const radlatHelper = Math.PI * latHelper / 180;
      const radlatRequest = Math.PI * latRequest / 180;
      const theta = lonHelper - lonRequest;
      const radtheta = Math.PI * theta / 180;
      const dist = Math.sin(radlatHelper) * Math.sin(radlatRequest) + Math.cos(radlatHelper) * Math.cos(radlatRequest) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      let dist1 = Math.acos(dist);
      let dist2 = dist1 * 180 / Math.PI;
      let dist3 = dist2 * 60 * 1.1515;
      let dist4 = dist3 * 1.609344;
      if (dist4 < 1) { return (dist4 /= 1000).toFixed(2) }
      return (dist4.toFixed(2));
    }
  }
  //calculer la distance
  const eloignement = distance(fakeAsker.latitude, fakeAsker.longitude, currentPosition.latitude, currentPosition.longitude);
  console.log("eloignement:", eloignement)
 
  // calcule du delta pour marker helper
  const delta = eloignement*0.02+0.01;
  console.log('delta:',delta)
  console.log("eloignement:", eloignement)
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


  // Controle des switchs
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isReadyToAccomodate, setisReadyToAccomodate] = React.useState(false);
  const [isReadyToLift, setisReadyToLift] = React.useState(false);
  const [isReadyToAssist, setisReadyToAssist] = React.useState(false);

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <View />
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
      <Text style={styles.title}>{fakeAsker.prenom} a besoin de ton aide !</Text>
      <SafeAreaView style={styles.mapContainer}>
        {currentPosition && <MapView mapType="standard"
          showsUserLocation={true}
          followsUserLocation={true}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}
          style={styles.map}
          >
            {askerMarker}
            </MapView>}
      </SafeAreaView>
      <Text style={styles.textDistance}>Distance : 253 mètres</Text>
      <View style={styles.switchContainer}>
        <View style={styles.optionContainer}>
          <Text style={styles.subtitle}>Je peux l'accueillir</Text>
          <Switch
            value={isEnabled}
            onValueChange={(value) => setIsEnabled(value)}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isEnabled ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.subtitle}>Je peux la rejoindre</Text>
          <Switch
            value={isReadyToAccomodate}
            onValueChange={(value) => setisReadyToAccomodate(value)}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToAccomodate ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.subtitle}>Je peux transporter</Text>
          <Switch
            value={isReadyToLift}
            onValueChange={(value) => setisReadyToLift(value)}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToLift ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.subtitle}>Je peux soutenir à distance</Text>
          <Switch
            value={isReadyToAssist}
            onValueChange={(value) => setisReadyToAssist(value)}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToAssist ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
        </View>
      </View>
      <View style={styles.buttonsContainer} >

        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("HelperConfirmation")}>
          <Text style={styles.textButton}>Aider {fakeAsker.prenom}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("HelperDecline")}>
          <Text style={styles.textButton}>Décliner</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 35,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameText: {
    width: '80%',
    fontSize: 24,
    color: "#33355C",
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  title: {
    width: '80%',
    fontSize: 21,
    color: "#33355C",
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Raleway',
    paddingTop: 5,
    paddingBottom: 5,
  },

  map: {
    flex: 1,
    width: '90%',
  },

  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
  },

  textDistance: {
    fontSize: 20,
    fontWeight: '600',
    color: "#33355C",
    fontFamily: 'Raleway',
  },
  switchContainer: {
    width: '90%',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: "center",
    alignSelf: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#33355C',
    fontFamily: 'OpenSans',
  },

  button1: {
    width: '45%',
    marginTop: 5,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
  },

  button2: {
    width: '45%',
    marginTop: 5,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },


  buttonsContainer: {
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  textButton: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
}); 