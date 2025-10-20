import React from "react";
import { View, Text, ScrollView } from "react-native";
import ProductList from "../ProductList/ProductListScreen";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>👟 KickzStore.</Text>
      </View>

      {/* Recommended For You section */}
      <ProductList navigation={navigation} />
    </ScrollView>
  );
}
