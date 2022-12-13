import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SelfieScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.topContent}>
        <View style={styles.header}>
        <Text style={styles.title}>Welcome to Safe Place</Text>
        </View>
        <Text style={styles.instructions}>Prends un Selfie avec la main droite levée ✋</Text>
        <Text style={styles.explanations}>Tu pourras ensuite la modifier dans ton profil utilisateur.</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Account")}
      >
        <Text style={styles.textButton}>
          Naviguer vers msg confirmation compte
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginBottom: 70,
    // justifyContent: "center",
  },
  topContent: {
    flex: 1,
    marginTop: 50,

  },
  header: {
    alignItems: 'center',
  },
  button: {
    display: "flex",
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 30,
    backgroundColor: "blue",
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    fontSize: 36,
    color: '#5CA4A9',


  },
  instructions: {
    color: '#33355C',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 19,
    marginRight: 19,
  },
  explanations: {
    marginLeft: 19,
    marginRight: 19,
    marginTop: 24,
    color: '#33355C',
    fontSize: 16,
    fontStyle: 'italic'

  },
});
