import { Switch, StyleSheet, Text, View, Link, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleAvailable, handleAccomodate } from '../../reducers/users';

import { useFonts } from '@use-expo/font';

import IP from '../../IPAdress';



const PlaceholderImage = require("../../assets/Vector.png");


export default function SettingsScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();


  // Controle des switchs
  const [isAvailable, setIsAvailable] = useState(false);
  const [isReadyToAccomodate, setisReadyToAccomodate] = useState(false);
  const [isReadyToLift, setisReadyToLift] = React.useState(false);
  const [isReadyToAssist, setisReadyToAssist] = React.useState(false);
console.log(isAvailable)

  const handleIsAvailable = () => {
    // console.log('switch', isAvailable)
    fetch(`http://${IP}:3000/users/isavailable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: user.email, isAvailable: !isAvailable}),
    }).then(response => response.json())
    .then(updateStatus => {
      if(updateStatus.result){
        console.log('isavailable updated')
        dispatch(handleAvailable(!isAvailable))
      }

    })
  }

  const handleIsReadyToAccomodate = () => {
    // console.log('switch', isReadyToAccomodate)
    fetch(`http://${IP}:3000/users/hebergement`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: user.email, hebergement: !isReadyToAccomodate}),
    }).then(response => response.json())
    .then(updateStatus => {
      if(updateStatus.result){
        console.log('hebergement status updated in DB')
        dispatch(handleAccomodate(!isReadyToAccomodate))
      }

    })
  }
  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <View />
  }
  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topprofilContainer}>
        <View>
          <Text style={styles.profilName}> {user.prenom}</Text>
        </View>

        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Settings')}>
            <Image source={PlaceholderImage} style={styles.profilePic} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profilContainer}>
        <Text style={styles.title}>Mon profil</Text>

        <View style={styles.readytohelpcontainer}>
          <View>
            <Switch
              value={isAvailable}
              onValueChange={(value) => {setIsAvailable(value), handleIsAvailable()}}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isAvailable ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />

          </View>
          <View>
            <Text style={styles.subtitle}>Je suis disponible pour aider</Text>
          </View>
        </View>

        <View style={styles.lineStyle} />

        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>HEBERGEMENT</Text>
          </View>

          <View>
            <Switch
              value={isReadyToAccomodate}
              onValueChange={(value) => {setisReadyToAccomodate(value), handleIsReadyToAccomodate()}}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAccomodate ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={{ transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }] }} />
          </View>

        </View>
        <Text style={styles.smallText} >Je peux héberger une personne en cas d'urgence</Text>


        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>TRANSPORT</Text>
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
        <Text style={styles.smallText}>Je peux véhiculer une personne en cas d'urgence</Text>


        <View style={styles.optionhelpcontainer}>

          <View>
            <Text style={styles.subtitle}>ACCOMPAGNEMENT</Text>
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
        <Text style={styles.smallText} >Je peux assister une personne en cas d'urgence</Text>

      </View>

      <View style={styles.lineStyle} />

      <View style={styles.userBadgeContainer}>
        <Text style={styles.subtitle}>MES BADGES :</Text>

        <View style={styles.badgeContainer}>
          <FontAwesome name='trophy' size={40} color='green' />
          <FontAwesome name='trophy' size={40} color='blue' />
          <FontAwesome name='trophy' size={40} color='purple' />
          <FontAwesome name='trophy' size={40} color='gold' />
        </View>
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
    paddingLeft: 20,
    paddingRight: 20,
  },

  topprofilContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    flexDirection: 'row',
  },

  profilePic: {
    width: 40,
    height: 40,
  },

  profilName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    width: 300,
  }
  ,
  profilContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  readytohelpcontainer: {
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },

  optionhelpcontainer: {
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },

  userBadgeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
    width: '70%',
  },

  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5CA4A9',
  },

  smallText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    backgroundColor: 'white',
    width: '90%',

  },

  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#EC6E5B',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
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

  lineStyle: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: 'black',
    margin: 10,
    alignSelf: 'center'
  },
});