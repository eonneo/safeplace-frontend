import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, } from 'react-redux';

export default function AccountConfirmScreen({ navigation }) {

  const email = useSelector((state) => state.signup.value.email)

  const handleNext = () => {
    console.log('btn next')
    fetch('http://192.168.42.89:3000/users/isconnected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, isConnected: true }),
    }).then(response => response.json())
      .then(updateStatus => {
        console.log('status isConnected à jour en bdd')
        navigation.navigate('TabNavigator', { screen: 'Home' })
      })

  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.header}>
        <FontAwesome name='arrow-left' size={25} color='#000000' onPress={() => navigation.navigate('Selfie')} />
        <Text style={styles.title}>    Welcome to Safe Place</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.title}>Nous vous confirmons la création de votre compte sur SAFE PLACE</Text>
      </View>


      <View style={styles.container2}>

        <Text style={styles.subtitle}  >
          Cliquez sur le bouton ci-dessous pour commencer la navigation sur l'application.
        </Text>

        <Text style={styles.subtitle}  >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

      </View>

      <View style={styles.container3}>

        <TouchableOpacity style={styles.button1} activeOpacity={0.9} onPress={() => handleNext()}>

          <Text style={styles.textButton}>Next</Text>
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

  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },

  container1: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  container2: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },

  container3: {
    flex: 3,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },

  image: {
    width: '100%',
    height: '50%',
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#5CA4A9',

  },

  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 5,
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
});