import {
  StyleSheet,
  Text,
  View,

  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFonts } from "@use-expo/font";

export default function RessourcesScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  // Font
  const [isLoaded] = useFonts({
    OpenSans: require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    Raleway: require("../../assets/Raleway/static/Raleway-Regular.ttf"),
  });
  if (!isLoaded) {
    return <View />;
  }
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate("Profil")}
        >
          <Text style={styles.nameText}>{user.prenom}</Text>
          <Image
            source={{ uri: `${user.avatarUri}` }}
            style={styles.profilePic}
          ></Image>
        </TouchableOpacity>
        <Text style={styles.title}>Helper's Club </Text>

        <View style={styles.lineStyle} />
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Que faire en cas d'urgence ?</Text>
            <Text style={styles.smallText}>
              Alerter la police et la gendarmerie par téléphone Si la personne
              avec qui vous vivez en couple vous fait subir des actes de
              violences conjugales ou menace de le faire, vous pouvez alerter la
              police ou la gendarmerie.
            </Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>
              Comment aider une victime de violences conjugales ?
            </Text>
            <Text style={styles.smallText}>
              Vous n'avez pas besoin de beaucoup parler pour être présent pour
              quelqu'un. Une victime a principalement besoin de confier combien
              ce qui se passe dans son couple est difficile, le poids de son
              isolement, la culpabilité qu'elle ressent. Elle a besoin de rompre
              le secret. Écouter sans jugement est un acte de bienveillance et
              c'est déjà beaucoup.
            </Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>
              Demandez-lui ce que vous pouvez faire pour l'aider
            </Text>
            <Text style={styles.smallText}>
              La violence est liée au pouvoir et au contrôle. Il est primordial
              que les victimes retrouvent leur libre arbitre, décident de ce
              qu'elles souhaitent faire, en toute indépendance. Il peut être
              désastreux de pousser une personne à agir alors qu'elle ne s'en
              sent pas prête (porter plainte, partir du foyer…) Laissez la
              personne suivre son propre rythme. Ne remplacez pas la dépendance
              qu'elle avait à l'homme violent par une dépendance à vous, son
              ami(e), sa collègue, un membre de sa famille…
            </Text>
          </View>
        </View>

        <View style={styles.lineStyle} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameText: {
    width: "80%",
    fontSize: 24,
    color: "#33355C",
    fontWeight: "400",
    fontFamily: "Raleway",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: "600",
    textAlign: "center",
    color: "#33355C",
    fontFamily: "OpenSans",
    paddingTop: 20,
    paddingBottom: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    width: "80%",
    borderColor: "#33355C",
    margin: 10,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
  },

  // scrollView: {
  //   flex: 1,
  //   width: "100%",
  // },
  optionContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    justifyContent: "flex-start",
    fontFamily: "Raleway",
    color: "#5CA4A9",
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    marginBottom: 20,
    color: "#33355C",
    width: "100%",
    fontFamily: "OpenSans",
  },
 
});
