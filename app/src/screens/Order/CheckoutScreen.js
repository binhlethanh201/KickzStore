import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getToken } from "../../utils/auth";
import styles from "./styles";

export default function CheckoutScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(20);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert("Login Required", "Please login to view your cart.");
          navigation.navigate("Login");
          return;
        }
        const res = await axios.get("http://localhost:9999/api/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items || []);
        const sum = res.data.items?.reduce(
          (acc, item) => acc + item.product.price * item.itemQuantity,
          0
        );
        setSubtotal(sum);
      } catch (err) {
        console.error("Error fetching cart:", err);
        Alert.alert("Error", "Cannot load your cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const applyVoucher = async () => {
    if (!voucherCode.trim()) return;
    try {
      const res = await axios.post("http://localhost:9999/api/vouchers/apply", {
        code: voucherCode.trim(),
        orderValue: subtotal,
      });
      setAppliedVoucher(res.data.voucher);
      setDiscount(res.data.discountAmount);
      Alert.alert("✅ Voucher Applied", `You saved $${res.data.discountAmount}`);
    } catch (err) {
      console.error("Voucher error:", err);
      Alert.alert("Error", err.response?.data?.message || "Invalid voucher.");
    }
  };

  const handleCheckout = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Login Required", "Please login to complete checkout.");
        navigation.navigate("Login");
        return;
      }

      const total = subtotal + shippingFee - discount;

      const orderData = {
        items: cartItems.map((i) => ({
          productId: i.product._id,
          quantity: i.itemQuantity,
        })),
        shippingMethod,
        voucherCode: appliedVoucher?.code || null,
        totalAmount: total,
      };

      const res = await axios.post("http://localhost:9999/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("🎉 Order Successful", "Your order has been placed.", [
        {
          text: "View Orders",
          onPress: () => navigation.navigate("Orders"),
        },
      ]);
    } catch (err) {
      console.error("Checkout error:", err);
      Alert.alert("Error", "Failed to create order.");
    }
  };

  const total = subtotal + shippingFee - discount;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00C39A" />
        <Text>Loading checkout...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {/* Cart Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items in Cart</Text>
        {cartItems.map((item) => (
          <View key={item._id} style={styles.itemRow}>
            <Text style={styles.itemText}>
              {item.product.name} × {item.itemQuantity}
            </Text>
            <Text style={styles.itemPrice}>${item.product.price * item.itemQuantity}</Text>
          </View>
        ))}
      </View>

      {/* Shipping Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Method</Text>
        {["standard", "express"].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.shippingOption,
              shippingMethod === method && styles.shippingOptionSelected,
            ]}
            onPress={() => {
              setShippingMethod(method);
              setShippingFee(method === "standard" ? 20 : 40);
            }}
          >
            <Text style={styles.shippingText}>
              {method === "standard" ? "Standard (3–5 days)" : "Express (1–2 days)"}
            </Text>
            <Text style={styles.shippingPrice}>
              ${method === "standard" ? 20 : 40}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Voucher */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Voucher</Text>
        <View style={styles.voucherRow}>
          <TextInput
            placeholder="Enter voucher code"
            value={voucherCode}
            onChangeText={setVoucherCode}
            style={styles.voucherInput}
          />
          <TouchableOpacity style={styles.voucherButton} onPress={applyVoucher}>
            <Text style={styles.voucherButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        {appliedVoucher && (
          <Text style={styles.voucherApplied}>
            ✅ {appliedVoucher.code}: {appliedVoucher.description}
          </Text>
        )}
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Subtotal:</Text>
          <Text>${(subtotal || 0).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping:</Text>
          <Text>${(subtotal || 0).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Discount:</Text>
          <Text>-${(discount || 0).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRowTotal}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>${(total || 0).toFixed(2)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
