import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import HelperConfirmRequestScreen from "../HelpRequest/HelperConfirmRequestScreen";
import { useFonts } from "@use-expo/font";
import IP from "../../IPAdress";
import * as Notifications from "expo-notifications";

export default function HomeScreen({ navigation }) {
  //  page HOME
  const user = useSelector((state) => state.user.value);

  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    fetch(`http://${IP}:3000/users`)
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.length);
      });
  }, []);

  //récupérer les données de géolocalisation
  useEffect(() => {
    (async () => {
      //demander la permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      //si permission accordée
      if (status === "granted") {
        //récupérer la localisation tous les 5 minutes
        Location.watchPositionAsync({ timeInterval: 300000 }, (location) => {
          //transmettre les données des dernières coordonnées
          setCurrentPosition(location.coords);

          const geolocInfos = {
            email: user.email,
            lastPosition: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          };
          console.log(geolocInfos);
          //envoyer les coordonnées à la bd
          fetch(`http://${IP}:3000/users/lastposition`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geolocInfos),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                console.log("last position added to DB") &&
                  dispatch(addPosition(currentPosition));
              } else {
                console.log("error: last position not added to DB");
              }
            });
        });
      }
    })();
  }, []);

  // Système de notifs
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const schedulePushNotification = async () => {
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "SafePlace",
        body: `${user.prenom} needs Help around you !`,
        data: { data: "None" },
      },
      trigger: { seconds: 1 },
    });
    
  };

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        let token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("> Expo token :", token);
        setExpoPushToken(token);

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("response", response);
          });
        return () => {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        };
      }
    })();
  }, []);
  // handle click on notification
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (lastNotificationResponse) {
      navigation.navigate("HelpermoreInfo");
    }
  }, [lastNotificationResponse]);

  // photo homepage
  const homePic = require("../../assets/mains.jpg");

  const [isLoaded] = useFonts({
    OpenSans: require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    Raleway: require("../../assets/Raleway/static/Raleway-Regular.ttf"),
  });

  if (!isLoaded) {
    return <View />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title1}>Bonjour {user.prenom}</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("HelpermoreInfo")}
      >
        <Text style={styles.textButton}>naviguer vers Helper screens</Text>
      </TouchableOpacity>
      <Text style={styles.title2}>{totalUsers} utilisateurs autour de toi</Text>
      <Text style={styles.title2}>
        Déjà x utilisateurs sauvé.e.s depuis le début de Safe Place
      </Text>
      <Image source={homePic} style={styles.homePic}></Image>
      <TouchableOpacity
        onPress={() => {async () => {await schedulePushNotification()}, navigation.navigate("HelperLocation")}}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["#E4513D", "#FFA647"]}
          style={styles.SosButton}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.SosText}>SOS</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    Margin: 0,
  },
  homePic: {
    width: "100%",
    height: "50%",
    marginTop: 20,
    resizeMode: "contain",
  },
  title1: {
    width: "80%",
    fontSize: 36,
    fontWeight: "600",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    color: "#33355C",
    padding: 0,
    marginTop: 40,
    marginBottom: 10,
    fontFamily: "Raleway",
  },
  title2: {
    width: "80%",
    fontSize: 20,
    fontWeight: "400",
    color: "#33355C",
    padding: 0,
    marginTop: 10,
    fontFamily: "Raleway",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#EC6E5B",
    borderBottomWidth: 1,
    fontSize: 20,
  },
  SosButton: {
    width: 199,
    height: 199,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    position: "absolute",
    top: -110,
    left: "-27%",
    zIndex: 1,
  },
  SosText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 64,
    alignItems: "center",
    fontFamily: "OpenSans",
  },

  button: {
    marginTop: 10,
    width: 300,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#ffffff",
    fontFamily: "Raleway",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },

  containerButton: {
    flex: 1,
    marginTop: 100,
  },
});
