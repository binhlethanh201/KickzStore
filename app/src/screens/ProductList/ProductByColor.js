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
import styles from "./bycolorstyle";

const ProductCard = ({ item, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
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

export default function ProductByColor({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetched, setFetched] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!fetched) {
                setLoading(true);
                axios
                    .get("http://localhost:9999/api/products/by-color-count")
                    .then((res) => {
                        setProducts(res.data);
                        setFetched(true);
                    })
                    .catch((err) => {
                        console.error("Error loading products by color: ", err.message);
                    })
                    .finally(() => setLoading(false));
            }
        }, [fetched])
    );

    const onPressProduct = (product) => {
        navigation.navigate("ProductDetail", { item: product });
    };

    const renderProduct = ({ item }) => (
        <ProductCard item={item} onPress={() => onPressProduct(item)} />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#16A34A" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Most Colorful</Text>
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
