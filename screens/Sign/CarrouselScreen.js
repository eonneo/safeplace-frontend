import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useFonts } from "@use-expo/font";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../../assets/CarouselCardItem";
import data from "../../assets/data";

export default function CarrouselScreen({ navigation }) {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [isLoaded] = useFonts({
    OpenSans: require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    Raleway: require("../../assets/Raleway/static/Raleway-Regular.ttf"),
  });
  if (!isLoaded) {
    return <View />;
  }
  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.carouselContainer}>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        <Pagination
          containerStyle = {styles.pagination}
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: '#FFA647'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
      <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate("SigninScreen")}>
        <Text style={styles.text4}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate("Account")}>
        <Text style={styles.text4}>account</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    fontFamily: 'OpenSans',
    flex: 1,
    width: "100%",
    height: "0%",
    borderColor: "#05286F",
    marginTop: 30,
    padding: 10,
    alignItems: 'center',

  },

  pagination: {
    resizeMode: 'contain',
  },

  button4: {
    marginTop: 10,
    width: 213,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#5CA4A9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  text4: {
    color: "#FFFFFF",
    fontFamily: 'OpenSans',
    fontWeight: "bold",
    fontSize: 20,
  },
});
