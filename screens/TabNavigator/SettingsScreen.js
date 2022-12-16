import { Switch, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../reducers/users';
import React from 'react';

import { useFonts } from '@use-expo/font';

import IP from '../../IPAdress';

const PlaceholderImage = require("../../assets/Vector.png");


export default function SettingsScreen({ navigation }) {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);


  // Controle des switchs
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isReadyToAccomodate, setisReadyToAccomodate] = React.useState(false);
  const [isReadyToLift, setisReadyToLift] = React.useState(false);
  const [isReadyToAssist, setisReadyToAssist] = React.useState(false);

  const handleLogout = () => {
    console.log('btnlogout')
    console.log(user)

     //  update isconnecte in database
    fetch(`http://${IP}:3000/users/isconnected`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, isConnected: false }),
  }).then(response => response.json())
      .then(updateStatus => {
          console.log('status isConnected à jour en bdd : user logged out')
          dispatch(login({isConnected : false, email: user.email, prenom: user.prenom}))
          navigation.navigate('Carrousel')
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
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={PlaceholderImage} style={styles.profilePic}></Image>
      </TouchableOpacity>
      <View style={styles.profilContainer}>
        <Text style={styles.title}>Paramètres</Text>
        <View style={styles.lineStyle}/>
        <ScrollView style={styles.scrollView}>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>Notifications</Text>
              <Text style={styles.smallText} >Je permets à l'équipe de Safe Place de m'envoyer des notifications</Text>
            </View>
            <Switch
                value={isEnabled}
                onValueChange={(value) => setIsEnabled(value)}
                trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
                thumbColor={isEnabled ? "white" : "white"}
                ios_backgroundColor="#e5eadf"
                style={styles.switch} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>Setting 1</Text>
              <Text style={styles.smallText}>Texte setting</Text>
            </View>
              <Switch
                value={isReadyToAccomodate}
                onValueChange={(value) => setisReadyToAccomodate(value)}
                trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
                thumbColor={isReadyToAccomodate ? "white" : "white"}
                ios_backgroundColor="#e5eadf"
                style={styles.switch} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>Setting 2</Text>
              <Text style={styles.smallText}>Texte setting</Text>
            </View>
            <Switch
              value={isReadyToLift}
              onValueChange={(value) => setisReadyToLift(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToLift ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={styles.switch} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subtitle}>Setting 3</Text>
              <Text style={styles.smallText}>Texte setting</Text>
            </View>
            <Switch
              value={isReadyToAssist}
              onValueChange={(value) => setisReadyToAssist(value)}
              trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
              thumbColor={isReadyToAssist ? "white" : "white"}
              ios_backgroundColor="#e5eadf"
              style={styles.switch} />
          </View>
          <TouchableOpacity style={styles.disconnectButton} activeOpacity={0.9} onPress={() => handleLogout()}>
            <Text style={styles.disconnectText}>Se déconnecter</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    width: 40,
    height: 40,
  },
  profilContainer: {
    flex: 4,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: 'black',
    margin: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
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
    paddingTop: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'flex-start',
    color: '#5CA4A9',
  },
  smallText: {
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  switch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
  },
  disconnectButton: {
    marginTop: 20,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#E4513D",
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center'
  },
  disconnectText: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
});