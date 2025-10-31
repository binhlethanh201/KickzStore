import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";
import ChangePasswordScreen from "../screens/Account/ChangePasswordScreen";
import LoginScreen from "../screens/Account/LoginScreen";
import RegisterScreen from "../screens/Account/RegisterScreen";
import UpdateProfileScreen from "../screens/Account/UpdateProfileScreen";
import CartScreen from "../screens/Cart/CartScreen";
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
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation, route }) => ({
          title: "Product Detail",
          headerBackTitleVisible: false,
          headerTintColor: "#111",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                if (route.params?.fromSearch) {
                  navigation.navigate("MainMenu", { screen: "Search" });
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Text style={{ color: "#111", fontSize: 16 }}>Back</Text>
            </TouchableOpacity>
          ),
        })}
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
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTitle: "Checkout"
        }}
      />
    </Stack.Navigator>
  );
}