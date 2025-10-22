import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import MenuNavigator from "./MenuNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainMenu"
        component={MenuNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
}
