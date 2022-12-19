import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { addPosition, deletePosition } from '../../reducers/geolocation';

import IP from "../../IPAdress";

import { useFonts } from '@use-expo/font';

//imports cards
import FontAwesome from "react-native-vector-icons/FontAwesome";
import persistStore from 'redux-persist/es/persistStore';
const PlaceholderImage = require("../../assets/Vector.png");

export default function HelperLocatorScreen({ navigation }) {

  const dispatch = useDispatch();

  //récupérer les données du store
  const user = useSelector((state) => state.user.value);
  const position = useSelector((state) => state.location.value);
  console.log('reducer user:', user, 'reducer location:', position);

  const [currentPosition, setCurrentPosition] = useState(null);

  //calcul d'une distance en km
  function distance(latHelper, lonHelper, latRequest, lonRequest) {
    if ((latHelper === latRequest) && (lonHelper === lonRequest)) {
      return 0;
    }
    else {
      const radlatHelper = Math.PI * latHelper/180;
      const radlatRequest = Math.PI * latRequest/180;
      const theta = lonHelper-lonRequest;
      const radtheta = Math.PI * theta/180;
      const dist = Math.sin(radlatHelper) * Math.sin(radlatRequest) + Math.cos(radlatHelper) * Math.cos(radlatRequest) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      let dist1 = Math.acos(dist);
      let dist2 = dist1 * 180/Math.PI;
      let dist3 = dist2 * 60 * 1.1515;
      let dist4 = dist3 * 1.609344;
      return dist4;
    }
  }

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
            //console.log('location', location)
            //transmettre les données des dernières coordonnées
            setCurrentPosition(location.coords);
            //console.log('position', position)
            const geolocInfos = {
              email: user.email,
              lastPosition: {
                latitude: (location.coords.latitude),
                longitude: (location.coords.longitude),
              }}
              console.log(geolocInfos)
            //envoyer les coordonnées à la bd
            fetch(`http://${IP}:3000/users/lastposition`, {
              method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geolocInfos),
            })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                console.log('last position added to DB', location.coords);
                dispatch(addPosition(location.coords));
              }else {console.log('error: last position not added to DB')}
            });
            return (geolocInfos);
          }
        )
      }
    })();
  }, []);

  //récupération des infos des helpers autour
  fetch(`http://${IP}:3000/users`)
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      //console.log('data:', data);
      let usersGeoloc= [];
      for (let item of data) {
        //tri sur les helpers disponibles
        if (item.isAvailable) {
          //récupération des infos utiles
          const itemInfos = {
            prenom: item.prenom,
            coordonneesGPS: item.lastPosition,
            settings: item.userActions,
            connected: item.isConnected,
          }
          usersGeoloc.push(itemInfos);
        }
      }
      console.log('store:', persistStore.AsyncStorage)
      //console.log('users:', usersGeoloc);
      //maper sur la data du store pour afficher les helpers disponibles
      const helpers = usersGeoloc.map((data, i) => {
        //console.log('maping data:', data);
        //calculer la distance
        const eloignement = distance(data.coordonneesGPS.latitude, data.coordonneesGPS.longitude, position.latitude, position.longitude);
        console.log('distance:',eloignement);
        return (
          <TouchableOpacity key={i} style={styles.card} onPress={() => navigation.navigate('HelperConfirmRequest')}>
            <View style={styles.leftContent}>
              <Image source={PlaceholderImage} style={styles.profilePic}></Image>
              <View style={styles.middleContent}>
                <Text style={styles.name}>${data.prenom}</Text>
                <Text style={styles.description}>accueillir: ${data.settings.hebergement}, transporter: ${data.settings.transport}, accompagner: ${data.settings.accompagnementDistance}</Text>
                <Text style={styles.distance}>${eloignement}</Text>
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
        );
      });
    }
  })

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <View />
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
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
      
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('HelperConfirmRequest')}>
          <View style={styles.leftContent}>
            <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
            <View style={styles.middleContent}>
              <Text style={styles.name}>X</Text>
              <Text style={styles.description}>accueillir: v, transporter: v, accompagner: v</Text>
              <Text style={styles.distance}>x km</Text>
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
    }
});