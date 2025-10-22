import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "../ProductList/ProductListScreen";
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
        <ProductList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
