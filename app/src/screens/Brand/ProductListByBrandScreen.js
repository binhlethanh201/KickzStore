import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./productstyles";

const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.card}
  >
    <Image style={styles.photo} source={{ uri: item.img }} />
    <Text style={styles.title} numberOfLines={2}>
      {item.name}
    </Text>
    <Text style={styles.category}>{item.brand}</Text>
    <Text style={styles.price}>${item.price}</Text>
  </TouchableOpacity>
);

export default function ProductListByBrandScreen({ navigation }) {
  const route = useRoute();
  const { brandName, categoryName } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = brandName || categoryName;
  const apiUrl = brandName
    ? `http://localhost:9999/api/products?brand=${brandName}`
    : `http://localhost:9999/api/products?category=${categoryName}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error loading filtered products: ", err.message);
        if (err.response?.status === 404) {
          setProducts([]);
        } else {
          Alert.alert("Error", "Could not load products.");
        }
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const onPressProduct = (product) => {
    navigation.navigate("ProductDetail", { item: product });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={() => onPressProduct(item)} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>{title}</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found for "{title}".</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
