import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmergencyNumbScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  // Fonctions pour declencher un appel on click
  const makeCallToPolice = () => {
    let phoneNumber = "17";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const makeCallToSamu = () => {
    let phoneNumber = "15";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const makeCallToPompier = () => {
    let phoneNumber = "18";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const makeCallToHelpLine = () => {
    let phoneNumber = "3919";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

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
        <Text style={styles.title}>Numéros d'urgence à connaitre</Text>

        <View style={styles.lineStyle} />
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>
              Accessibles gratuitement partout à travers la France, les numéros
              d'urgences ci-dessous vous permettrons de contacter directement
              les autorités en cas d'urgence.
            </Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <Image
            source={require("../../assets/carou2.png")}
            style={styles.homePic}
          ></Image>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.subtitle}>Police Secours</Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => makeCallToPolice()}
              >
                <FontAwesome name="phone" size={40} color="#FFA647" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.subtitle}>Samu</Text>
            </View>

            <View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => makeCallToSamu()}
                >
                  <FontAwesome name="phone" size={40} color="#FFA647" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.subtitle}>Pompiers</Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => makeCallToPompier()}
              >
                <FontAwesome name="phone" size={40} color="#FFA647" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.subtitle}>Femmes victimes de violence</Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => makeCallToHelpLine()}
              >
                <FontAwesome name="phone" size={40} color="#FFA647" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.subtitle2}>
                Site d'information sur les violences
              </Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  Linking.openURL(
                    "https://www.service-public.fr/particuliers/vosdroits/F12544"
                  )
                }
              >
                <FontAwesome name="link" size={35} color="#33355C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.disconnectButton}
            activeOpacity={0.9}
            onPress={() => sendSms()}
          >
            <Text style={styles.disconnectText}>Retour</Text>
          </TouchableOpacity>
        </View>
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
  containerText: {
    flex: 2,
    alignContent: "center",
    marginTop: 10,
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
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  smallText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#33355C",
    width: "100%",
    fontFamily: "OpenSans",
    textAlign: "justify",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  contentContainer: {
    flexDirection: "row",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EAE2B7",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#33355C",
    fontFamily: "OpenSans",
  },
  subtitle2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#33355C",
    fontFamily: "OpenSans",
    width: "80%",
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  homePic: {
    flex: 1,
    resizeMode: "contain",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
});
