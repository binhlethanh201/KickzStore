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
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
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
  const [myCards, setMyCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cvv, setCvv] = useState("");
  const [isCvvModalVisible, setIsCvvModalVisible] = useState(false);
  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const token = await getToken();
        if (!token) return;

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
        }
      } catch (error) {
        console.error("Error fetching user profile for address:", error);
      }
    };

    fetchUserAddress();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      if (paymentMethod !== "credit_card") {
        setMyCards([]);
        return;
      }
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:9999/api/cards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setMyCards(data);
          if (data.length > 0) {
            setSelectedCardId(data[0]._id);
          }
        } else {
          Alert.alert("Error", "Could not load saved cards.");
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [paymentMethod]);
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
  const cardForModal = useMemo(
    () => myCards.find(card => card._id === selectedCardId),
    [myCards, selectedCardId]
  );
  const submitOrder = async () => {
    if (paymentMethod === "credit_card" && !cvv) {
      Alert.alert("Error", "Please enter the CVV/Password for your card.");
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
        cardId: paymentMethod === "credit_card" ? selectedCardId : undefined,
        cvv: paymentMethod === "credit_card" ? cvv : undefined,
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
        Alert.alert("Success", data.message || "Your order has been placed!");
        navigation.reset({
          index: 1,
          routes: [
            { name: 'MainMenu' },
            { name: 'OrderDetail', params: { orderId: data.order._id } }
          ],
        });
      } else {
        Alert.alert("Order Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Place order error:", error);
      Alert.alert("Error", "Cannot connect to server.");
    } finally {
      setLoading(false);
      setIsCvvModalVisible(false);
      setCvv("");
    }
  };

  const onPlaceOrderPress = () => {
    if (!address) {
      Alert.alert("Error", "Please enter a shipping address.");
      return;
    }

    if (paymentMethod === 'cod') {
      submitOrder();
    } else if (paymentMethod === 'credit_card') {
      if (!selectedCardId) {
        Alert.alert("Error", "Please select a card to pay.");
        return;
      }
      setIsCvvModalVisible(true);
    } else if (paymentMethod === 'paypal') {
      Alert.alert("Info", "PayPal is not yet supported in this demo. Please select COD or Credit Card.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.section}><Text style={styles.sectionTitle}>Shipping Address</Text><TextInput style={styles.input} value={address} onChangeText={setAddress} /></View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Items ({selectedItems.length})</Text>{selectedItems.map((item) => (<CheckoutItem key={getItemKey(item)} item={item} />))}</View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Shipping Method</Text><View style={styles.optionGroup}><OptionButton label="Standard (Free)" value="standard" selectedValue={shippingMethod} onSelect={setShippingMethod} /><OptionButton label="Express ($5)" value="express" selectedValue={shippingMethod} onSelect={setShippingMethod} /></View></View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.optionGroup}>
            <OptionButton label="Cash on Delivery (COD)" value="cod" selectedValue={paymentMethod} onSelect={setPaymentMethod} />
            <OptionButton label="Credit Card" value="credit_card" selectedValue={paymentMethod} onSelect={setPaymentMethod} />
            <OptionButton label="PayPal" value="paypal" selectedValue={paymentMethod} onSelect={setPaymentMethod} />
          </View>

          {paymentMethod === "credit_card" && (
            <View style={styles.cardPaymentSection}>
              {myCards.length > 0 ? (
                myCards.map((card) => (
                  <OptionButton
                    key={card._id}
                    label={`${card.cardName || 'Card'} - **** ${card.cardNumber.slice(-4)}`}
                    value={card._id}
                    selectedValue={selectedCardId}
                    onSelect={setSelectedCardId}
                  />
                ))
              ) : (
                <Text style={styles.note}>No saved cards found.</Text>
              )}
              <TouchableOpacity
                style={styles.manageCardsButton}
                onPress={() => navigation.navigate("Card")}
              >
                <Text style={styles.manageCardsButtonText}>Manage Cards</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>Promo Code</Text><TextInput style={styles.input} value={voucherCode} onChangeText={setVoucherCode} autoCapitalize="characters" /></View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Order Summary</Text>{selectedItems.map((item) => (<View key={getItemKey(item)} style={styles.summaryItem}><Text style={styles.summaryItemText}>{item.quantity} x {item.productId.name}</Text><Text style={styles.summaryItemText}>${(item.productId.price * item.quantity).toFixed(2)}</Text></View>))}<View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text></View><View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping Fee</Text><Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text></View><View style={[styles.summaryRow, styles.summaryTotal]}><Text style={styles.summaryTotalLabel}>Estimated Total</Text><Text style={styles.summaryTotalValue}>${(subtotal + shippingFee).toFixed(2)}</Text></View><Text style={styles.note}>* Final discount will be applied by the system.</Text></View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, loading && styles.disabledButton]}
          onPress={onPlaceOrderPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isCvvModalVisible}
        onRequestClose={() => setIsCvvModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsCvvModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Confirm Payment</Text>

            {cardForModal && (
              <View style={styles.modalCardInfo}>
                <Text style={styles.modalCardText}>
                  {cardForModal.cardName || 'Card'}
                </Text>
                <Text style={styles.modalCardText}>
                  **** **** **** {cardForModal.cardNumber.slice(-4)}
                </Text>
              </View>
            )}

            <Text style={styles.modalCvvLabel}>Enter CVV/Password</Text>
            <TextInput
              style={styles.modalCvvInput}
              placeholder="***"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={4}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              autoFocus={true}
            />

            <TouchableOpacity
              style={[styles.modalConfirmButton, loading && styles.disabledButton]}
              onPress={submitOrder}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.modalConfirmButtonText}>
                  Pay ${(subtotal + shippingFee).toFixed(2)}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}
