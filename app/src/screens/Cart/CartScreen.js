import { useFocusEffect } from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
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

const CartItem = memo(({ item, itemKey, selected, onSelect, onDelete, onUpdate }) => (
  <View style={styles.cartItem}>
    <TouchableOpacity
      onPress={() => onSelect(itemKey)}
      style={[styles.checkbox, selected && styles.checkboxSelected]}
      activeOpacity={0.7}
    >
      {selected && <Text style={styles.checkboxTick}>✓</Text>}
    </TouchableOpacity>

    <Image source={{ uri: item.productId.img }} style={styles.productImage} />

    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.productId.name}</Text>
      <Text style={styles.productBrand}>Brand: {item.productId.brand}</Text>
      <Text style={styles.productDetail}>
        Size: {item.size || "N/A"} | Color: {item.color || "N/A"}
      </Text>
      <Text style={styles.productPrice}>
        Price: ${item.productId.price}
      </Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => onUpdate(item.productId._id, item.quantity - 1, item.size, item.color)}
          style={styles.quantityButton}
          activeOpacity={0.6}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => onUpdate(item.productId._id, item.quantity + 1, item.size, item.color)}
          style={styles.quantityButton}
          activeOpacity={0.6}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.productId._id, item.size, item.color)}
          style={styles.deleteButtonTop}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
));

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getItemKey = (item) =>
    `${item.productId?._id}-${item.size || "nosize"}-${item.color || "nocolor"}`;

  const fetchCart = async () => {
    try {
      const token = await getToken();
      if (!token) return setIsLoggedIn(false), setLoading(false);

      const profileRes = await fetch("http://localhost:9999/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await profileRes.json();
      if (!profileRes.ok) return setIsLoggedIn(false), setLoading(false);

      setIsLoggedIn(true);
      const userId = profileData.user._id;

      const cartRes = await fetch(`http://localhost:9999/api/carts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await cartRes.json();

      if (cartRes.ok) setCartItems(data.cart?.items || []);
      else Alert.alert("Error", data.message || "Failed to load cart");
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

  const deleteCartItem = async (productId, size, color) => {
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:9999/api/carts/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ size, color }),
      });

      const data = await res.json();
      if (res.ok) {
        setCartItems((prev) =>
          prev.filter(
            (item) =>
              !(
                item.productId._id === productId &&
                item.size === size &&
                item.color === color
              )
          )
        );
      } else {
        Alert.alert("Error", data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete item error:", error);
      Alert.alert("Error", "Failed to delete item");
    }
  };

  const updateQuantity = async (productId, newQuantity, size, color) => {
    try {
      if (newQuantity < 1) return;
      const token = await getToken();
      const res = await fetch(`http://localhost:9999/api/carts/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity, size, color }),
      });

      const data = await res.json();
      if (res.ok) {
        // Cập nhật local state nhanh để không bị lag
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId._id === productId &&
              item.size === size &&
              item.color === color
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        Alert.alert("Error", data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      Alert.alert("Error", "Failed to update cart");
    }
  };

  const toggleSelectItem = (itemKey) => {
    setSelectedItems((prev) =>
      prev.includes(itemKey)
        ? prev.filter((id) => id !== itemKey)
        : [...prev, itemKey]
    );
  };

  const calculateTotal = () =>
    cartItems
      .filter((item) => selectedItems.includes(getItemKey(item)))
      .reduce((sum, item) => sum + item.productId.price * item.quantity, 0)
      .toFixed(2);

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
        keyExtractor={getItemKey}
        renderItem={({ item }) => {
          const itemKey = getItemKey(item);
          return (
            <CartItem
              item={item}
              itemKey={itemKey}
              selected={selectedItems.includes(itemKey)}
              onSelect={toggleSelectItem}
              onDelete={deleteCartItem}
              onUpdate={updateQuantity}
            />
          );
        }}
        extraData={selectedItems}
        initialNumToRender={5}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />

      {selectedItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.selectAllContainer}>
            <TouchableOpacity
              onPress={() => {
                if (selectedItems.length === cartItems.length) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(cartItems.map(getItemKey));
                }
              }}
              style={[
                styles.checkbox,
                selectedItems.length === cartItems.length &&
                styles.checkboxSelected,
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
                  selectedItems.includes(getItemKey(item))
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
