import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCart = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setIsLoggedIn(false);
        setCartItems([]);
        setLoading(false);
        return;
      }

      const profileRes = await fetch("http://localhost:9999/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();

      if (!profileRes.ok) {
        setIsLoggedIn(false);
        setCartItems([]);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      const userId = profileData.user._id;

      const cartRes = await fetch(
        `http://localhost:9999/api/carts/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await cartRes.json();

      if (cartRes.ok) {
        setCartItems(data.carts || []);
      } else {
        Alert.alert("Error", data.message || "Failed to load cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCart();
    }, [])
  );

  const updateQuantity = async (cartId, newQuantity) => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "You must be logged in to modify the cart");
        return;
      }

      const res = await fetch(`http://localhost:9999/api/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemQuantity: newQuantity }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.removed) {
          setCartItems((prev) => prev.filter((item) => item._id !== cartId));
        } else {
          setCartItems((prev) =>
            prev.map((item) =>
              item._id === cartId
                ? { ...item, itemQuantity: data.cart.itemQuantity }
                : item
            )
          );
        }
      } else {
        Alert.alert("Error", data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      Alert.alert("Error", "Failed to update cart");
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item._id))
      .reduce(
        (sum, item) => sum + item.productId.price * item.itemQuantity,
        0
      )
      .toFixed(2);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  if (!isLoggedIn || cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        {!isLoggedIn && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login to Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <TouchableOpacity
              onPress={() => toggleSelectItem(item._id)}
              style={[
                styles.checkbox,
                selectedItems.includes(item._id) && styles.checkboxSelected,
              ]}
            >
              {selectedItems.includes(item._id) && (
                <Text style={styles.checkboxTick}>✓</Text>
              )}
            </TouchableOpacity>

            <Image
              source={{ uri: item.productId.img }}
              style={styles.productImage}
            />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.productId.name}</Text>
              <Text style={styles.productBrand}>
                Brand: {item.productId.brand}
              </Text>
              <Text style={styles.productPrice}>
                ${item.productId.price} x {item.itemQuantity}
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(item._id, item.itemQuantity - 1)
                  }
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.itemQuantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(item._id, item.itemQuantity + 1)
                  }
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {selectedItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.selectAllContainer}>
            <TouchableOpacity
              onPress={() => {
                if (selectedItems.length === cartItems.length) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(cartItems.map((item) => item._id));
                }
              }}
              style={[
                styles.checkbox,
                selectedItems.length === cartItems.length && styles.checkboxSelected,
              ]}
            >
              {selectedItems.length === cartItems.length && (
                <Text style={styles.checkboxTick}>✓</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.selectAllLabel}>Select All</Text>
          </View>

          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate("Checkout", {
                selectedItems: cartItems.filter((item) =>
                  selectedItems.includes(item._id)
                ),
              })
            }            
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>


      )}
    </SafeAreaView>
  );
}
