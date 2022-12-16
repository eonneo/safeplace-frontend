import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelperConfirmationScreen({ navigation }) {
  const PlaceholderImage = require("../../assets/Vector.png");


  //récupérer les données du store
  const user = useSelector((state) => state.user.value);

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!isLoaded) {
    return <View />
  }
  return (

    <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.profilName}> Bonjour {user.prenom}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Settings')}>
          <Image source={PlaceholderImage} style={styles.profilePic} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textNotification}>
        <Text style={styles.title}>Jane a accepté ta proposition d'aide !</Text>
      </View>

      <View style={styles.waitContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HelperContact")}>
        <Text style={styles.textButton}>CONTACTER JANE</Text>
        </TouchableOpacity>
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
  },

  topContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    //backgroundColor: 'red',
    width: '90%',
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
    fontFamily: 'Raleway',
  },

  textNotification: {
    flex: 3,
    //backgroundColor: 'brown',
    width: '90%',
    alignItems: 'center',
  },

  title: {
    width: '80%',
    fontSize: 24,
    color: "#33355C",
    fontWeight: '900',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Raleway',
  },

  waitContainer: {
    flex: 4,
    //backgroundColor: 'yellow',
    width: '90%',
    alignItems: 'center',
  },
 
  button: {
    width: '45%',
    marginTop: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
 
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'OpenSans',
  },


});
