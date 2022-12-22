import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import IP from "../../IPAdress";

import { useFonts } from "@use-expo/font";

export default function AccountConfirmScreen({ navigation }) {
  const email = useSelector((state) => state.signup.value.email);
  const PlaceholderImage = require("../../assets/homepic4.png");
  const handleNext = () => {
    console.log("btn next");
    fetch(`http://${IP}:3000/users/isconnected`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, isConnected: true }),
    })
      .then((response) => response.json())
      .then((updateStatus) => {
        console.log("status isConnected à jour en bdd");
        navigation.navigate("TabNavigator", { screen: "Home" });
      });
  };

  const [isLoaded] = useFonts({
    OpenSans: require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    Raleway: require("../../assets/Raleway/static/Raleway-Regular.ttf"),
  });
  if (!isLoaded) {
    return <View />;
  }
  return (
<<<<<<< HEAD
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

<View style={styles.header}>
          <FontAwesome
            name="arrow-left"
            size={25}
            color="#33355C"
            onPress={() => navigation.navigate("Selfie")}
          />
          <Text style={styles.title}>Welcome to Safe Place</Text>
        </View>

      <View style={styles.container2}>
        <Text style={styles.titles}>Nous vous confirmons la création de votre compte sur SAFE PLACE</Text>
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


=======
    // <ScrollView>
      <SafeAreaView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        
          <Text style={styles.title}>Bienvenue sur Safe Place</Text>
        
        <View style={styles.lineStyle} />
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>
              Nous vous confirmons la création de votre compte sur SAFE PLACE.
            </Text>
            <Text style={styles.subtitle}>
              Cliquez sur le bouton ci-dessous pour commencer la navigation sur
              l'application.
            </Text>
            <Text style={styles.smallText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>
        <Image source={PlaceholderImage} style={styles.homePic}></Image>
        <View>
        <TouchableOpacity
        style={styles.button5}
        activeOpacity={0.9}
        onPress={() => handleNext()}
      >
        <Text style={styles.text5}>Home</Text>
      </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    // </ScrollView>
>>>>>>> 674e69af4b0a8fabeac73c1291120429b1f58b75
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    fontFamily: 'OpenSans'
  },

  header: {
    flex: 1,
<<<<<<< HEAD
    flexDirection: 'row',
    //backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
=======
    flexDirection: "row",
    backgroundColor: "#cccccc",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
>>>>>>> 674e69af4b0a8fabeac73c1291120429b1f58b75
  },
  optionContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

<<<<<<< HEAD
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
    fontSize: 32,
    textAlign: 'center',
    color: '#5CA4A9',
    marginLeft: 10,
  },

  titles: {
    fontSize: 20,
    textAlign: 'center',
    color: '#5CA4A9',
    marginLeft: 10,
  },

  subtitle: {
=======
  smallText: {
>>>>>>> 674e69af4b0a8fabeac73c1291120429b1f58b75
    fontSize: 14,
    marginBottom: 20,
    color: "#33355C",
    width: "100%",
    fontFamily: "OpenSans",
    textAlign: "justify",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 38,
    fontWeight: "600",
    textAlign: "center",
    color: "#33355C",
    fontFamily: "OpenSans",
    paddingTop: 20,
    paddingBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    justifyContent: "flex-start",
    fontFamily: "Raleway",
    color: "#5CA4A9",
    marginBottom: 10,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: "80%",
    borderColor: "#33355C",
    margin: 10,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
  },

  button5: {
    marginTop: 10,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#FFA647",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
<<<<<<< HEAD

 
  
});
=======
  text5: {
    color: "#FFFFFF",
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 20,
  },
});
>>>>>>> 674e69af4b0a8fabeac73c1291120429b1f58b75
