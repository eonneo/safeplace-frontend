import { Button, StyleSheet, Text, View, KeyboardAvoidingView,  Switch, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CguScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = React.useState(false);



    return (
      
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <View style={styles.container1}>
     <Text style={styles.title}>CGU </Text>
    
     <Text>{isEnabled.toString()}</Text>
     <Switch
     style={styles.switch}
        value={isEnabled}
        onValueChange={(value) => setIsEnabled(value)}
        trackColor={{ false: "#E6EBE0", true: "#5CA4A9" }}
        thumbColor={isEnabled ? "#E6EBE0" : "#5CA4A9"}
        ios_backgroundColor="#ff0000"
        style={{ transform:[{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
      />

</View>

<View style={styles.container2}>
     <Text> 
     Lorem ipsum dolor sit amet, consectetur adipiscing elit,
     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.Quis hendrerit dolor magna eget est lorem ipsum dolor. Quam lacus suspendisse faucibus interdum. Nisl suscipit adipiscing bibendum est. Ultrices dui sapien eget mi proin. Ut sem nulla pharetra diam. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Potenti nullam ac tortor vitae purus. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Tellus cras adipiscing enim eu.
     </Text> 

<Text style={styles.text2}>
Veuillez accepter les conditions
générales pour poursuivre
votre inscription</Text>
</View>
<View style={styles.container2}>
     <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('HelperDecline')}>
       <Text style={styles.text1}>J'accepte</Text>
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
    container1: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width:'90%',

    },
    container2: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:'90%',
          },

    container3: {
      flex:1  ,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      width:'90%',
      height:'50%',

    },
    image: {
      width: '100%',
      height: '50%',
    },
    title: {
      width: '100%',
      fontSize: 38,
      fontWeight: '600',
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
    button1: {
      marginTop: 10,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
    },

switch:{
marginLeft:350,
},
    text1: {
      color: "#FFFFFF",
      // fontFamily: ,
      fontWeight: "bold",
      fontSize: 20,
    },
    text2: {
      color: "#000000",
      // fontFamily: ,
      fontWeight: "bold",
      fontSize: 20,
    },

   });