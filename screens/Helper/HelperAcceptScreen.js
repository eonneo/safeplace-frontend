import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelperConfirmationScreen({ navigation }) {
  


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
      <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
        <Text style={styles.nameText}>{user.prenom}</Text>
        <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
      </TouchableOpacity>
        <Text style={styles.title}>Jane a accepté ta proposition d'aide !</Text>
        <Image source={require('../../assets/carou2.png')}/>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HelperContact")}>
        <Text style={styles.textButton}>CONTACTER JANE</Text>
        </TouchableOpacity>
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
    borderRadius: 50,
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
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 70,
    fontFamily: 'Raleway',
  },
  waitContainer: {
    flex: 4,
    //backgroundColor: 'yellow',
    width: '90%',
    alignItems: 'center',
  },
  button: {
    width: 213,
    marginTop: 40,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 70,
  },
  textButton: {
    color: "#FFFFFF",
        fontFamily: 'OpenSans',
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center',
  },
});
