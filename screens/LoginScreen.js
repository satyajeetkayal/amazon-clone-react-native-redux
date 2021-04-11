import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import { auth } from "../firebase";

const { width } = Dimensions.get("window");
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasError = () => {
    if (!email) {
      return email;
    } else {
      return !email.includes("@");
    }
  };

  const signIn = async () => {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          navigation.replace("Shopping");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" />
      <Image
        style={styles.image}
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
        }}
      />
      <View style={styles.loginContainer}>
        <TextInput
          mode="outlined"
          theme={{
            colors: { primary: "#f0c14b", underlineColor: "transparent" },
          }}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <HelperText type="error" visible={hasError()}>
          Username is invalid
        </HelperText>
        <TextInput
          mode="outlined"
          theme={{
            colors: { primary: "#f0c14b", underlineColor: "transparent" },
          }}
          placeholder="Password"
          secureTextEntry
          onSubmitEditing={signIn}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          disabled={hasError() || !email || !password}
          color="#f0c14b"
          mode="contained"
          onPress={signIn}
          style={{ marginTop: 10, padding: 5 }}
        >
          Sign in
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: "center",
    aspectRatio: 2,
  },
  loginContainer: {
    width: width,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
});
