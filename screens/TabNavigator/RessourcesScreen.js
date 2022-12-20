import { StyleSheet, Text, View, KeyboardAvoidingView,   TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from '@use-expo/font';

export default function RessourcesScreen({ navigation }) {

  const [isLoaded] = useFonts({
    'OpenSans': require("../../assets/OpenSans/OpenSans-Regular.ttf"),
    'Raleway': require('../../assets/Raleway/static/Raleway-Regular.ttf')
    });
  if(!isLoaded) {
    return <View />
  }
    return (
        <SafeAreaView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
<View style={styles.container1}>

     <Text style={styles.title}> Helper's Club  </Text>
     <Text> Et voilou, les supers conseils !!!   </Text>


     </View>
     <View style={styles.container2}>
     <Text style={styles.smalltitle}>Que faire en cas d'urgence ?  </Text>
     <Text style={styles.paragraphe}>
     Alerter la police et la gendarmerie par téléphone
Si la personne avec qui vous vivez en couple vous fait subir des actes de violences conjugales ou menace de le faire, vous pouvez alerter la police ou la gendarmerie.
     </Text>

     <Text style={styles.smalltitle}>Comment aider une victime de violences conjugales ?  </Text>
     <Text style={styles.paragraphe}>
     Vous n’avez pas besoin de beaucoup parler pour être présent pour quelqu’un. Une victime a principalement besoin de confier combien ce qui se passe dans son couple est difficile, le poids de son isolement, la culpabilité qu’elle ressent. Elle a besoin de rompre le secret. Écouter sans jugement est un acte de bienveillance et c’est déjà beaucoup.
     </Text>


     <Text style={styles.smalltitle}>Demandez-lui ce que vous pouvez faire pour l’aider  </Text>
     <Text style={styles.paragraphe}>
     La violence est liée au pouvoir et au contrôle. Il est primordial que les victimes retrouvent leur libre arbitre, décident de ce qu’elles souhaitent faire, en toute indépendance. Il peut être désastreux de pousser une personne à agir alors qu’elle ne s’en sent pas prête (porter plainte, partir du foyer…)
Laissez la personne suivre son propre rythme. Ne remplacez pas la dépendance qu’elle avait à l’homme violent par une dépendance à vous, son ami(e), sa collègue, un membre de sa famille…
     </Text>

    

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

    container1: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
    },

    container2: {
      flex: 3,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',

    },
    
    title: {
      fontSize: 38,
      fontWeight: '600',
      textAlign:'center',
      color:'#5CA4A9',
    },

    smalltitle: {
      marginBottom:5,
      width: '80%',
      fontSize: 24,
      fontWeight: '600',
      textAlign:'left',
      color:'#5CA4A9',

    },

    paragraphe: {
      marginBottom:10,

      width: '80%',
      fontSize: 12,
      fontWeight: '300',
      textAlign:'left',
    },

   });