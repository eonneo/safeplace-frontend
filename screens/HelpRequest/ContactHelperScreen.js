import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { useFonts } from '@use-expo/font';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Entypo } from '@expo/vector-icons';

export default function ContactHelperScreen({ navigation }) {


  const user = useSelector((state) => state.user.value);
  const helper = useSelector((state) => state.selectedHelper.value);

  const position = useSelector((state) => state.location.value);

  const [currentPosition, setCurrentPosition] = useState({
    latitude: position.latitude,
    longitude: position.longitude
  });

  const helperMarker = <Marker coordinate={{ latitude: helper.latitude, longitude: helper.longitude }} title={helper.prenom} pinColor="#E4513D" />;

  // Fonction téléphoner au helper 
  const callHelper = () => {
    let phoneNumber = helper.telephone;
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
      if (dist4 < 1) { return (dist4 /= 1000).toFixed(2) + ' m' }
      return (dist4.toFixed(2));
    }
  }
  //calculer la distance
  const eloignement = distance(helper.latitude, helper.longitude, currentPosition.latitude, currentPosition.longitude);
  // calcule du delta pour marker helper
  const delta = eloignement * 0.02;
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{helper.prenom} est sur le point d'arriver</Text>
      </View>
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
          <View style={styles.isFavorite}>
            <FontAwesome name="heart" size={20} color="#ec6e5b" />
          </View>
          <View style={styles.isConnected}>
            <FontAwesome name="circle" size={20} color="#5CA4A9" />
          </View>
        </View>
      </TouchableOpacity>
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
        {helperMarker}
      </MapView>}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Tu peux contacter {helper.prenom} :</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonCall} onPress={() => callHelper()}>
            <FontAwesome name="phone" size={24} color="white" style={styles.phone} />
            <Text style={styles.text3}>Appeler {helper.prenom}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonChat} onPress={() => navigation.navigate('Chat')}>
            <Entypo name="chat" size={24} color="white" style={styles.chat} />
            <Text style={styles.text3}>Ouvrir le chat</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  titlesContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    width: '80%',
    fontSize: 18,
    color: "#33355C",
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
  bottomContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%",
    heigth: 250,
    paddingTop: 10,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingBottom: 20,
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
  phone: {
    paddingRight: 10,
  },
  chat: {
    paddingRight: 10,
  },
});