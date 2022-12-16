import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { addPosition, deletePosition } from '../../reducers/geolocation'

import IP from "../../IPAdress";

import AppLoading  from 'expo-app-loading';
import { useFonts } from '@use-expo/font';

//imports cards
import FontAwesome from "react-native-vector-icons/FontAwesome";
const PlaceholderImage = require("../../assets/Vector.png");

export default function HelperLocatorScreen({ navigation }) {

  const dispatch = useDispatch();

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
                                                                        //console.log(persistoreasyncstorage)
            const geolocInfos = {
              email: user.email,
              lastPosition: {
                latitude: (currentPosition.latitude),
                longitude: (currentPosition.longitude),
              }}
            //envoyer les coordonnées à la bd
            fetch(`http://${IP}:3000/users/lastposition`, {
              method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geolocInfos),
            })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                console.log('last position added to DB') && dispatch(addPosition(currentPosition));
              }else {console.log('error: last position not added to DB')}
            });
          }
        )
      }
    })();
  }, []);

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <AppLoading />
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={PlaceholderImage} style={styles.profilePic}></Image>
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate('HelperConfirmRequest')}>
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
              <FontAwesome name="circle" size={20} color="#5CA4A9" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate('HelperConfirmRequest')}>
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
              <FontAwesome name="circle" size={20} color="#5CA4A9" />
            </View>
          </View>
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
    helpersText: {
      width: '80%',
      fontSize: 24,
      fontWeight: '600',
      paddingBottom: 10,
      color: "#33355C",
      textAlign: 'center',
      fontFamily: 'Raleway',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 8,
      width: '80%',
      backgroundColor: 'blue',
      borderRadius: 10,
      marginBottom: 10,
    },
    textButton: {
      color: '#ffffff',
      height: 30,
      fontWeight: '600',
      fontSize: 16,
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
    }
});