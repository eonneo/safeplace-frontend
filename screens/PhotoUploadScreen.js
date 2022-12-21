import { 
    Image,
    Button,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import IP from "../IPAdress";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { useFonts } from '@use-expo/font';

export default function PhotoUploadScreen({ navigation }) {

    const [hasPermission, setHasPermission] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(false);

    const user = useSelector((state) => state.user.value);

    // Demande l'autorisation de l'utilisateur pour accéder à ses photos
    useEffect(() => {
        (async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setHasPermission(status === "granted");
    })();
  }, []);

  const selectImage = async () => {
    // Ouvre la bibliothèque de photos de l'utilisateur et sélectionne une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  
    if (!result.canceled) {
      //console.log('result:',result)
      // Si l'utilisateur a sélectionné une image, récupère l'URL de l'image
      setImageUrl(result.uri);
      //console.log('image:',imageUrl)
      // afficher l'image sur l'écran
      setUploadedImage(true);
    }
  }

  //envoyer la photo sur cloudinary et modifier l'adresse dans la bd
  const validateImage = () => {

    const formData = new FormData();

    formData.append("photoProfil", {
      uri: imageUrl,
      name: "photoProfil.jpg",
      type: "image/jpeg",
    });

    //console.log('formdata:' , formData)

    fetch(`http://${IP}:3000/upload`, {
      method: "POST",
      body: formData,
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('image data:', data.result)
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
            }
          })
        }
      });

  }

    const [isLoaded] = useFonts({
        'OpenSans': require("../assets/OpenSans/OpenSans-Regular.ttf"),
        'Raleway': require('../assets/Raleway/static/Raleway-Regular.ttf')
    });
    if (!isLoaded) {
        return <View />;
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('ProfilStack')}>
                <Text style={styles.nameText}>{user.prenom}</Text>
                <Image source={{ uri: `${user.avatarUri}` }} style={styles.profilePic}></Image>
            </TouchableOpacity>
            <Text style={styles.title} >Modifier la photo de profil</Text>
            <Text style={styles.text} >Merci de choisir une photo récente de votre visage, de face</Text>
            <TouchableOpacity style={styles.button3} onPress={() => selectImage()}>
                <Text style={styles.text3} >Upload</Text>
            </TouchableOpacity>
            {uploadedImage && (
                <View style={styles.imageContainer} >
                    <Image
                        source={{ uri: `${imageUrl}` }}
                        style={styles.image}
                    />
                    <TouchableOpacity style={styles.button3} onPress={() => validateImage() && navigation.navigate('ProfilStack')}>
                        <Text style={styles.text3} >Valider</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 35,
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
    button3: {
        marginTop: 10,
        marginBottom: 10,
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
      title: {
        width: '80%',
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 10,
        color: "#33355C",
        textAlign: 'center',
        fontFamily: 'Raleway',
        paddingTop: 20,
      },
      text: {
        width: '80%',
        fontSize: 16,
        fontWeight: '400',
        paddingBottom: 10,
        color: "#33355C",
        textAlign: 'center',
        fontFamily: 'Raleway',
        paddingTop: 10,
      },
      imageContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        width: 300, 
        height: 300, 
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
})