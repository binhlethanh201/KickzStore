import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./voucherdetailstyles";

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDiscountType = (type) => {
    if (type === 'percent') return 'Percentage (%)';
    if (type === 'amount') return 'Fixed Amount ($)';
    return type;
};

const DetailRow = ({ label, value, valueStyle }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, valueStyle]} selectable>{value}</Text>
    </View>
);

export default function VoucherDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { voucherId } = route.params;

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#121212" : "#F5F5F5";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const subduedTextColor = isDarkMode ? "#AAAAAA" : "#555555";

    const [voucher, setVoucher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchVoucherDetail = async () => {
        try {
            const token = await getToken();
            if (!token) throw new Error("You are not authorized.");

            const res = await fetch(`http://localhost:9999/api/admin/vouchers/${voucherId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch voucher");

            setVoucher(data);
        } catch (error) {
            console.error("Fetch voucher detail error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setIsUpdating(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchVoucherDetail();
        }, [voucherId])
    );

    const handleToggleActive = () => {
        if (!voucher) return;
        const newStatus = !voucher.isActive;

        Alert.alert(
            "Update Status",
            `Are you sure you want to set this voucher to "${newStatus ? "Active" : "Inactive"}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update", style: "default", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/vouchers/${voucher._id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ isActive: newStatus })
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to update status");

                            Alert.alert("Success", "Voucher status updated.");
                            fetchVoucherDetail();
                        } catch (error) {
                            Alert.alert("Error", error.message);
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const handleDeleteVoucher = () => {
        Alert.alert(
            "Delete Voucher",
            "Are you sure you want to permanently delete this voucher?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/vouchers/${voucher._id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                            });

                            const data = await res.json();
                            if (!res.ok) throw new Error(data.message || "Failed to delete voucher");

                            Alert.alert("Success", "Voucher deleted successfully.");
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

    if (!voucher) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <Text style={{ color: textColor }}>Voucher not found.</Text>
            </View>
        );
    }

    const statusColor = voucher.isActive ? '#16A34A' : '#DC143C';
    const discountText = voucher.discountType === 'percent'
        ? `${voucher.discountValue}% OFF`
        : `$${voucher.discountValue.toFixed(2)} OFF`;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.headerCode, { color: textColor }]}>
                        {voucher.code}
                    </Text>
                    <Text style={[styles.status, { color: statusColor, borderColor: statusColor }]}>
                        {voucher.isActive ? "Active" : "Inactive"}
                    </Text>
                </View>
                <Text style={styles.headerDescription}>
                    {voucher.description || "No description provided."}
                </Text>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Details</Text>
                    <DetailRow label="Discount" value={discountText} textColor={textColor} />
                    <DetailRow label="Type" value={formatDiscountType(voucher.discountType)} textColor={subduedTextColor} />
                    <DetailRow label="Min. Order Value" value={`$${voucher.minOrderValue.toFixed(2)}`} textColor={subduedTextColor} />
                    <DetailRow label="Voucher ID" value={voucher._id} textColor={subduedTextColor} />
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Availability</Text>
                    <DetailRow label="Start Date" value={formatDate(voucher.startDate)} textColor={subduedTextColor} />
                    <DetailRow label="End Date" value={formatDate(voucher.endDate)} textColor={subduedTextColor} />
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Actions</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.updateButton]}
                            onPress={handleToggleActive}
                            disabled={isUpdating}
                        >
                            <Text style={styles.actionButtonText}>
                                {isUpdating ? "..." : (voucher.isActive ? "Deactivate" : "Activate")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDeleteVoucher}
                        disabled={isUpdating}
                    >
                        <Text style={styles.actionButtonText}>
                            {isUpdating ? "Deleting..." : 'Delete This Voucher'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

