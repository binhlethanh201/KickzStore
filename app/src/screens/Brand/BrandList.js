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

export default function BrandList({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!fetched) {
        setLoading(true);
        axios
          .get("http://localhost:9999/api/products/brands")
          .then((res) => {
            setBrands(res.data);
            setFetched(true);
          })
          .catch((err) => {
            console.error("Error loading brands: ", err.message);
          })
          .finally(() => setLoading(false));
      }
    }, [fetched])
  );

  const onPressBrand = (brandName) => {
    navigation.navigate("ProductListByBrand", { brandName: brandName });
  };

  const renderBrand = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPressBrand(item.name)}
      style={styles.card}
    >
      <Image
        source={{ uri: item.logoUrl }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#16A34A" />
        <Text style={{ marginTop: 10, color: "#000" }}>Loading brands...</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shop by Brand</Text>
      <FlatList
        horizontal
        data={brands}
        renderItem={renderBrand}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
}

