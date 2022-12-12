import { Button, StyleSheet, Text, View, KeyboardAvoidingView,  TextInput, TouchableOpacity } from 'react-native';

export default function HelperConfirmationScreen({ navigation }) {



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <Text style={styles.title}> Helper Confirmation Screen, votre proposition d'aide a été envoyé </Text>

     
     <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('HelperDecline')}>
       <Text style={styles.textButton}>Exemple proposition d'aide déclinée</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('HelperAccept')}>
       <Text style={styles.textButton}>Exemple proposition d'aide acceptée </Text>
     </TouchableOpacity>
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
   });