import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

export default function AddCardScreen({ navigation }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCard = async () => {
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (cardNumber.length < 16) {
      Alert.alert("Error", "Invalid card number.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:9999/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cardName: cardName || "My Card",
          cardNumber,
          cardHolderName,
          expiryDate,
          cvv,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Card added successfully", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to add card");
      }
    } catch (error) {
      console.error("Add card error:", error);
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top']}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Card Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Personal Visa"
          value={cardName}
          onChangeText={setCardName}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="XXXX XXXX XXXX XXXX"
          keyboardType="numeric"
          maxLength={19}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          placeholder="FULL NAME ON CARD"
          autoCapitalize="characters"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              maxLength={5}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="XXX"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCard}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>Add Card</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}