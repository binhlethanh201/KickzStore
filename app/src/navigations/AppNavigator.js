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
import OrderListScreen from "../screens/Order/OrderListScreen";
import OrderDetailScreen from "../screens/Order/OrderDetailScreen";
import ProductListByBrandScreen from "../screens/Brand/ProductListByBrandScreen";
import ProductByColor from "../screens/ProductList/ProductByColor";
import ProductByPrice from "../screens/ProductList/ProductByPrice";
import ProductByQuantity from "../screens/ProductList/ProductByQuantity";
import CreateUserScreen from "../screens/Admin/User/CreateUserScreen";
import UserDetailScreen from "../screens/Admin/User/UserDetailScreen";
import AdminOrderDetailScreen from "../screens/Admin/Order/AdminOrderDetailScreen";
import VoucherDetailScreen from "../screens/Admin/Voucher/VoucherDetailScreen";

import MenuNavigator from "./MenuNavigator";
import AdminNavigator from "../screens/Admin/AdminNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminDashboard"
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminOrderDetail"
        component={AdminOrderDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VoucherDetailScreen"
        component={VoucherDetailScreen}
        options={{ headerShown: false }}
      />

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
        options={{ headerTitle: "Checkout" }}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderListScreen}
        options={{ title: "OrderList" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ title: "OrderDetail" }}
      />
      <Stack.Screen
        name="ProductListByBrand"
        component={ProductListByBrandScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ProductByColor"
        component={ProductByColor}
        options={{ title: "Sort By Color" }}
      />
      <Stack.Screen
        name="ProductByPrice"
        component={ProductByPrice}
        options={{ title: "Sort By Price" }}
      />
      <Stack.Screen
        name="ProductByQuantity"
        component={ProductByQuantity}
        options={{ title: "Sort By Quantity" }}
      />
    </Stack.Navigator>
  );
}