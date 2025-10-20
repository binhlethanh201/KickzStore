import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuNavigator from "./MenuNavigator";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Dùng MenuNavigator làm màn hình chính */}
      <Stack.Screen
        name="MainMenu"
        component={MenuNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Chi tiết sản phẩm" }}
      />
    </Stack.Navigator>
  );
}
