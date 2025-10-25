import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false); // ✅ đánh dấu đã load

  useFocusEffect(
    useCallback(() => {
      if (!fetched) {
        setLoading(true);
        axios
          .get("http://localhost:9999/api/products")
          .then((res) => {
            setProducts(res.data);
            setFetched(true); // ✅ chỉ load 1 lần
          })
          .catch((err) => {
            console.error("Error loading products: ", err.message);
          })
          .finally(() => setLoading(false));
      }
    }, [fetched])
  );

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
      <Text style={styles.category}>{item.category}</Text>
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