import { Image, StyleSheet, Text, View, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function EmergencyNumbScreen({ navigation }) {


    // Fonctions pour declencher un appel on click 
    const makeCallToPolice = () => {
        let phoneNumber = '17';
        if (Platform.OS === 'android') {
            phoneNumber = (`tel:${phoneNumber}`);
        } else {
            phoneNumber = (`telprompt:${phoneNumber}`);
        }
        Linking.openURL(phoneNumber);
    };

    const makeCallToSamu = () => {
        let phoneNumber = '15';
        if (Platform.OS === 'android') {
            phoneNumber = (`tel:${phoneNumber}`);
        } else {
            phoneNumber = (`telprompt:${phoneNumber}`);
        }
        Linking.openURL(phoneNumber);
    };

    const makeCallToPompier = () => {
        let phoneNumber = '18';
        if (Platform.OS === 'android') {
            phoneNumber = (`tel:${phoneNumber}`);
        } else {
            phoneNumber = (`telprompt:${phoneNumber}`);
        }
        Linking.openURL(phoneNumber);
    };

    const makeCallToHelpLine = () => {
        let phoneNumber = '3919';
        if (Platform.OS === 'android') {
            phoneNumber = (`tel:${phoneNumber}`);
        } else {
            phoneNumber = (`telprompt:${phoneNumber}`);
        }
        Linking.openURL(phoneNumber);
    };

    const [isLoaded] = useFonts({
        'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
        'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
    if (!isLoaded) {
        return <View />
    }
    return (


        <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.containerText}>
                <Text style={styles.title}>Numéros d'urgence à connaitre</Text>
                <Text style={styles.paragraphe}  >Accessible gratuitement partout à travers la France,
                    les numéros d'urgences ci-dessous vous permettrons de contacter directement
                    les autorités en cas d'urgence</Text>
                <View style={styles.waitContainer}>
                    <Image source={require('../../assets/carou2.png')}></Image>
                </View>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.subtitle}>Police Secours</Text>
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => makeCallToPolice()}>
                            <FontAwesome name='phone' size={40} color='#5CA4A9' />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.subtitle}>Samu</Text>
                    </View>

                    <View>
                        <View>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => makeCallToSamu()}>
                                <FontAwesome name='phone' size={40} color='#5CA4A9' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.subtitle}>Pompier</Text>
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => makeCallToPompier()}>
                            <FontAwesome name='phone' size={40} color='#5CA4A9' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.subtitle}>Femmes victimes de violence</Text>
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => makeCallToHelpLine()}>
                            <FontAwesome name='phone' size={40} color='#5CA4A9' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.contentContainer}>

                    <View>
                        <Text style={styles.subtitle}>Site d'information sur les violences </Text>
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => Linking.openURL('https://www.service-public.fr/particuliers/vosdroits/F12544')}>
                            <FontAwesome name='link' size={30} color='#33355C' />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.goBack()}>
                    <Text style={styles.textButton}>Retour</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerText: {
        flex: 2,
        width: '90%',
        //backgroundColor: 'green',
        alignContent: 'center',
        marginTop: 50,
    },

    title: {
        fontSize: 24,
        color: "#5CA4A9",
        fontWeight: '900',
        textAlign: 'center',
        fontFamily: 'Raleway',
        marginBottom: 10,
    },

    paragraphe: {
        fontSize: 16,
        color: "#33355C",
        fontFamily: 'OpenSans',
        textAlign: 'justify',
    },

    mainContainer: {
        flex: 1,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: 50,
        marginBottom: 10,
    },

    contentContainer: {
        flexDirection: 'row',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        margin: 5,
        //backgroundColor: 'pink',
    },

    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#33355C',
        fontFamily: 'OpenSans',
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
      
    button: {
        marginTop: 30,
        width: 300,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#33355C",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 70,
    },
    
    textButton: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans',
        fontWeight: "bold",
        fontSize: 24,
    },

}); 