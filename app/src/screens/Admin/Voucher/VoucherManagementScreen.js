import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    RefreshControl,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function VoucherManagementScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreatingVoucher, setIsCreatingVoucher] = useState(false);

    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [discountType, setDiscountType] = useState("Percentage");
    const [discountValue, setDiscountValue] = useState("");
    const [minOrderValue, setMinOrderValue] = useState("");
    const [maxUsage, setMaxUsage] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [isActive, setIsActive] = useState(true);

    const fetchVouchers = async () => {
        try {
            const token = await getToken();
            if (!token) {
                Alert.alert("Error", "You are not authorized.");
                if (!refreshing) setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:9999/api/admin/vouchers", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 403) {
                Alert.alert("Access Denied", "You are not an admin.");
                if (!refreshing) setLoading(false);
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setVouchers(data);
            } else {
                Alert.alert("Error", data.message || "Failed to load vouchers.");
            }
        } catch (error) {
            console.error("Fetch vouchers error:", error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            if (!refreshing) setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchVouchers();
        }, [])
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchVouchers();
    }, []);

    const handleDeleteVoucher = (voucher) => {
        Alert.alert(
            "Delete Voucher",
            `Are you sure you want to delete voucher "${voucher.code}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await getToken();
                            const res = await fetch(
                                `http://localhost:9999/api/admin/vouchers/${voucher._id}`,
                                {
                                    method: "DELETE",
                                    headers: { Authorization: `Bearer ${token}` },
                                }
                            );

                            if (res.ok) {
                                Alert.alert("Success", "Voucher deleted successfully.");
                                setVouchers((prevVouchers) =>
                                    prevVouchers.filter((v) => v._id !== voucher._id)
                                );
                            } else {
                                const data = await res.json();
                                Alert.alert("Error", data.message || "Failed to delete voucher.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Could not connect to server.");
                        }
                    },
                },
            ]
        );
    };

    const handleToggleActive = (voucher) => {
        const newStatus = !voucher.isActive;
        Alert.alert(
            "Update Status",
            `Are you sure you want to set voucher "${voucher.code}" to "${newStatus ? "Active" : "Inactive"
            }"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update",
                    style: "default",
                    onPress: async () => {
                        try {
                            const token = await getToken();
                            const res = await fetch(
                                `http://localhost:9999/api/admin/vouchers/${voucher._id}`,
                                {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ isActive: newStatus }),
                                }
                            );

                            if (res.ok) {
                                Alert.alert("Success", "Voucher status updated successfully.");
                                fetchVouchers();
                            } else {
                                const data = await res.json();
                                Alert.alert("Error", data.message || "Failed to update status.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Could not connect to server.");
                        }
                    },
                },
            ]
        );
    };

    const handleOpenCreateModal = () => setIsModalVisible(true);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsCreatingVoucher(false);
        setCode("");
        setDescription("");
        setDiscountType("Percentage");
        setDiscountValue("");
        setMinOrderValue("");
        setMaxUsage("");
        setExpiresAt("");
        setIsActive(true);
    };

    const handleSubmitNewVoucher = async () => {
        if (!code || !discountValue) {
            Alert.alert("Missing Fields", "Code and Discount Value are required.");
            return;
        }

        setIsCreatingVoucher(true);
        try {
            const token = await getToken();
            const payload = {
                code,
                description: description || undefined,
                discountType,
                discountValue: parseFloat(discountValue),
                minOrderValue: minOrderValue ? parseFloat(minOrderValue) : 0,
                maxUsage: maxUsage ? parseInt(maxUsage) : undefined,
                expiresAt: expiresAt || undefined,
                isActive,
            };

            const res = await fetch("http://localhost:9999/api/admin/vouchers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.status === 201) {
                Alert.alert("Success", "Voucher created successfully.");
                handleCloseModal();
                fetchVouchers();
            } else {
                Alert.alert("Creation Failed", data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Create voucher error:", error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setIsCreatingVoucher(false);
        }
    };

    const styles = getDynamicStyles(isDarkMode);
    const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const iconColor = isDarkMode ? "#FFFFFF" : "#111111";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const placeholderColor = isDarkMode ? "#888" : "#999";


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.itemInfo}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("VoucherDetailScreen", { voucherId: item._id })}
            >
                <Text style={styles.itemCode}>{item.code}</Text>
                <Text style={styles.itemDetails}>
                    {item.discountType === "percent"
                        ? `${item.discountValue}%`
                        : `$${item.discountValue}`}{" "}
                    OFF
                </Text>
                {item.description && (
                    <Text style={styles.itemDescription}>{item.description}</Text>
                )}
                <Text
                    style={[
                        styles.itemStatus,
                        { color: item.isActive ? "#16A34A" : "#DC2626" },
                    ]}
                >
                    {item.isActive ? "Active" : "Inactive"}
                </Text>
            </TouchableOpacity>
            <View style={styles.itemActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleToggleActive(item)}
                >
                    <Text style={styles.updateText}>
                        {item.isActive ? "Deactivate" : "Activate"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteVoucher(item)}
                >
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
            <FlatList
                data={vouchers}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <Text style={[styles.title, { color: textColor }]}>
                            Voucher Management
                        </Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleOpenCreateModal}
                        >
                            <Ionicons name="add-circle-outline" size={32} color={iconColor} />
                        </TouchableOpacity>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={{ color: "#888", textAlign: "center", marginTop: 50 }}>
                        No vouchers found.
                    </Text>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={textColor}
                    />
                }
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
                                    Create New Voucher
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
                                style={styles.input}
                                placeholder="Voucher Code"
                                placeholderTextColor={placeholderColor}
                                value={code}
                                onChangeText={setCode}
                                autoCapitalize="characters"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Description (Optional)"
                                placeholderTextColor={placeholderColor}
                                value={description}
                                onChangeText={setDescription}
                            />

                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={discountType}
                                    onValueChange={(itemValue) => setDiscountType(itemValue)}
                                    style={{ color: textColor }}
                                    itemStyle={{ color: textColor }}
                                >
                                    <Picker.Item label="Percentage (%)" value="Percentage" />
                                    <Picker.Item label="Fixed Amount ($)" value="Fixed" />
                                </Picker>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Discount Value (e.g., 10 or 15.50)"
                                placeholderTextColor={placeholderColor}
                                value={discountValue}
                                onChangeText={setDiscountValue}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Min. Order Value (e.g., 50)"
                                placeholderTextColor={placeholderColor}
                                value={minOrderValue}
                                onChangeText={setMinOrderValue}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Maximum Usage (e.g., 100)"
                                placeholderTextColor={placeholderColor}
                                value={maxUsage}
                                onChangeText={setMaxUsage}
                                keyboardType="number-pad"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Expires At (YYYY/MM/DD)"
                                placeholderTextColor={placeholderColor}
                                value={expiresAt}
                                onChangeText={setExpiresAt}
                                keyboardType="numeric"
                            />

                            <View style={styles.switchContainer}>
                                <Text style={[styles.switchLabel, { color: textColor }]}>
                                    Is Active?
                                </Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isActive ? "#1E90FF" : "#f4f3f4"}
                                    onValueChange={setIsActive}
                                    value={isActive}
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.createButton,
                                    isCreatingVoucher && styles.buttonDisabled,
                                ]}
                                onPress={handleSubmitNewVoucher}
                                disabled={isCreatingVoucher}
                            >
                                {isCreatingVoucher ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.buttonText}>Create Voucher</Text>
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


const getDynamicStyles = (isDarkMode) => {
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const placeholderColor = isDarkMode ? "#888" : "#999";
    const inputBorder = isDarkMode ? "#333" : "#EEE";

    return StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        listHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 15,
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
        },
        addButton: {
            padding: 5,
        },
        itemContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
            borderBottomWidth: 1,
            borderColor: inputBorder,
            backgroundColor: cardBg,
            marginHorizontal: 15,
            borderRadius: 10,
            marginBottom: 10,
        },
        itemInfo: {
            flex: 1,
        },
        itemCode: {
            fontSize: 18,
            fontWeight: "bold",
            color: textColor,
        },
        itemDetails: {
            fontSize: 14,
            color: isDarkMode ? "#AAA" : "#555",
            marginTop: 4,
        },
        // Style mới cho description
        itemDescription: {
            fontSize: 12,
            color: isDarkMode ? "#888" : "#777",
            fontStyle: 'italic',
            marginTop: 4,
        },
        itemStatus: {
            fontSize: 14,
            fontWeight: "600",
            marginTop: 4,
        },
        itemActions: {
            flexDirection: "column",
            alignItems: "flex-end",
        },
        actionButton: {
            paddingVertical: 6,
            paddingHorizontal: 10,
        },
        updateText: {
            color: "#1E90FF",
            fontWeight: "600",
        },
        deleteText: {
            color: "#DC2626",
            fontWeight: "600",
        },
        // Modal Styles
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        modalContent: {
            maxHeight: "85%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
        },
        modalHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: inputBorder,
            paddingBottom: 15,
            marginBottom: 15,
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: "bold",
        },
        input: {
            height: 50,
            borderColor: inputBorder,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 15,
            color: textColor,
            backgroundColor: isDarkMode ? "#2C2C2C" : "#F5F5F5",
        },
        pickerContainer: {
            borderColor: inputBorder,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            backgroundColor: isDarkMode ? "#2C2C2C" : "#F5F5F5",
            justifyContent: "center",
        },
        switchContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            paddingVertical: 10,
        },
        switchLabel: {
            fontSize: 16,
        },
        createButton: {
            backgroundColor: "#16A34A",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 10,
        },
        buttonDisabled: {
            backgroundColor: "#888",
        },
        buttonText: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "bold",
        },
        cancelButton: {
            padding: 10,
            alignItems: "center",
        },
        cancelButtonText: {
            color: "#DC2626",
            fontSize: 16,
        },
    });
};

