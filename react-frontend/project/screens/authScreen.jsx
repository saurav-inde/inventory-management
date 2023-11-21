// export default AuthScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AuthButton from "../components/authButton";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleButtonPress = () => {
    if (isLogin) {
      // Handle signin logic
      signin();
    } else {
      // Handle signup logic
      signup();
    }
  };

  const signin = async () => {
    try {
      const response = await fetch("http://172.16.6.100:3000/api/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Authentication successful, navigate to HomeScreen
        navigation.navigate("Home");
      } else {
        // Authentication failed, handle the error (e.g., display an error message)
        console.error("Authentication failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://172.16.6.100:3000/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        // Authentication successful, navigate to HomeScreen
        navigation.navigate("Home");
      } else {
        // Authentication failed, handle the error (e.g., display an error message)
        console.error("Authentication failed:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <View style={styles.container}>
      <Text>{isLogin ? "Sign In" : "Sign Up"}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <AuthButton
        onPress={handleButtonPress}
        title={isLogin ? "Sign In" : "Sign Up"}
      />

      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.toggleButton}>
          {isLogin ? "I am a new user" : "I am already registered"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  toggleButton: {
    color: "black",
    marginTop: 10,
  },
});

export default AuthScreen;
