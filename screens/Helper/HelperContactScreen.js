import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
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
    return <View />
  }
  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
        <Text style={styles.title}>Garde le contact avec Jane avant de la retrouver.</Text>
      <SafeAreaView style={styles.mapContainer}>
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
      </SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.messagerieContainer}>
        <Image source={PlaceholderImage} style={styles.profilePic} />
        <Text style={styles.textChat}>Ouvrir le Chat</Text>
      </TouchableOpacity>
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
    fontSize: 24,
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
    alignSelf: 'center'
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
  textButton: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
});