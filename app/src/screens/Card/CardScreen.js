import { useFocusEffect } from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

const CardItem = memo(({ item, onDelete }) => (
  <View style={styles.cardItem}>
    <View style={styles.cardInfo}>
      <Text style={styles.cardName}>{item.cardName || "My Card"}</Text>
      <Text style={styles.cardNumber}>
        **** **** **** {item.cardNumber.slice(-4)}
      </Text>
      <Text style={styles.cardDetails}>Holder: {item.cardHolderName}</Text>
      <Text style={styles.cardDetails}>Expires: {item.expiryDate}</Text>
    </View>
    <TouchableOpacity
      onPress={() => onDelete(item._id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteButtonText}>✕</Text>
    </TouchableOpacity>
  </View>
));

export default function CardScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCards = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      const res = await fetch("http://localhost:9999/api/cards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (res.ok) {
          setCards(data);
        } else {
          Alert.alert("Error", data.message || "Failed to load cards");
        }
      } catch (e) {
        console.error("Server returned non-JSON:", text);
        Alert.alert("Error", "Server error. Please check backend logs.");
      }

    } catch (error) {
      console.error("Error fetching cards:", error);
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCards();
    }, [])
  );

  const deleteCardItem = async (cardId) => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await getToken();
            const res = await fetch(
              `http://localhost:9999/api/cards/${cardId}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (res.ok) {
              setCards((prev) => prev.filter((card) => card._id !== cardId));
              Alert.alert("Success", "Card deleted successfully");
            } else {
              const data = await res.json();
              Alert.alert("Error", data.message || "Failed to delete card");
            }
          } catch (error) {
            console.error("Delete card error:", error);
            Alert.alert("Error", "Failed to delete card");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top']}>
      {!isLoggedIn || cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isLoggedIn ? "You have no saved cards" : "Please log in"}
          </Text>
          {!isLoggedIn && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Login to Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CardItem item={item} onDelete={deleteCardItem} />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {isLoggedIn && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("AddCard")}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}