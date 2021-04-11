import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
} from "react-native";

import { Button, TextInput, HelperText, Snackbar } from "react-native-paper";
import { auth } from "../firebase";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasError = () => {
    if (!email) {
      return email;
    } else {
      return !email.includes("@");
    }
  };

  const register = async () => {
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          navigation.replace("Login");
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
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          theme={{ colors: { primary: "#f0c14b" } }}
          placeholder="Your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          mode="outlined"
          theme={{ colors: { primary: "#f0c14b" } }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <HelperText type="error" padding="none" visible={hasError()}>
          Username is invalid
        </HelperText>
        <TextInput
          mode="outlined"
          theme={{ colors: { primary: "#f0c14b" } }}
          placeholder="Password"
          secureTextEntry
          onSubmitEditing={register}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          onPress={register}
          disabled={hasError() || !email || !name || !password}
          mode="contained"
          style={{ marginTop: 10, padding: 5, borderRadius: 5 }}
          color="#f0c14b"
        >
          Create an account
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6fa",
  },
  image: {
    width: 100,
    height: 100,
    aspectRatio: 2,
    resizeMode: "contain",
  },
  inputContainer: {
    width: width,
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
});
