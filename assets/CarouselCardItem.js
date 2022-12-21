import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselCardItem = ({ item, index }) => {

  return (
    <View style={styles.container} key={index}>
      <Image source={item.imgUrl} style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 6,
    height: '80%',
    width: ITEM_WIDTH,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 10,
    

  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
    alignItems:'center',
    resizeMode: 'contain',


  },
  header: {
    color: "#5CA4A9",
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    marginBottom: 5,
  },
  body: {
    color: "#33355C",
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'justify',
  },
});

export default CarouselCardItem;
