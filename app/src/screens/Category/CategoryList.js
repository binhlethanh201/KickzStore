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
import styles from "./styles";

export default function CategoryList({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!fetched) {
        setLoading(true);
        axios
          .get("http://localhost:9999/api/products/categories")
          .then((res) => {
            setCategories(res.data);
            setFetched(true);
          })
          .catch((err) => {
            console.error("Error loading categories: ", err.message);
          })
          .finally(() => setLoading(false));
      }
    }, [fetched])
  );

  const onPressCategory = (categoryName) => {
    navigation.navigate("ProductListByBrand", { categoryName: categoryName });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPressCategory(item.name)}
      style={styles.card}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={{ marginTop: 10, color: "#000" }}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
}

