import { Button, StyleSheet, Text, View, KeyboardAvoidingView,  TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SignupScreen({ navigation }) {



  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <FontAwesome name='arrow-left' size={25} color='#000000' />
        <Text style={styles.headerTitle}>    Welcome to Safe Place</Text>
      </View>
      <Text style={styles.title}>Pour ta sécurité, nous avons besoin d’une copie de ta carte d’identité</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('Selfie')}>
        <Text style={styles.textButton}>Naviguer vers authentification par Selfie</Text>
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
    marginTop: 25,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
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