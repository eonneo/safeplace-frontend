import { Image, 
  Button, 
  StyleSheet, 
  Text, 
  View, 
  KeyboardAvoidingView,  
  TextInput, 
  TouchableOpacity,
  ScrollView } from 'react-native';

export default function CarrouselScreen({ navigation }) {

  // const imagesData = [
  //   "https://unsplash.com/fr/photos/Zyx1bK9mqmA",
  //   "https://unsplash.com/fr/photos/p7XunYuC17Q",
  //   "https://unsplash.com/fr/photos/D1E7W9AHE40",
  //   "https://unsplash.com/fr/photos/UOwvwZ9Dy6w",
  //   "https://unsplash.com/fr/photos/ATlRqTCbvV4",
  // ]

  // const images = imagesData.map((data, i) => {
  //   //console.log(data);
  //   return (
  //     <Image
  //       key={i}
  //       source={{uri: data}}
  //       style={styles.image}>
  //     </Image>
  //   );
  // });
  // console.log(images)

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Welcome to SAFE PLACE</Text>
      {/* <View style={styles.carouselContainer}>
        <ScrollView 
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel} >
              {images}
        </ScrollView>
      </View> */}
      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textButton}>Naviguer jusqu'a la page Login</Text>
      </TouchableOpacity>
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
    carouselContainer: {
      flex: 1,
      width: "100%",
      height: "70%",
      borderColor: "#05286F",
      borderStyle: "solid",
      borderWidth: 2,
      padding: 10,
    },
    carousel: {
      flex: 1,
      borderColor: "#DC0F0F",
      borderStyle: "solid",
      borderWidth: 2,
    },
    image: {
      borderColor: "#0FDB94",
      borderStyle: "solid",
      borderWidth: 2,
    },
    title: {
      width: '80%',
      fontSize: 36,
      fontWeight: '600',
    },
    input: {
      width: '80%',
      marginTop: 25,
      borderBottomColor: 'vl',
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
   });