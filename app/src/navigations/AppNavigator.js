import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import CheckoutScreen from "../screens/Cart/CheckoutScreen";
import PaymentScreen from "../screens/Cart/PaymentScreen";
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
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true, title: "Checkout" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: true, title: "Payment" }}
      />
    </Stack.Navigator>
  );
}
