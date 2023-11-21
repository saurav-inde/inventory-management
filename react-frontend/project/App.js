import React from "react";
import UserTypeSelectionScreen from "./screens/userTypeScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./screens/authScreen.jsx";
import HomeScreen from "./screens/home.jsx";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <UserTypeSelectionScreen /> */}
        {/* <Stack.Navigator> */}
        <Stack.Screen
          name="UserType"
          component={UserTypeSelectionScreen}
          options={{ headerTransparent: true }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerTransparent: true }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
