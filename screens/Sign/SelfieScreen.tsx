import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import IP from "../../IPAdress";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { addSelfie } from "../../reducers/users";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

import { useFonts } from '@use-expo/font';

export default function SelfieScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state: any) => state.signup.value);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [button, setButton] = useState(false);
  let cameraRef: any = useRef(null);

  console.log(user)
  // cameraRef && isFocused

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({
      quality: 0.3,
      exif: false,
      skipProcessing: true,
    });


    const formData: any = new FormData();

    formData.append("photoSelfie", {
      uri: photo.uri,
      name: "photoSelfie.jpg",
      type: "image/jpeg",
    });

    fetch(`http://${IP}:3000/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // updating avatarUri to db
          fetch(`http://${IP}:3000/users/uri`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, avatarUri: data.url }),
          }).then(response => response.json())
          .then(updatedUri => {
            if(updatedUri.result){
              console.log('avatarUri updated in DB :', data.url)
              data.result && dispatch(addSelfie(data.url));
              setButton(true);
            }
          })
        }
      });
  };

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
  });
  if (!hasPermission || !isFocused || !isLoaded) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
            name="arrow-left"
            size={25}
            color="#33355C"
            onPress={() => navigation.navigate("Signup")}
        />
        <Text style={styles.headerTitle}>Welcome to Safe Place</Text>
      </View>
      <View>
        <Text style={styles.instructions}>
          Prends un Selfie avec la main droite levée ✋
        </Text>
        <Text style={styles.explanations}>
          Tu pourras ensuite la modifier dans ton profil utilisateur.
        </Text>
      </View>
      <Camera
        type={type}
        flashMode={flashMode}
        ref={(ref: any) => (cameraRef = ref)}
        style={styles.camera}
      >
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() =>
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )
            }
            style={styles.flashButton}
          >
            <FontAwesome name="rotate-right" size={25} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setFlashMode(
                flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
              )
            }
            style={styles.flashButton}
          >
            <FontAwesome
              name="flash"
              size={25}
              color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.snapContainer}>
          <TouchableOpacity onPress={() => cameraRef && isFocused && takePicture()}>
            <FontAwesome name="circle-thin" size={95} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </Camera>
      <View>
        {/* Bouton conditionnel si user a pris selfie */}
        {button && (
          <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Account')}>
            <Text
              style={styles.text3}
            >
              Valider
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 10,
        alignItems: "center",
        width: "100%",
        height: "100%"
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  flashButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 35,
},
  header: {
    flex: 1,
    width: '80%',
    flexDirection: "row",
    paddingTop: 10,
},
headerTitle: {
    fontSize: 24,
    color: "#5CA4A9",
    marginLeft: 10,
    fontFamily: 'Raleway'
},
textContainer: {
  width: "90%",
  backgroundColor: '#ffffff',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  paddingBottom: 10,
},
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    // marginTop: 30,
    backgroundColor: "blue",
    borderRadius: 10,
    // marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    color: "#5CA4A9",
    marginLeft: 10,
  },
  instructions: {
    color: "#33355C",
    fontSize: 24,
    fontFamily: 'Raleway',
},
explanations: {
    marginTop: 10,
    color: "#33355C",
    fontFamily: 'Raleway',
    fontSize: 16,
    paddingBottom: 10,
},
  button3: {
    marginTop: 10,
    marginBottom: 70,
    width: 213,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#33355C",
    alignItems: "center",
    justifyContent: "center",
  },
  text3: {
    color: "#FFFFFF",
    // fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
});
