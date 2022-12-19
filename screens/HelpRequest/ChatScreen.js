import { useEffect, useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Pusher from "pusher-js/react-native";
import IP from "../../IPAdress";

const pusher = new Pusher("66ce8f54593d65620bf6", { cluster: "eu" });

export default function ChatScreen({ navigation, route: { params } }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");



  const scrollViewRef = useRef(null);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://${IP}:3000/users/${user.token}`, { method: "PUT" });
    
    fetch(`http://${IP}:3000/users/message`)
    .then (res => res.json())
    .then(data=> setMessages(data.splice(-20)))

    const subscription = pusher.subscribe("chat");
    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("message", handleReceiveMessage);
    });

    return () =>
      fetch(`http://${IP}:3000/users/${user.token}`, {
        method: "DELETE",
      });
  }, [user.token]);

  const goBack = () => {
    pusher.unsubscribe("chat");
    navigation.goBack();
  };

  const handleReceiveMessage = (data) => {
    setMessages((messages) => [...messages, data]);
  };

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }

    const payload = {
      token: user.token,
      text: messageText,
      prenom: user.prenom,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100000),
    };

    fetch(`http://${IP}:3000/users/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessageText("");
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <MaterialIcons
          name="keyboard-backspace"
          color="#ffffff"
          size={24}
          onPress={() => goBack()}
        />
        <Text style={styles.greetingText}>Welcome {user.prenom} 👋</Text>
      </View>

      <View style={styles.inset}>
        <ScrollView
          style={styles.scroller}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd();
          }}
        >
          {messages.map((message, i) => (
            <View
              key={i}
              style={[
                styles.messageWrapper,
                {
                  ...(message.prenom === user.prenom
                    ? styles.messageSent
                    : styles.messageRecieved),
                },
              ]}
            >
              <Text style={styles.nameText}>{message.prenom}</Text>
              <View
                style={[
                  styles.message,
                  {
                    ...(message.prenom === user.prenom
                      ? styles.messageSentBg
                      : styles.messageRecievedBg),
                  },
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
              <Text style={styles.timeText}>
                {new Date(message.createdAt).getHours()}:
                {String(new Date(message.createdAt).getMinutes()).padStart(
                  2,
                  "0"
                )}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setMessageText(value)}
            value={messageText}
            style={styles.input}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => handleSendMessage()}
            style={styles.sendButton}
          >
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5CA4A9",
  },
  inset: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#F5F7F3",
    // opacity: 0.9,
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#FFA647",
    borderLeftColor: "#ffe099",
    borderRightColor: "#ffe099",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000#",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageSent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSentBg: {
    backgroundColor: "#FFA647",
  },
  messageRecievedBg: {
    backgroundColor: "#EAE2B7",
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
  },
  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#FFA647",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 12,
    marginTop: 2,
    // marginRight: 30,
  },
});
