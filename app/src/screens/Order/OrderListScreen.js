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
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderProductItem = ({ item }) => (
    <View style={styles.orderProductItem}>
        <Image
            source={{ uri: item.productId?.img }}
            style={styles.orderProductImage}
        />
        <View style={styles.orderProductInfo}>
            <Text style={styles.orderProductName} numberOfLines={1}>
                {item.productId?.name || "Product not found"}
            </Text>
            <Text style={styles.orderProductDetails}>
                Price: ${item.price} | Qty: {item.quantity}
            </Text>
        </View>
    </View>
);

const OrderItem = ({ order, navigation }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return styles.statusCompleted;
            case "shipped": return styles.statusShipped;
            case "processing": return styles.statusProcessing;
            case "paid": return styles.statusPaid;
            case "cancelled": return styles.statusCancelled;
            case "pending":
            default:
                return styles.statusPending;
        }
    };

    return (
        <TouchableOpacity
            style={styles.orderItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("OrderDetail", { orderId: order._id })}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order ID: #{order._id.substring(0, 8)}...</Text>
                <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
            </View>

            <View style={styles.orderProductList}>
                {order.items.map((item) => (
                    <OrderProductItem key={item._id} item={item} />
                ))}
            </View>

            <View style={styles.orderFooter}>
                <View style={[styles.orderStatus, getStatusColor()]}>
                    <Text style={styles.orderStatusText}>{order.status}</Text>
                </View>
                <Text style={styles.orderTotal}>Total: ${order.totalPrice.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default function OrderListScreen() {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            if (!token) {
                setIsLoggedIn(false);
                setOrders([]);
                return;
            }

            const profileRes = await fetch("http://localhost:9999/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const profileData = await profileRes.json();
            if (!profileRes.ok) {
                setIsLoggedIn(false);
                setOrders([]);
                return;
            }

            setIsLoggedIn(true);
            const userId = profileData.user._id;

            const ordersRes = await fetch(`http://localhost:9999/api/orders/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await ordersRes.json();
            if (ordersRes.ok) {
                setOrders(data.orders);
            } else {
                Alert.alert("Error", data.message || "Failed to load orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            Alert.alert("Error", "Cannot connect to server");
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

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    if (!isLoggedIn) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Please login to see your orders.</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.loginButtonText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <SafeAreaView style={styles.safeContainer} edges={['top']}>
                <FlatList
                    data={[]}
                    ListHeaderComponent={
                        <Text style={styles.title}>My Orders</Text>
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You have no orders yet.</Text>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer} edges={['top']}>
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderItem order={item} navigation={navigation} />}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <Text style={styles.title}>My Orders</Text>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}
