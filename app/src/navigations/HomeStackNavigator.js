import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
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
                // ✅ nếu đến từ Search → quay về Search
                if (route.params?.fromSearch) {
                  navigation.navigate("Search");
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
    </Stack.Navigator>
  );
}
