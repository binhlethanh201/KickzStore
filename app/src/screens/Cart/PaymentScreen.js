import React, { useEffect } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen({ route, navigation }) {
  const { paymentMethod, total } = route.params;

  useEffect(() => {
    if (paymentMethod === "cod") {
      Alert.alert(
        "Order Confirmed",
        "Your order has been placed successfully! It will be delivered soon."
      );
    }
  }, []);

  // ✅ COD: Hiển thị màn hình thành công
  if (paymentMethod === "cod") {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.card}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.subtitle}>
            Thank you for shopping with us. Your order will be delivered soon.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("HomeMain")}
          >
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ✅ Bank Transfer: Hiển thị QR thanh toán giả
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Bank Transfer</Text>
        <Text style={styles.subtitle}>
          Please scan the QR code below to complete your payment.
        </Text>

        <View style={styles.qrWrapper}>
          <Image
            source={{
              uri: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=BankPayment_0VND",
            }}
            style={styles.qrImage}
          />
        </View>

        <Text style={styles.amountText}>Amount Due: ${total.toFixed(2)}</Text>
        <Text style={styles.note}>
          This QR is a demo image for mock payment.
        </Text>

        <TouchableOpacity
          style={[styles.backButton, { marginTop: 30 }]}
          onPress={() => {
            Alert.alert("Payment Confirmed", "Your transaction has been recorded.");
            navigation.navigate("Home", { screen: "HomeMain" });
          }}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  successIcon: {
    fontSize: 70,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  qrWrapper: {
    marginTop: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginTop: 8,
  },
  note: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 24,
    width: "100%",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});
