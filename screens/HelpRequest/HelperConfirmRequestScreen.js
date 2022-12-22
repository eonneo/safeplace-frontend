import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

import { useFonts } from '@use-expo/font';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

//imports cards
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function HelperConfirmRequestScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  const helper = useSelector((state) => state.selectedHelper.value);
  const position = useSelector((state) => state.location.value);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: position.latitude,
    longitude: position.longitude
  });

  const helperMarker = <Marker coordinate={{latitude: helper.latitude, longitude: helper.longitude}} title={helper.prenom} pinColor="#E4513D"/>;
  
  console.log('helper from useselector:', helper)
  console.log('position from useSelector:', position)
  console.log('currentPosition:', currentPosition)

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
  const eloignement = distance(helper.latitude, helper.longitude, currentPosition.latitude, currentPosition.longitude);
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
            setCurrentPosition({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() =>  navigation.navigate('TabNavigator', { screen: 'Profil' })}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{helper.prenom} est le helper que tu as désigné pour t'aider</Text>
        <Text style={styles.title}>Il arrive vers toi, tu peux suivre ses déplacements sur la carte</Text>
      </View>
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
          {helperMarker}

      </MapView>}
      <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate('ContactHelper')}>
        <View style={styles.leftContent}>
          <Image source={{ uri: `${helper.avatarUri}` }} style={styles.profilePic}></Image>
          <View style={styles.middleContent}>
            <Text style={styles.name}>{helper.prenom}</Text>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.distance}>{eloignement} km</Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={styles.isConnected}>
            <FontAwesome name="circle" size={20} color={helper.isConnected ? '#5CA4A9' : "#E4513D"} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>En attendant :</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('EmergencyNumbScreen')}
        >
          <Text style={styles.link}>Quelques numéros utiles</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('ContactHelper')}>
        <Text style={styles.text3}>Contacter {helper.prenom}</Text>
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
  titlesContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Raleway',
  },
  title: {
    width: '80%',
    fontSize: 18,
    color: "#33355C",
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  link: {
    width: '80%',
    fontSize: 18,
    color: "#5CA4A9",
    fontWeight: '400',
    fontFamily: 'Raleway',
  },
  map: {
    flex: 1,
    width: "92%",
  },
  cardContent: {
    width: "100%",
    height: 70,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 140,
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    color: "#5CA4A9",
    fontFamily: 'Raleway',
  },
  description: {
    fontSize: 16,
    color: "#33355C",
    fontFamily: 'Raleway',
  },
  distance: {
    fontSize: 16,
    color: "#33355C",
    fontFamily: 'Raleway',
  },
  isFavorite: {
    marginRight: 20,
  },
  button3: {
    marginTop: 5,
    marginBottom: 15,
    width: 213,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
  },
  text3: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});