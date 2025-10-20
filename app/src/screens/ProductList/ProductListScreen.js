import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import styles from "./style";

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9999/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products: ", err.message);
        setLoading(false);
      });
  }, []);

  const onPressProduct = (product) => {
    navigation.navigate("ProductDetail", { item: product });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPressProduct(item)}
      style={styles.card}
    >
      <Image style={styles.photo} source={{ uri: item.img }} />
      <Text style={styles.title} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.category}>{item.brand}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={{ marginTop: 10, color: "#000" }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommended For You</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
}
