import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChangePasswordScreen from "../screens/Account/ChangePasswordScreen";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import UpdateProfileScreen from "../screens/Account/UpdateProfileScreen";
import CheckoutScreen from "../screens/Order/CheckoutScreen";
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
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{ title: "UpdateProfile" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "ChangePassword" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true, title: "Checkout" }}
      />
    </Stack.Navigator>
  );
}
