import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AccountScreen from "../screens/Account/AccountScreen";
import CartScreen from "../screens/Cart/CartScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import WishlistScreen from "../screens/Wishlist/WishlistScreen";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

export default function MenuNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#ddd",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Search":
              iconName = "search-outline";
              break;
            case "Wishlist":
              iconName = "heart-outline";
              break;
            case "Cart":
              iconName = "cart-outline";
              break;
            case "Account":
              iconName = "person-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            const state = navigation.getState();
            const homeRoute = state.routes.find((r) => r.name === "Home");
            const isAtHomeMain = homeRoute?.state?.index === 0;

            if (!isAtHomeMain) {
              e.preventDefault();
              navigation.navigate("Home", { screen: "HomeMain" });
            }
          },
        })}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
