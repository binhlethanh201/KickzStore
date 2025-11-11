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
import styles from "./userdetailstyles";


const DetailRow = ({ label, value, textColor }) => {
    if (!value) return null;
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={[styles.rowValue, { color: textColor }]} selectable>{value}</Text>
        </View>
    );
};

export default function UserDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params;

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#121212" : "#F5F5F5";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const subduedTextColor = isDarkMode ? "#AAAAAA" : "#555555";

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchUserDetail = async () => {
        try {
            const token = await getToken();
            if (!token) {
                Alert.alert("Error", "You are not authorized.");
                setLoading(false);
                return;
            }

            const res = await fetch(`http://localhost:9999/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to fetch user");
            }

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Fetch user detail error:", error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchUserDetail();
        }, [userId])
    );

    const handleDeleteUser = () => {
        if (!user) return;
        if (user.role === 'admin') {
            Alert.alert("Action Not Allowed", "Cannot delete an admin account.");
            return;
        }

        Alert.alert(
            "Delete User",
            `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/users/${user._id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                            });

                            if (res.ok) {
                                Alert.alert("Success", "User deleted successfully.");
                                navigation.goBack();
                            } else {
                                const data = await res.json();
                                Alert.alert("Error", data.message || "Failed to delete user.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Could not connect to server.");
                        } finally {
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const handleUpdateRole = () => {
        if (!user) return;
        const newRole = user.role === 'user' ? 'admin' : 'user';

        Alert.alert(
            "Update Role",
            `Are you sure you want to change ${user.firstName}'s role to "${newRole}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Update", style: "default", onPress: async () => {
                        setIsUpdating(true);
                        try {
                            const token = await getToken();
                            const res = await fetch(`http://localhost:9999/api/admin/users/${user._id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ role: newRole })
                            });

                            if (res.ok) {
                                const updatedUser = await res.json();
                                Alert.alert("Success", "User role updated successfully.");
                                setUser(updatedUser);
                            } else {
                                const data = await res.json();
                                Alert.alert("Error", data.message || "Failed to update role.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Could not connect to server.");
                        } finally {
                            setIsUpdating(false);
                        }
                    }
                }
            ]
        );
    };

    const formatGender = (gender) => {
        switch (gender) {
            case "M":
                return "Male";
            case "F":
                return "Female";
            case "O":
                return "Other";
            default:
                return "Not provided";
        }
    };

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <ActivityIndicator size="large" color="#16A34A" />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor }]}>
                <Text style={{ color: textColor }}>User not found.</Text>
            </View>
        );
    }


    const fullAddress = user.address
        ? [user.address.street, user.address.district, user.address.city, user.address.country].filter(Boolean).join(', ')
        : "Not provided";

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[styles.userName, { color: textColor }]}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={[styles.userRole, { color: user.role === 'admin' ? '#16A34A' : subduedTextColor }]}>
                        {user.role}
                    </Text>
                </View>

                <View style={[styles.detailCard, { backgroundColor: cardBg }]}>
                    <DetailRow label="User ID" value={user._id} textColor={subduedTextColor} />
                    <DetailRow label="Email" value={user.email} textColor={subduedTextColor} />
                    <DetailRow label="Phone" value={user.phone || "Not provided"} textColor={subduedTextColor} />
                    <DetailRow label="DateOfBirth" value={user.dateOfBirth || "Not provided"} textColor={subduedTextColor} />
                    <DetailRow label="Gender" value={formatGender(user.gender)} textColor={subduedTextColor} />
                    <DetailRow label="Address" value={fullAddress} textColor={subduedTextColor} />
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.updateButton]}
                        onPress={handleUpdateRole}
                        disabled={isUpdating}
                    >
                        <Text style={styles.actionButtonText}>
                            {isUpdating ? "..." : (user.role === 'user' ? 'Promote to Admin' : 'Demote to User')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDeleteUser}
                        disabled={isUpdating}
                    >
                        <Text style={styles.actionButtonText}>
                            {isUpdating ? "..." : 'Delete User'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
