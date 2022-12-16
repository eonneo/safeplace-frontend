import { Platform, StyleSheet, Text, View, KeyboardAvoidingView,  Linking, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { useFonts } from '@use-expo/font';
import * as SMS from 'expo-sms';
import { useSelector, } from 'react-redux';

export default function PoliceScreen({ navigation }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.user.value);

// pour utilisation installer d'abord => expo install expo-sms
 

  useEffect( () => {
    async function checkAvailability() {
      
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);
  

  // Enregistrer ci-dessous le numéro de téléphone + Message 
  const sendSms = async () => {
  const {result} = await SMS.sendSMSAsync (
  ['0665331020'], `Hello ${user.prenom} need your Help, please find below more details`)
  ;
  
  console.log(result)
  
  
  };

 const makeCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${0666505366}';
    } else {
      phoneNumber = 'telprompt:${0666505366}';
    }

    Linking.openURL(phoneNumber);
  };


  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <View />
  }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <Text style={styles.title}> Emergency page  </Text>

     
     <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => sendSms()}>
       <Text style={styles.textButton}>Envoyer un message d'urgence</Text>
     </TouchableOpacity>

     <View style={styles.container} >
        <TouchableOpacity onPress={() => makeCall()}activeOpacity={0.7} style={styles.touchableButton} >
          <Text style={styles.TextStyle}> Click Here To Dial In Dial Screen</Text>
        </TouchableOpacity>
      </View>

   



   </KeyboardAvoidingView>
   
   
   );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '50%',
    },
    title: {
      width: '80%',
      fontSize: 38,
      fontWeight: '600',
      fontFamily:'OpenSans',
      textAlign:'center',
    },

    input: {
      width: '80%',
      marginTop: 25,
      borderBottomColor: '#EC6E5B',
      borderBottomWidth: 1,
      fontSize: 20,
    },
    
    button: {
      marginTop: 10,
      width: 300,
      height: 48,
      borderRadius: 10,
      backgroundColor: "#33355C",
      alignItems: "center",
      justifyContent: "center",
    },
    textButton: {
      color: '#ffffff',
      fontFamily:'Raleway',
      height: 30,
      fontWeight: '600',
      fontSize: 16,
    },
   });