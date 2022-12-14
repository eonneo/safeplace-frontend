import { SafeAreaView, 
    StatusBar, 
    Button, 
    StyleSheet, 
    Text, 
    View, 
    KeyboardAvoidingView,  
    TextInput, 
    TouchableOpacity 
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
  
export default function CNIVerso({ navigation }) {

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
                <FontAwesome name='arrow-left' size={25} color='#000000' />
                <Text style={styles.headerTitle}>Welcome to Safe Place</Text>
            </View>
                <Text>Ecran photo</Text>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    button1: {
        marginTop: 10,
        width: 176,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#33355C",
        alignItems: "center",
        justifyContent: "center",
    },
    textButton1: {
        color: "#FFFFFF",
        fontFamily: 'OpenSans',
        fontWeight: "bold",
        fontSize: 20,
    },
});