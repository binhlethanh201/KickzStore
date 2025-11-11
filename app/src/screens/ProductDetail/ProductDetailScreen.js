import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

export default function ProductDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: "#FFFFFF" },
      headerShadowVisible: false,
      headerRight: () => <View />,
    });
  }, [navigation]);

  useEffect(() => {
    if (!item?._id) {
      Alert.alert("Error", "There is no product.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9999/api/products/${item._id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product detail:", err.message);
        Alert.alert("Error", "Cannot load product detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [item?._id]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Login Required", "Please login to add items to your cart.");
        navigation.navigate("Login");
        return;
      }

      if (!selectedSize || !selectedColor) {
        Alert.alert(
          "Select Options",
          "Please select size and color before adding to cart."
        );
        return;
      }

      const res = await fetch("http://localhost:9999/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("🛒 Added to Cart", `${product.name} added successfully!`, [
          { text: "Go to Cart", onPress: () => navigation.navigate("MainMenu", { screen: "Cart" }) },
          { text: "Continue Shopping", style: "cancel" },
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      Alert.alert("Error", "Failed to connect to server.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={{ marginTop: 10 }}>Loading product detail...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <Text>There is no product.</Text>
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product.img }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.brand}>Brand: {product.brand}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <View style={styles.optionSection}>
          <Text style={styles.optionLabel}>Select Size</Text>
          <View style={styles.optionRow}>
            {product.size?.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  selectedSize === size && styles.optionSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSize === size && styles.optionTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.optionSection}>
          <Text style={styles.optionLabel}>Select Color</Text>
          <View style={styles.optionRow}>
            {product.color?.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.optionButton,
                  selectedColor === color && styles.optionSelected,
                  styles.colorOptionButton,
                  { backgroundColor: color.toLowerCase() === 'white' ? '#f0f0f0' : color.toLowerCase() }
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && <View style={styles.colorOptionSelectedRing} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text style={styles.optionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, isAddingToCart && styles.buttonDisabled]}
          onPress={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
