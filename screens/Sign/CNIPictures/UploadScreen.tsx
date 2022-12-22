import { SafeAreaView, 
  StatusBar, 
  Image,
  Button, 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,  
  TextInput, 
  TouchableOpacity 
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useFonts } from '@use-expo/font';

export default function UploadScreen({ navigation }) {

  const homePic = require("../../../assets/upload.png");

  const [isLoaded] = useFonts({
    'OpenSans': require("../../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <View />
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.header}>
          <FontAwesome
              name="arrow-left"
              size={25}
              color="#33355C"
              onPress={() => navigation.navigate("Signup")}
          />
          <Text style={styles.headerTitle}>Welcome to Safe Place</Text>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image source={homePic} style={styles.homePic}></Image>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Pour ta sécurité, nous avons besoin d’une copie d'une pièce d’identité</Text>
        <Text style={styles.title}>Envoie ta pièce d'identité:</Text>
        <TouchableOpacity style={styles.button1} activeOpacity={0.9} onPress={() => navigation.navigate('CNIRecto')}>
          <FontAwesome name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  topContent: {
    flex: 1,
    marginTop: 20,
    width: '80%',
},
header: {
    alignItems: "center",
    flexDirection: "row",
},
headerTitle: {
  fontSize: 24,
  color: "#5CA4A9",
  marginLeft: 10,
  fontFamily: 'Raleway'
},
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Raleway',
    color: "#33355C",
  },
  imgContainer: {
    flex: 1,
    width: '87%',
    height: '50%',
    alignContent: 'center',
    justifyContent: 'flex-end',
    paddingTop: 70,
    
  },
  homePic: {
    resizeMode: "contain",
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button1: {
    marginTop: 20,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
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