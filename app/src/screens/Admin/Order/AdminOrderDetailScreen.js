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
    useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./adminorderdetailstyles";

const ALL_STATUSES = ["pending", "processing", "shipped", "completed", "cancelled"];

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const DetailRow = ({ label, value, valueStyle }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, valueStyle]} selectable>{value}</Text>
    </View>
);

const ProductItem = ({ item, textColor }) => (
    <View style={styles.productItem}>
        <Image source={{ uri: item.productId?.img }} style={styles.productImage} />
        <View style={styles.productInfo}>
            <Text style={[styles.productName, { color: textColor }]} numberOfLines={2}>
                {item.productId?.name || "Product Not Found"}
            </Text>
            <Text style={styles.productBrand}>
                {item.productId?.brand || "No Brand"}
            </Text>
        </View>
        <View style={styles.productPriceInfo}>
            <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
            <Text style={[styles.productPrice, { color: textColor }]}>${item.price.toFixed(2)}</Text>
        </View>
    </View>
);

export default function AdminOrderDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { orderId } = route.params;

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const backgroundColor = isDarkMode ? "#121212" : "#F5F5F5";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const subduedTextColor = isDarkMode ? "#AAAAAA" : "#555555";

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchOrderDetail = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("You are not authorized.");

            const res = await fetch(`http://localhost:9999/api/admin/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch order");

            setOrder(data);
        } catch (error) {
            console.error("Fetch order detail error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setIsUpdating(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchOrderDetail();
        }, [orderId])
    );

    const handleUpdateStatus = (newStatus) => {
        Alert.alert(
            "Update Status",
            `Are you sure you want to change status to "${newStatus}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update", style: "default", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/orders/${orderId}/status`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ status: newStatus })
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to update status");

                            Alert.alert("Success", "Order status updated.");
                            fetchOrderDetail();
                        } catch (error) {
                            Alert.alert("Error", error.message);
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const handleDeleteOrder = () => {
        Alert.alert(
            "Delete Order",
            "Are you sure you want to permanently delete this order? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/orders/${orderId}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to delete order");

                            Alert.alert("Success", "Order deleted successfully.");
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

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <Text style={{ color: textColor }}>Order not found.</Text>
            </View>
        );
    }

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const user = order.userId;
    const statusColor = (order.status === 'completed' || order.status === 'shipped') ? '#16A34A' :
        (order.status === 'cancelled') ? '#DC143C' : '#FFA500';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.orderId, { color: textColor }]}>
                        Order #{order._id.substring(0, 8)}...
                    </Text>
                    <Text style={[styles.status, { color: statusColor, borderColor: statusColor }]}>
                        {order.status}
                    </Text>
                </View>
                <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Customer</Text>
                    <DetailRow label="Name" value={user ? `${user.firstName} ${user.lastName}` : "N/A"} textColor={textColor} />
                    <DetailRow label="Email" value={user ? user.email : "N/A"} textColor={subduedTextColor} />
                    <DetailRow label="Address" value={order.address} textColor={subduedTextColor} />
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Items ({order.items.length})</Text>
                    {order.items.map((item) => (
                        <ProductItem key={item._id} item={item} textColor={textColor} />
                    ))}
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Financials</Text>
                    <DetailRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} textColor={subduedTextColor} />
                    <DetailRow label="Shipping Fee" value={`$${order.shippingFee.toFixed(2)}`} textColor={subduedTextColor} />
                    <DetailRow label="Discount" value={`-$${order.discount.toFixed(2)}`} valueStyle={styles.discountValue} />
                    {order.voucherCode && (
                        <DetailRow label="Voucher" value={order.voucherCode} textColor={subduedTextColor} />
                    )}
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalLabel, { color: textColor }]}>Total Paid</Text>
                        <Text style={[styles.totalValue, { color: textColor }]}>
                            ${order.totalPrice.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Actions</Text>
                    <View style={styles.actionContainer}>
                        {ALL_STATUSES
                            .filter(status => status !== order.status)
                            .map(status => (
                                <TouchableOpacity
                                    key={status}
                                    style={[styles.actionButton, styles.updateButton]}
                                    onPress={() => handleUpdateStatus(status)}
                                    disabled={isUpdating}
                                >
                                    <Text style={styles.actionButtonText}>
                                        Mark as "{status}"
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDeleteOrder}
                        disabled={isUpdating}
                    >
                        <Text style={styles.actionButtonText}>
                            {isUpdating ? "Deleting..." : 'Delete This Order'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
