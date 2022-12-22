import { Linking, Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';



export default function HelperMoreInfoScreen({ navigation }) {

  const PlaceholderImage = require("../../assets/Vector.png");

  //récupérer les données du store
  const user = useSelector((state) => state.user.value);
  const position = useSelector((state) => state.location.value);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: position.latitude,
    longitude: position.longitude
  });

  const fakeAsker = {
    prenom: 'Louise',
    avatarUri: 'uri',
    isConnected: true,
    telephone: '0766290787',
    latitude: 45.760,
    longitude: 4.852,
  }
  const askerMarker = <Marker coordinate={{ latitude: fakeAsker.latitude, longitude: fakeAsker.longitude }} title={fakeAsker.prenom} pinColor="#E4513D" />;

  // Fonction téléphoner au asker 
  const callAsker = () => {
    let phoneNumber = fakeAsker.telephone;
    if (Platform.OS === 'android') {
      phoneNumber = (`tel:${phoneNumber}`);
    } else {
      phoneNumber = (`telprompt:${phoneNumber}`);
    }
    Linking.openURL(phoneNumber);
  };
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

  // calcule du delta pour marker asker
  const delta = eloignement * 0.02 + 0.01;
  console.log('delta:', delta)
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

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <View />
  }
  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
      <Text style={styles.title}>Garde le contact avec {fakeAsker.prenom} avant de la retrouver.</Text>
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
          style={styles.map}>
          {askerMarker}
        </MapView>}
      </SafeAreaView>

      <View style={styles.contactButtons}>
        <TouchableOpacity style={styles.buttonCall} onPress={() => callAsker()}>
          <FontAwesome name="phone" size={24} color="white" style={styles.phone} />
          <Text style={styles.text3}> Appeler {fakeAsker.prenom}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonChat} onPress={() => navigation.navigate("Chat")}>
          <Entypo name="chat" size={24} color="white" style={styles.chat} />
          <Text style={styles.textButton}> Ouvrir le Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineStyle} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.textButton}>Home page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textNotification: {
    textAlign: 'center',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: "#33355C",
    fontFamily: 'Raleway',
  },
  map: {
    flex: 1,
    width: '90%',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  messagerieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
  },
  textChat: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    margin: 5,
    color: "#33355C",
    fontFamily: 'Raleway',
  },
  lineStyle: {
    borderWidth: 0.5,
    width: '90%',
    borderColor: "#33355C",
    marginTop: 15,
    alignSelf: 'center',
  },
  contactButtons: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    width: '45%',
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonCall: {
    marginTop: 5,
    marginBottom: 15,
    width: 213,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 15,
  },
  buttonChat: {
    marginTop: 5,
    marginBottom: 15,
    width: 213,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text3: {
    color: "white",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center',
  },
});