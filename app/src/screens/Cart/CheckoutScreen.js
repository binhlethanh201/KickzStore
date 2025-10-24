import React, { useEffect, useState } from "react";
import {
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
import styles from "./checkoutStyles";

export default function CheckoutScreen({ route, navigation }) {
  const { selectedItems } = route.params; // nhận data từ CartScreen
  const [user, setUser] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  // 🧠 Fetch profile người dùng
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:9999/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // 🛒 Tính toán tổng tiền
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.productId.price * item.itemQuantity,
    0
  );
  const shippingFee =
    shippingMethod === "express" ? 10 : shippingMethod === "fast" ? 20 : 0;
  const total = subtotal + shippingFee - discount;

  const handleApplyVoucher = () => {
    if (voucher.trim().toLowerCase() === "save10") {
      setDiscount(10);
      Alert.alert("Voucher Applied", "You got $10 discount!");
    } else {
      setDiscount(0);
      Alert.alert("Invalid Voucher", "Please check your voucher code.");
    }
  };

  const handlePlaceOrder = () => {
    navigation.navigate("Payment", {
      paymentMethod,
      total,
    });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🧍Thông tin người dùng */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.card}>
          <Text style={styles.infoText}>Name: {user?.firstName + user?.lastName}</Text>
          <Text style={styles.infoText}>Email: {user?.email}</Text>
          <Text style={styles.infoText}>Address: {user?.address}</Text>
        </View>

        {/* 🛍️ Danh sách sản phẩm */}
        <Text style={styles.sectionTitle}>Products</Text>
        {selectedItems.map((item) => (
          <View key={item._id} style={styles.productItem}>
            <Image source={{ uri: item.productId.img }} style={styles.productImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.productId.name}</Text>
              <Text style={styles.productQty}>x{item.itemQuantity}</Text>
              <Text style={styles.productPrice}>
                ${item.productId.price * item.itemQuantity}
              </Text>
            </View>
          </View>
        ))}

        {/* 🚚 Phương thức vận chuyển */}
        <Text style={styles.sectionTitle}>Shipping Method</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              shippingMethod === "standard" && styles.optionSelected,
            ]}
            onPress={() => setShippingMethod("standard")}
          >
            <Text>Standard (Free, 3-5 days)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              shippingMethod === "express" && styles.optionSelected,
            ]}
            onPress={() => setShippingMethod("express")}
          >
            <Text>Fast (+$10, +2 days)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              shippingMethod === "fast" && styles.optionSelected,
            ]}
            onPress={() => setShippingMethod("fast")}
          >
            <Text>Instant (+$20, same day)</Text>
          </TouchableOpacity>
        </View>

        {/* 🎟️ Voucher */}
        <Text style={styles.sectionTitle}>Voucher</Text>
        <View style={styles.voucherContainer}>
          <TextInput
            value={voucher}
            onChangeText={setVoucher}
            placeholder="Enter voucher code"
            style={styles.voucherInput}
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyVoucher}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* 💳 Phương thức thanh toán */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              paymentMethod === "cod" && styles.optionSelected,
            ]}
            onPress={() => setPaymentMethod("cod")}
          >
            <Text>Cash on Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              paymentMethod === "bank" && styles.optionSelected,
            ]}
            onPress={() => setPaymentMethod("bank")}
          >
            <Text>Bank Transfer</Text>
          </TouchableOpacity>
        </View>

        {/* 📦 Chi tiết thanh toán */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Shipping: ${shippingFee}</Text>
          <Text style={styles.summaryText}>Discount: -${discount}</Text>
          <Text style={styles.summaryTotal}>Total: ${total.toFixed(2)}</Text>
        </View>

        {/* 🟢 Button đặt hàng */}
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
