import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
    Modal,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const ProductItem = ({ product, navigation, textColor, cardBorder }) => {
    return (
        <TouchableOpacity
            style={[styles.productItem, { borderColor: cardBorder }]}
            activeOpacity={0.7}
        onPress={() => navigation.navigate("AdminProductDetail", { productId: product._id })}
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

    const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const cardBorder = isDarkMode ? '#333' : '#EEE';
    const iconColor = isDarkMode ? "#FFFFFF" : "#111111";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const placeholderColor = isDarkMode ? "#888" : "#999";
    const inputBorder = isDarkMode ? '#333' : '#EEE';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [sizeText, setSizeText] = useState("");
    const [colorText, setColorText] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    const fetchProducts = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("You are not authorized.");

            const res = await fetch("http://localhost:9999/api/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 403) throw new Error("Access Denied. Admins only.");

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load products.");

            setProducts(data);
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
            fetchProducts();
        }, [])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchProducts();
    }, []);

    const handleOpenCreateModal = () => setIsModalVisible(true);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsCreatingProduct(false);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("0");
        setImg("");
        setBrand("");
        setCategory("");
        setSizeText("");
        setColorText("");
        setIsFeatured(false);
    };

    const handleSubmitNewProduct = async () => {
        if (!name || !price || !img || !brand || !category || !sizeText || !colorText) {
            Alert.alert("Missing Fields", "Name, Price, Image URL, Brand, Category, Size, and Color are required.");
            return;
        }

        setIsCreatingProduct(true);
        try {
            const token = await getToken();

            const sizeArray = sizeText.split(',').map(s => parseFloat(s.trim())).filter(s => !isNaN(s));
            const colorArray = colorText.split(',').map(c => c.trim()).filter(c => c);

            if (sizeArray.length === 0 || colorArray.length === 0) {
                Alert.alert("Invalid Format", "Size and Color must be comma-separated values (e.g., 9,10,11 or Red,Blue).");
                setIsCreatingProduct(false);
                return;
            }

            const payload = {
                name,
                description,
                price: parseFloat(price),
                quantity: parseInt(quantity) || 0,
                img,
                brand,
                category,
                size: sizeArray,
                color: colorArray,
                isFeatured,
            };

            const res = await fetch("http://localhost:9999/api/admin/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.status === 201) {
                Alert.alert("Success", "Product created successfully.");
                handleCloseModal();
                fetchProducts();
            } else {
                Alert.alert("Creation Failed", data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Create product error:", error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setIsCreatingProduct(false);
        }
    };

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
                data={products}
                renderItem={({ item }) => (
                    <ProductItem
                        product={item}
                        navigation={navigation}
                        textColor={textColor}
                        cardBorder={cardBorder}
                    />
                )}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <Text style={[styles.title, { color: textColor }]}>
                            Product Management
                        </Text>
                        <TouchableOpacity style={styles.addButton} onPress={handleOpenCreateModal}>
                            <Ionicons name="add-circle-outline" size={32} color={iconColor} />
                        </TouchableOpacity>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No products found.</Text>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.listContainer}
            />

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: textColor }]}>
                                    Create New Product
                                </Text>
                                <TouchableOpacity onPress={handleCloseModal}>
                                    <Ionicons
                                        name="close-circle"
                                        size={30}
                                        color={placeholderColor}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Product Name (Required)"
                                placeholderTextColor={placeholderColor}
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={[styles.input, styles.inputMultiline, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Description"
                                placeholderTextColor={placeholderColor}
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Image URL (Required)"
                                placeholderTextColor={placeholderColor}
                                value={img}
                                onChangeText={setImg}
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Brand (Required)"
                                placeholderTextColor={placeholderColor}
                                value={brand}
                                onChangeText={setBrand}
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Category (Required)"
                                placeholderTextColor={placeholderColor}
                                value={category}
                                onChangeText={setCategory}
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Price (Required, e.g., 199.99)"
                                placeholderTextColor={placeholderColor}
                                value={price}
                                onChangeText={setPrice}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Quantity (e.g., 50)"
                                placeholderTextColor={placeholderColor}
                                value={quantity}
                                onChangeText={setQuantity}
                                keyboardType="number-pad"
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Sizes (e.g., 9,10,11)"
                                placeholderTextColor={placeholderColor}
                                value={sizeText}
                                onChangeText={setSizeText}
                            />
                            <TextInput
                                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                                placeholder="Colors (e.g., Red,Blue,White)"
                                placeholderTextColor={placeholderColor}
                                value={colorText}
                                onChangeText={setColorText}
                                autoCapitalize="none"
                            />

                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchLabel, { color: textColor }]}>
                                    Is Featured?
                                </Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isFeatured ? "#1E90FF" : "#f4f3f4"}
                                    onValueChange={setIsFeatured}
                                    value={isFeatured}
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.createButton,
                                    isCreatingProduct && styles.buttonDisabled,
                                ]}
                                onPress={handleSubmitNewProduct}
                                disabled={isCreatingProduct}
                            >
                                {isCreatingProduct ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.buttonText}>Create Product</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </SafeAreaView>
    );
}

