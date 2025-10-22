import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ProductDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item?.name || "Product Detail",
      headerRight: () => <View />,
    });
  }, [navigation, item]);

  useEffect(() => {
    if (!item?._id) {
      Alert.alert("Error", "There is no product.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/products/${item._id}`);  // http://10.0.2.2:9999 for simulator
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading products detail: ", err.message);
        Alert.alert("Error", "Cannot loading products detail.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [item?._id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00C39A" />
        <Text style={{ marginTop: 10 }}>Loading products detail...</Text>
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image style={styles.image} source={{ uri: product.img }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("🛒", `${product.name} add to cart successfully!`)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
