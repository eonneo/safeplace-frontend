import { Image, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IP from "../../IPAdress";

import { useFonts } from '@use-expo/font';

export default function SmsCheckingScreen({ navigation }) {

  //navigation.navigate('Upload')

    const [isLoaded] = useFonts({
        'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
        'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
        });
      if(!isLoaded) {
        return (<View>
        <Text>erreur font</Text>
      </View>)
      }
      return (
        <View>
          <Text>vérifier le numéro de téléphone</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 35,
    },
})