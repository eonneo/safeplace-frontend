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
      <View style={styles.topprofilContainer}>
        <View>
          <Text style={styles.profilName}>  {user.prenom}</Text>
        </View>
        <View>
          <Image source={PlaceholderImage} style={styles.profilePic}></Image>
        </View>

      </View>

      <View style={styles.profilContainer}>
        <Text style={styles.title}>Paramètres</Text>

        <View style={styles.lineStyle} />
        <ScrollView>

          <View style={styles.optionhelpcontainer}>
            <View>
              <Text style={styles.subtitle}>Notifications</Text>
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
          <Text style={styles.smallText} >Je permets à l'équipe de Safe Place de m'envoyer des notifications</Text>


          <View style={styles.optionhelpcontainer}>

            <View>
              <Text style={styles.subtitle}>Setting 1</Text>
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
          <Text style={styles.smallText}>Texte setting</Text>


          <View style={styles.optionhelpcontainer}>

            <View>
              <Text style={styles.subtitle}>Setting 2</Text>
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
          <Text style={styles.smallText} >Texte setting</Text>


          <View style={styles.optionhelpcontainer}>

            <View>
              <Text style={styles.subtitle}>Setting 3</Text>
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
          <Text style={styles.smallText} >Texte setting</Text>

          <TouchableOpacity style={styles.buttonRed} activeOpacity={0.9} onPress={() => handleLogout()}>
        <Text style={styles.text5}>Se déconnecter</Text>
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
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  topprofilContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profilePic: {
    width: 40,
    height: 40,
  },

  profilName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  }
  ,
  profilContainer: {
    flex: 4,
    width: '100%',
  },

  readytohelpcontainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
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
    width: '100%',
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
    width: '50%',
  },

  image: {
    width: '100%',
    height: '50%',
  },
  title: {
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
    width: '80%',
  },

  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#EC6E5B',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  buttonRed: {
    marginTop: 10,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center'
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  text5: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },

  lineStyle: {
    borderWidth: 0.5,
    width: '80%',
    borderColor: 'black',
    margin: 10,
    alignSelf: 'center'
  },
});