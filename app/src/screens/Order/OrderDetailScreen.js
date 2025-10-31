import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../utils/auth";
import styles from "./styles";

const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};


const DetailProductItem = ({ item }) => (
    <View style={styles.detailProductItem}>
        <Image
            source={{ uri: item.productId?.img }}
            style={styles.detailProductImage}
        />
        <View style={styles.detailProductInfo}>
            <Text style={styles.detailProductName} numberOfLines={2}>
                {item.productId?.name || "Product not found"}
            </Text>
            <Text style={styles.detailProductPrice}>
                ${item.price.toFixed(2)}
            </Text>
        </View>
        <Text style={styles.detailProductQuantity}>x {item.quantity}</Text>
    </View>
);

const DetailRow = ({ label, value, valueStyle }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
    </View>
);

export default function OrderDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { orderId } = route.params;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const subtotal = order?.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return styles.statusCompleted;
            case "shipped":
                return styles.statusShipped;
            case "cancelled":
                return styles.statusCancelled;
            case "pending":
            default:
                return styles.statusPending;
        }
    };

    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!orderId) {
                Alert.alert("Error", "No Order ID provided");
                setLoading(false);
                return;
            }
            try {
                const token = await getToken();
                if (!token) {
                    Alert.alert("Error", "You are not authenticated.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(
                    `http://localhost:9999/api/orders/detail/${orderId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setOrder(data.order);
                } else {
                    Alert.alert("Error", data.message || "Failed to load order details.");
                }
            } catch (error) {
                console.error("Fetch order detail error:", error);
                Alert.alert("Error", "Could not connect to server.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    const handleCancelOrder = () => {
        if (isCancelling) return;

        Alert.alert(
            "Cancel Order",
            "Are you sure you want to cancel this order?",
            [
                {
                    text: "Don't Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes, Cancel",
                    style: "destructive",
                    onPress: async () => {
                        setIsCancelling(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(
                                `http://localhost:9999/api/orders/${orderId}/cancel`,
                                {
                                    method: "PUT",
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            const data = await res.json();
                            if (res.ok) {
                                Alert.alert("Success", "Your order has been cancelled.");
                                setOrder(data.order);
                            } else {
                                Alert.alert("Cancellation Failed", data.message);
                            }
                        } catch (error) {
                            console.error("Cancel order error:", error);
                            Alert.alert("Error", "Could not connect to server.");
                        } finally {
                            setIsCancelling(false);
                        }
                    },
                },
            ]
        );
    };

    const handleDeleteOrder = () => {
        if (isDeleting) return;
        Alert.alert(
            "Delete Order",
            "Are you sure you want to permanently delete this order from your history?",
            [
                {
                    text: "Keep It",
                    style: "cancel",
                },
                {
                    text: "Yes, Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsDeleting(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(
                                `http://localhost:9999/api/orders/${orderId}`,
                                {
                                    method: "DELETE",
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            const data = await res.json();
                            if (res.ok) {
                                Alert.alert("Success", "Order has been deleted.");
                                navigation.goBack();
                            } else {
                                Alert.alert("Deletion Failed", data.message);
                            }
                        } catch (error) {
                            console.error("Delete order error:", error);
                            Alert.alert("Error", "Could not connect to server.");
                        } finally {
                            setIsDeleting(false);
                        }
                    },
                },
            ]
        );
    };


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Order not found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.detailHeader}>
                    <Text style={styles.detailOrderId}>
                        Order ID: #{order._id.substring(0, 8)}...
                    </Text>
                    <View style={[styles.orderStatus, getStatusColor(order.status)]}>
                        <Text style={styles.orderStatusText}>{order.status}</Text>
                    </View>
                </View>
                <Text style={styles.detailDate}>{formatDate(order.createdAt)}</Text>
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>
                        Items ({order.items.length})
                    </Text>
                    {order.items.map((item) => (
                        <DetailProductItem key={item._id} item={item} />
                    ))}
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Shipping & Payment</Text>
                    <DetailRow label="Shipping Address" value={order.address} />
                    <DetailRow label="Shipping Method" value={order.shippingMethod} />
                    <DetailRow label="Payment Method" value={order.paymentMethod} />
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Financial Summary</Text>
                    <DetailRow
                        label="Subtotal"
                        value={`$${subtotal.toFixed(2)}`}
                    />
                    <DetailRow
                        label="Shipping Fee"
                        value={`$${order.shippingFee.toFixed(2)}`}
                    />
                    <DetailRow
                        label="Discount"
                        value={`-$${order.discount.toFixed(2)}`}
                        valueStyle={styles.discountValue}
                    />
                    {order.voucherCode && (
                        <DetailRow
                            label="Promo Code"
                            value={order.voucherCode}
                        />
                    )}
                    <View style={styles.summaryTotal}>
                        <Text style={styles.summaryTotalLabel}>Total</Text>
                        <Text style={styles.summaryTotalValue}>
                            ${order.totalPrice.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            {order.status === 'pending' && (
                <View style={styles.cancelButtonFooter}>
                    <TouchableOpacity
                        style={[
                            styles.cancelButton,
                            isCancelling && styles.cancelButtonDisabled,
                        ]}
                        onPress={handleCancelOrder}
                        disabled={isCancelling}
                    >
                        {isCancelling ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.cancelButtonText}>Cancel Order</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
            {order.status === 'cancelled' && (
                <View style={styles.cancelButtonFooter}>
                    <TouchableOpacity
                        style={[
                            styles.cancelButton,
                            isDeleting && styles.cancelButtonDisabled,
                        ]}
                        onPress={handleDeleteOrder}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.cancelButtonText}>Delete from History</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

