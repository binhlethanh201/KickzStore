import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useColorScheme } from "react-native";
import AdminHomeScreen from "./AdminHomeScreen";
import UserManagementScreen from "./User/UserManagementScreen";

const Tab = createBottomTabNavigator();

export default function AdminNavigator() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const tabBarStyle = {
    backgroundColor: isDarkMode ? "#121212" : "#FFFFFF",
    borderTopColor: isDarkMode ? "#333333" : "#DDDDDD",
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 5,
  };

  const tabBarActiveTintColor = isDarkMode ? "#FFFFFF" : "#111111";
  const tabBarInactiveTintColor = isDarkMode ? "#888888" : "#AAAAAA";

  return (
    <Tab.Navigator
      initialRouteName="AdminHome"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "AdminHome":
              iconName = "settings-outline";
              break;
            case "ManageUsers":
              iconName = "people-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="ManageUsers"
        component={UserManagementScreen}
        options={{ title: "Users" }}
      />
    </Tab.Navigator>
  );
}
