import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

const OptionButton = ({ label, value, selectedValue, onSelect }) => {
  const isSelected = value === selectedValue;
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={() => onSelect(value)}
    >
      <Text style={[styles.optionButtonText, isSelected && styles.optionButtonTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getItemKey = (item) =>
  `${item.productId?._id}-${item.size || "nosize"}-${item.color || "nocolor"}`;

const CheckoutItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.productId.img }} style={styles.itemImage} />
    <View style={styles.itemInfo}>
      <Text style={styles.itemName} numberOfLines={2}>
        {item.productId.name}
      </Text>
      <Text style={styles.itemDetail}>
        Size: {item.size || "N/A"} | Color: {item.color || "N/A"}
      </Text>
      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
    </View>
    <View style={styles.itemPriceContainer}>
      <Text style={styles.itemPrice}>
        ${(item.productId.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  </View>
);

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems } = route.params;
  const [address, setAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const token = await getToken();
        if (!token) {
          return;
        }

        const res = await fetch("http://localhost:9999/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.user && data.user.address) {
          const addr = data.user.address;
          const addressString = [addr.street, addr.district, addr.city, addr.country]
            .filter(Boolean)
            .join(", ");
          setAddress(addressString);
        } else if (res.ok && data.user && !data.user.address) {
          console.log("User profile does not have a default address.");
        }
      } catch (error) {
        console.error("Error fetching user profile for address:", error);
      }
    };

    fetchUserAddress();
  }, []);

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
  }, [selectedItems]);

  useEffect(() => {
    const fee = shippingMethod === "express" ? 5 : 0;
    setShippingFee(fee);
  }, [shippingMethod]);

  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    if (!address) {
      Alert.alert("Error", "Please enter a shipping address.");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "You are not logged in.");
        navigation.navigate("Login");
        return;
      }
      const itemsToOrder = selectedItems.map((item) => ({
        productId: item.productId._id,
        size: item.size,
        color: item.color,
      }));
      const orderPayload = {
        selectedItems: itemsToOrder,
        shippingMethod,
        address,
        paymentMethod,
        voucherCode: voucherCode || undefined,
      };
      const res = await fetch("http://localhost:9999/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Your order has been placed successfully!");
        navigation.popToTop();
        navigation.navigate("MainMenu", { screen: "Home" });
      } else {
        Alert.alert("Order Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Place order error:", error);
      Alert.alert("Error", "Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Checkout</Text>

        {/* Shipping Address (Không đổi) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full address"
            placeholderTextColor="#888"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* **MỤC SẢN PHẨM MỚI** */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({selectedItems.length})</Text>
          {selectedItems.map((item) => (
            <CheckoutItem key={getItemKey(item)} item={item} />
          ))}
        </View>

        {/* Shipping Method (Không đổi) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Method</Text>
          <View style={styles.optionGroup}>
            <OptionButton
              label="Standard (Free)"
              value="standard"
              selectedValue={shippingMethod}
              onSelect={setShippingMethod}
            />
            <OptionButton
              label="Express ($5)"
              value="express"
              selectedValue={shippingMethod}
              onSelect={setShippingMethod}
            />
          </View>
        </View>

        {/* Payment Method (Không đổi) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.optionGroup}>
            {/* ...Các OptionButton... */}
            <OptionButton
              label="Cash on Delivery (COD)"
              value="cod"
              selectedValue={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <OptionButton
              label="Credit Card"
              value="credit_card"
              selectedValue={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <OptionButton
              label="PayPal"
              value="paypal"
              selectedValue={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </View>
        </View>

        {/* Promo Code (Không đổi) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter promo code"
            placeholderTextColor="#888"
            value={voucherCode}
            onChangeText={setVoucherCode}
            autoCapitalize="characters"
          />
        </View>

        {/* Order Summary (Không đổi) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {/* ...Phần tóm tắt giá... */}
          {selectedItems.map((item) => (
            <View key={getItemKey(item)} style={styles.summaryItem}>
              <Text style={styles.summaryItemText}>
                {item.quantity} x {item.productId.name}
              </Text>
              <Text style={styles.summaryItemText}>
                ${(item.productId.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping Fee</Text>
            <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Estimated Total</Text>
            <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
          </View>
          <Text style={styles.note}>
            * Final discount will be applied by the system.
          </Text>
        </View>
      </ScrollView>

      {/* Footer (Không đổi) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, loading && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}