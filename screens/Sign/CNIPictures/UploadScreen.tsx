import { SafeAreaView, 
  StatusBar, 
  Button, 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,  
  TextInput, 
  TouchableOpacity 
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UploadScreen({ navigation }) {

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <FontAwesome name='arrow-left' size={25} color='#000000' onPress={() => navigation.navigate("Signup")} />
        <Text style={styles.headerTitle}>Welcome to Safe Place</Text>
      </View>
      <Text style={styles.title}>Pour ta sécurité, nous avons besoin d’une copie de ta carte d’identité</Text>
      <Text style={styles.title}>Envoie ta pièce d'identité:</Text>
      <TouchableOpacity style={styles.button1} activeOpacity={0.9} onPress={() => navigation.navigate('CNIRecto')}>
        <FontAwesome name="arrow-right" size={24} color="white" />
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
    textAlign: 'center',
    paddingLeft: 15,
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
  button1: {
    marginTop: 10,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton1: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
  button2: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton2: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});