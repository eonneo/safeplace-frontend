import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "@use-expo/font";
import * as SMS from "expo-sms";
import { useSelector } from "react-redux";

export default function PoliceScreen({ navigation }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.user.value);
  const PlaceholderImage = require("../../assets/Emergencypic.png");

  // pour utilisation installer d'abord => expo install expo-sms

  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  // Enregistrer ci-dessous le numéro de téléphone + Message
  const sendSms = async () => {
    const { result } = await SMS.sendSMSAsync(
      ["0665331020"],
      `Hello ${user.prenom} need your Help, please find below more details`
    );
    console.log(result);
  };

  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${0666505366}";
    } else {
      phoneNumber = "telprompt:${0666505366}";
    }

    Linking.openURL(phoneNumber);
  };

  // Font
  const [isLoaded] = useFonts({
    OpenSans: require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    Raleway: require("../../assets/Raleway/static/Raleway-Regular.ttf"),
  });
  if (!isLoaded) {
    return <View />;
  }
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate("Profil")}
        >
          <Text style={styles.nameText}>{user.prenom}</Text>
          <Image
            source={{ uri: `${user.avatarUri}` }}
            style={styles.profilePic}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>En cas d'urgence</Text>

        <View style={styles.lineStyle} />
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.disconnectButton}
            activeOpacity={0.9}
            onPress={() => sendSms()}
          >
            <Text style={styles.disconnectText}>Envoyer SMS Police</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.disconnectButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("EmergencyNumbScreen")}
          >
            <Text style={styles.disconnectText}>Numéros d'urgence</Text>
          </TouchableOpacity>
        </View>
       
        <Image source={PlaceholderImage} style={styles.homePic}></Image>

        <View style={styles.lineStyle} />
      </SafeAreaView>
    </ScrollView>
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
  },

  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameText: {
    width: "80%",
    fontSize: 24,
    color: "#33355C",
    fontWeight: "400",
    fontFamily: "Raleway",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
  lineStyle: {
    borderWidth: 0.5,
    width: "80%",
    borderColor: "#33355C",
    margin: 10,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
  },


  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    justifyContent: "flex-start",
    fontFamily: "Raleway",
    color: "#5CA4A9",
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#33355C",
    width: "100%",
    fontFamily: "OpenSans",
  },
  disconnectButton: {
    marginTop: 20,
    marginBottom: 20,
    width: 176,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#E4513D",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  disconnectText: {
    color: "#FFFFFF",
    fontFamily: "OpenSans",
    fontWeight: "bold",
    fontSize: 20,
  },
  homePic: {
    flex: 1,
    resizeMode: 'contain'
  },
});

//   style={styles.container}
//   behavior={Platform.OS === "ios" ? "padding" : "height"}
// >
//   <Text style={styles.title}> Emergency page </Text>

//   <TouchableOpacity
//     style={styles.button}
//     activeOpacity={0.9}
//     onPress={() => sendSms()}
//   >
//     <Text style={styles.textButton}>Envoyer un message d'urgence</Text>
//   </TouchableOpacity>

//   <TouchableOpacity
//     style={styles.button}
//     activeOpacity={0.9}
//     onPress={() => navigation.navigate("EmergencyNumbScreen")}
//   >
//     <Text style={styles.textButton}>Test affichage numéros d'urgences</Text>
//   </TouchableOpacity>
// </SafeAreaView>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: "100%",
//     height: "50%",
//   },
//   title: {
//     width: "80%",
//     fontSize: 38,
//     fontWeight: "600",
//     fontFamily: "OpenSans",
//     textAlign: "center",
//   },

//   input: {
//     width: "80%",
//     marginTop: 25,
//     borderBottomColor: "#EC6E5B",
//     borderBottomWidth: 1,
//     fontSize: 20,
//   },

//   button: {
//     marginTop: 10,
//     width: 300,
//     height: 48,
//     borderRadius: 10,
//     backgroundColor: "#33355C",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textButton: {
//     color: "#ffffff",
//     fontFamily: "Raleway",
//     height: 30,
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });
