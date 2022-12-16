import { Image, StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
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
            <View style={styles.containerTextNotification}>
             <Text style={styles.title}>Jane a besoin de ton aide</Text>
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

      <Text style={styles.textDistance}> Distance: 300 mètres</Text>

      <View style={styles.switchContainer}>
        <View style={styles.optionhelpcontainer}>
          <View>
            <Text style={styles.subtitle}>Je peux l'accueillir</Text>
          </View>

          <View>
            <Switch
              value={isEnabled}
              onValueChange={(value) => setIsEnabled(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isEnabled ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
            </View>
          </View>


        <View style={styles.optionhelpcontainer}>
          <View>
            <Text style={styles.subtitle}>Je peux la rejoindre</Text>
          </View>

          <View>
            <Switch
              value={isReadyToAccomodate}
              onValueChange={(value) => setisReadyToAccomodate(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAccomodate ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>
        </View>


        <View style={styles.optionhelpcontainer}>
          <View>
            <Text style={styles.subtitle}>Je peux répondre à son appel</Text>
          </View>

          <View>
            <Switch
              value={isReadyToLift}
              onValueChange={(value) => setisReadyToLift(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToLift ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>
        </View>

        <View style={styles.optionhelpcontainer}>
          <View>
            <Text style={styles.subtitle}>Je peux la transporter</Text>
          </View>

          <View>
            <Switch
              value={isReadyToAssist}
              onValueChange={(value) => setisReadyToAssist(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAssist ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer} >
        
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("HelperConfirmation")}>
          <Text style={styles.textButton}>Aider Jane</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate("HelperDecline")}>
          <Text style={styles.textButton}>Décliner</Text>
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
    //  backgroundColor: 'brown',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profilName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Raleway',
    color: '#33355C',

  }
  ,

  profilePic: {
    width: 40,
    height: 40,
  },

  containerTextNotification: {
    flex: 1,
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

  textDistance: {
    fontSize: 20,
    fontWeight: '600',
    color: "#33355C",
    margin: 5,
    fontFamily: 'Raleway',
  },

  switchContainer: {

    flex: 2,
    //  backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  optionhelpcontainer: {
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    margin: 5,
  },
 
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#33355C',
    fontFamily: 'OpenSans',

  },

  button1: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },

  button2: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
    opacity: 0.5,

  },


  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: "pink",
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',

  },

     textButton: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 24,
  },
  
}); 