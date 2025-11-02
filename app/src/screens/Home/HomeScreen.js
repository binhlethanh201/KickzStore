import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "../ProductList/ProductListScreen";
import BrandList from "../Brand/BrandList";
import CategoryList from "../Category/CategoryList";
import ProductByColor from "../ProductList/ProductByColor";
import ProductByPrice from "../ProductList/ProductByPrice";
import ProductByQuantity from "../ProductList/ProductByQuantity";
import FeaturedList from "../ProductList/FeaturedListScreen";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>👟 KickzStore.</Text>
        </View>
        <FeaturedList navigation={navigation} />
        <BrandList navigation={navigation} />
        <ProductByPrice navigation={navigation} />
        <ProductByQuantity navigation={navigation} />
        <ProductByColor navigation={navigation} />
        <CategoryList navigation={navigation} />
        <ProductList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
