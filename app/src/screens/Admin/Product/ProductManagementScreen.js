import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image, // <-- Thêm Image
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./styles"; // <-- Dùng file style mới

// Component con để render một sản phẩm
const ProductItem = ({ product, navigation, textColor, cardBorder }) => {
  return (
    // TODO: Khi bạn tạo AdminProductDetailScreen, hãy thêm điều hướng ở đây
    // onPress={() => navigation.navigate("AdminProductDetail", { productId: product._id })}
    <TouchableOpacity
      style={[styles.productItem, { borderColor: cardBorder }]}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: product.img }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfoContainer}>
        <Text style={[styles.productName, { color: textColor }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productSubText}>{product.brand} / {product.category}</Text>
        <Text style={[styles.productPrice, { color: textColor }]}>
          ${product.price.toFixed(2)}
        </Text>
      </View>
      <View style={styles.productStockContainer}>
        <Text style={[styles.productStockLabel, { color: textColor }]}>Stock</Text>
        <Text style={[styles.productStockValue, { color: textColor }]}>
          {product.quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ProductManagementScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Styles động
  const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#111111";
  const cardBorder = isDarkMode ? '#333' : '#EEE';

  // State
  const [products, setProducts] = useState([]); // <-- Đổi tên
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Hàm gọi API
  const fetchProducts = async () => { // <-- Đổi tên
    try {
      const token = await getToken();
      if (!token) throw new Error("You are not authorized.");

      // Gọi API products
      const res = await fetch("http://localhost:9999/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) throw new Error("Access Denied. Admins only.");

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load products.");

      setProducts(data); // <-- Cập nhật
    } catch (error) {
      console.error("Fetch products error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchProducts(); // <-- Cập nhật
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProducts(); // <-- Cập nhật
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <FlatList
        data={products} // <-- Cập nhật
        renderItem={({ item }) => (
          <ProductItem // <-- Cập nhật
            product={item} // <-- Cập nhật
            navigation={navigation}
            textColor={textColor}
            cardBorder={cardBorder}
          />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          // TODO: Thêm nút "+" ở đây nếu muốn
          <Text style={[styles.title, { color: textColor }]}>
            Product Management
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}
