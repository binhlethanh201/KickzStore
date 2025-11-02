import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./adminproductdetailstyles";
import { Ionicons } from "@expo/vector-icons";

const DetailRow = ({ label, value, valueStyle }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, valueStyle]} selectable>{value}</Text>
    </View>
);

export default function AdminProductDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#121212" : "#F5F5F5";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const subduedTextColor = isDarkMode ? "#AAAAAA" : "#555555";
    const placeholderColor = isDarkMode ? "#888" : "#999";
    const inputBorder = isDarkMode ? '#333' : '#EEE';

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [img, setImg] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [sizeText, setSizeText] = useState("");
    const [colorText, setColorText] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    const fetchProductDetail = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("You are not authorized.");

            const res = await fetch(`http://localhost:9999/api/admin/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch product");

            setProduct(data);
        } catch (error) {
            console.error("Fetch product detail error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setIsUpdating(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchProductDetail();
        }, [productId])
    );

    const handleToggleFeatured = () => {
        if (!product) return;
        const newStatus = !product.isFeatured;

        Alert.alert(
            "Update Product",
            `Are you sure you want to set this product as "${newStatus ? "Featured" : "Not Featured"}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update", style: "default", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/products/${productId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ isFeatured: newStatus })
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to update product");

                            Alert.alert("Success", "Product updated.");
                            fetchProductDetail();
                        } catch (error) {
                            Alert.alert("Error", error.message);
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const handleDeleteProduct = () => {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to permanently delete this product? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/products/${productId}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to delete product");

                            Alert.alert("Success", "Product deleted successfully.");
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Error", error.message);
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const handleOpenUpdateModal = () => {
        if (!product) return;
        setName(product.name);
        setDescription(product.description || "");
        setPrice(product.price.toString());
        setQuantity(product.quantity.toString());
        setImg(product.img);
        setBrand(product.brand);
        setCategory(product.category);
        setSizeText(product.size.join(', '));
        setColorText(product.color.join(', '));
        setIsFeatured(product.isFeatured);

        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmitUpdate = async () => {
        if (!name || !price || !img || !brand || !category || !sizeText || !colorText) {
            Alert.alert("Missing Fields", "All fields except description are required.");
            return;
        }

        const sizeArray = sizeText.split(',').map(s => parseFloat(s.trim())).filter(s => !isNaN(s));
        const colorArray = colorText.split(',').map(c => c.trim()).filter(c => c);

        if (sizeArray.length === 0 || colorArray.length === 0) {
            Alert.alert("Invalid Format", "Size and Color must be comma-separated values.");
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

        setIsUpdating(true);
        try {
            const token = await getToken();
            const res = await fetch(`http://localhost:9999/api/admin/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update product");

            Alert.alert("Success", "Product updated successfully.");
            handleCloseModal();
            fetchProductDetail();
        } catch (error) {
            Alert.alert("Error updating product", error.message);
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <Text style={{ color: textColor }}>Product not found.</Text>
            </View>
        );
    }

    const statusColor = product.isFeatured ? '#16A34A' : '#FFA500';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.productName, { color: textColor }]}>
                        {product.name}
                    </Text>
                    <Text style={[styles.status, { color: statusColor, borderColor: statusColor }]}>
                        {product.isFeatured ? "Featured" : "Not Featured"}
                    </Text>
                </View>
                <Image source={{ uri: product.img }} style={styles.productImage} />
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Details</Text>
                    <DetailRow label="Brand" value={product.brand} textColor={textColor} />
                    <DetailRow label="Category" value={product.category} textColor={textColor} />
                    <DetailRow label="Price" value={`$${product.price.toFixed(2)}`} textColor={subduedTextColor} />
                    <DetailRow label="Stock Quantity" value={product.quantity} textColor={subduedTextColor} />
                </View>
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Variants</Text>
                    <DetailRow label="Sizes" value={product.size.join(', ')} textColor={subduedTextColor} />
                    <DetailRow label="Colors" value={product.color.join(', ')} textColor={subduedTextColor} />
                </View>
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Description</Text>
                    <Text style={[styles.descriptionText, { color: subduedTextColor }]}>
                        {product.description || "No description provided."}
                    </Text>
                </View>
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Actions</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.updateButton]}
                            onPress={handleOpenUpdateModal}
                            disabled={isUpdating}
                        >
                            <Text style={styles.actionButtonText}>Update Product Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.updateButton, { backgroundColor: '#555' }]}
                            onPress={handleToggleFeatured}
                            disabled={isUpdating}
                        >
                            <Text style={styles.actionButtonText}>
                                {isUpdating ? "..." : (product.isFeatured ? "Remove from Featured" : "Mark as Featured")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.detailCard, { backgroundColor: cardBg, borderWidth: 1 }]}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDeleteProduct}
                        disabled={isUpdating}
                    >
                        <Text style={styles.actionButtonText}>
                            {isUpdating ? "Deleting..." : 'Delete This Product'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
                                    Update Product
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
                                    isUpdating && styles.buttonDisabled,
                                ]}
                                onPress={handleSubmitUpdate}
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.buttonText}>Save Changes</Text>
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

