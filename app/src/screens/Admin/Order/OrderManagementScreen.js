import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./styles";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderItem = ({ order, navigation, textColor, cardBorder }) => {

    const getStatusStyle = () => {
        switch (order.status) {
            case "completed":
                return styles.statusCompleted;
            case "shipped":
                return styles.statusShipped;
            case "cancelled":
                return styles.statusCancelled;
            case "processing":
                return styles.statusProcessing;
            case "pending":
            default:
                return styles.statusPending;
        }
    };
    const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);

    return (
        <TouchableOpacity
            style={[styles.orderItem, { borderColor: cardBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("AdminOrderDetail", { orderId: order._id })}
        >
            <View style={styles.orderHeader}>
                <Text style={[styles.orderId, { color: textColor }]}>
                    #{order._id.substring(0, 8)}...
                </Text>
                <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userLabel}>User:</Text>
                <Text style={[styles.userEmail, { color: textColor }]} numberOfLines={1}>
                    {order.userId ? order.userId.email : 'User not found'}
                </Text>
            </View>
            <View style={styles.orderFooter}>
                <View style={[styles.orderStatus, getStatusStyle()]}>
                    <Text style={styles.orderStatusText}>{statusText}</Text>
                </View>
                <Text style={[styles.orderTotal, { color: textColor }]}>
                    ${order.totalPrice.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function OrderManagementScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const cardBorder = isDarkMode ? '#333' : '#EEE';

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("You are not authorized.");

            const res = await fetch("http://localhost:9999/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 403) throw new Error("Access Denied. Admins only.");

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load orders.");

            setOrders(data);
        } catch (error) {
            console.error("Fetch orders error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchOrders();
        }, [])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchOrders();
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
                data={orders}
                renderItem={({ item }) => (
                    <OrderItem
                        order={item}
                        navigation={navigation}
                        textColor={textColor}
                        cardBorder={cardBorder}
                    />
                )}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <Text style={[styles.title, { color: textColor }]}>
                        Order Management
                    </Text>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No orders found.</Text>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

