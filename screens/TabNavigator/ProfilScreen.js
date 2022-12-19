import {
  Switch,
  StyleSheet,
  Text,
  View,
  Link,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleAvailable, handleAccomodate, handleReadyToLift, handleReadyToAssist, handleReadyToMove, handleComeToMe } from '../../reducers/users';

import { useFonts } from '@use-expo/font';

import IP from '../../IPAdress';






export default function SettingsScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  console.log(user.avatarUri)
  //  const PlaceholderImage = require(user.avatarUri);

  const dispatch = useDispatch();


  // Controle des switchs
  const [isAvailable, setIsAvailable] = useState(false);
  const [isReadyToAccomodate, setisReadyToAccomodate] = useState(false);
  const [isReadyToLift, setisReadyToLift] = useState(false);
  const [isReadyToAssist, setisReadyToAssist] = useState(false);
  const [isReadyToMove, setisReadyToMove] = useState(false);
  const [mustComeToMe, setMustComeToMe] = useState(false);
  console.log(isAvailable)

  const handleIsAvailable = () => {
    // console.log('switch', isAvailable)
    fetch(`http://${IP}:3000/users/isavailable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, isAvailable: !isAvailable }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
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
      body: JSON.stringify({ email: user.email, hebergement: !isReadyToAccomodate }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
          console.log('hebergement status updated in DB')
          dispatch(handleAccomodate(!isReadyToAccomodate))
        }

      })
  }

  const handleIsReadyToLift = () => {
    // console.log('switch', isReadyToLift)
    fetch(`http://${IP}:3000/users/transport`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, transport: !isReadyToLift }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
          console.log('transport status updated in DB')
          dispatch(handleReadyToLift(!isReadyToLift))
        }

      })
  }

  const handleIsReadyToAssist = () => {
    // console.log('switch', isReadyToAssist)
    fetch(`http://${IP}:3000/users/accompagnementdistance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, accompagnementDistance: !isReadyToAssist }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
          console.log('accompagnementdistance status updated in DB')
          dispatch(handleReadyToAssist(!isReadyToAssist))
        }

      })
  }

  const handleIsReadyToMove = () => {
    // console.log('switch', isReadyToMove)
    fetch(`http://${IP}:3000/users/aller`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, aller: !isReadyToMove }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
          console.log('aller status updated in DB')
          dispatch(handleReadyToMove(!isReadyToMove))
        }

      })
  }

  const handleMustComeToMe = () => {
    // console.log('switch', mustComeToMe)
    fetch(`http://${IP}:3000/users/venir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, venir: !mustComeToMe }),
    }).then(response => response.json())
      .then(updateStatus => {
        if (updateStatus.result) {
          console.log('venir status updated in DB')
          dispatch(handleComeToMe(!mustComeToMe))
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
    <ScrollView>
      <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('SettingsStack')}>
          <Text style={styles.nameText}>{user.prenom}</Text>
          <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Mon profil</Text>
        <View style={styles.availableContainer}>
          <Switch
            value={isAvailable}
            onValueChange={(value) => { setIsAvailable(value), handleIsAvailable() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isAvailable ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
          <Text style={styles.subtitle}>Je suis disponible pour aider</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Accueil à domicile</Text>
            <Text style={styles.smallText} >Je peux accueillir une personne en cas d'urgence</Text>
          </View>
          <Switch
            value={isReadyToAccomodate}
            onValueChange={(value) => { setisReadyToAccomodate(value), handleIsReadyToAccomodate() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToAccomodate ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Transport</Text>
            <Text style={styles.smallText}>Je peux véhiculer une personne en cas d'urgence</Text>
          </View>
          <Switch
            value={isReadyToLift}
            onValueChange={(value) => { setisReadyToLift(value), handleIsReadyToLift() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToLift ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Accompagnement à distance</Text>
            <Text style={styles.smallText} >Je peux assister une personne en cas d'urgence</Text>
          </View>
          <Switch
            value={isReadyToAssist}
            onValueChange={(value) => { setisReadyToAssist(value), handleIsReadyToAssist() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToAssist ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Déplacement</Text>
            <Text style={styles.smallText} >Je peux rejoindre les personnes qui me demandent de l'aide</Text>
          </View>
          <Switch
            value={isReadyToMove}
            onValueChange={(value) => { setisReadyToMove(value), handleIsReadyToMove() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={isReadyToMove ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Non mobile</Text>
            <Text style={styles.smallText} >Les personnes que j'aide doivent venir vers moi</Text>
          </View>
          <Switch
            value={mustComeToMe}
            onValueChange={(value) => { setMustComeToMe(value), handleMustComeToMe() }}
            trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
            thumbColor={mustComeToMe ? "white" : "white"}
            ios_backgroundColor="#e5eadf"
            style={styles.switch} />
        </View>
        <View style={styles.lineStyle} />

        <View style={styles.userBadgeContainer}>
          <Text style={styles.subtitle}>MES BADGES :</Text>

          <View style={styles.badgeContainer}>
            <FontAwesome name='trophy' size={40} color='#33355C' />
            <FontAwesome name='trophy' size={40} color='#5CA4A9' />
            <FontAwesome name='trophy' size={40} color='#FFA647' />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    paddingTop: 10,
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    textAlign: 'center',
    color: "#33355C",
    fontFamily: 'OpenSans',
    paddingTop: 20,
    paddingBottom: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: "#33355C",
    margin: 10,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  profilContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  availableContainer: {
    flex: 0.5,
    flexDirection: 'row',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    justifyContent: 'center',
    paddingBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'flex-start',
    fontFamily: 'Raleway',
    color: '#5CA4A9',
  },
  smallText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#33355C",
    width: '100%',
    fontFamily: 'OpenSans',
  },
  switch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
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
});