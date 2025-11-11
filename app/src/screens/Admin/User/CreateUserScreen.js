import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./createuserstyles";

export default function CreateUserScreen() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";

    const backgroundColor = isDarkMode ? "#121212" : "#F5F5F5";
    const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
    const textColor = isDarkMode ? "#FFFFFF" : "#111111";
    const placeholderColor = isDarkMode ? "#888" : "#999";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleCreate = async () => {
        if (!firstName || !email || !password) {
            Alert.alert("Missing Fields", "First Name, Email, and Password are required.");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            const payload = {
                firstName,
                lastName,
                email,
                password,
                role: isAdmin ? "admin" : "user",
            };

            const res = await fetch("http://localhost:9999/api/admin/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert("Success", "User created successfully.");
                navigation.goBack();
            } else {
                Alert.alert("Creation Failed", data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Create user error:", error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['top']}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.title, { color: textColor }]}>Create New User</Text>

                <View style={[styles.formCard, { backgroundColor: cardBg }]}>
                    <TextInput
                        style={[styles.input, { color: textColor, borderColor: isDarkMode ? '#333' : '#EEE' }]}
                        placeholder="First Name"
                        placeholderTextColor={placeholderColor}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={[styles.input, { color: textColor, borderColor: isDarkMode ? '#333' : '#EEE' }]}
                        placeholder="Last Name"
                        placeholderTextColor={placeholderColor}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={[styles.input, { color: textColor, borderColor: isDarkMode ? '#333' : '#EEE' }]}
                        placeholder="Email Address"
                        placeholderTextColor={placeholderColor}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[styles.input, { color: textColor, borderColor: isDarkMode ? '#333' : '#EEE' }]}
                        placeholder="Password"
                        placeholderTextColor={placeholderColor}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.switchContainer}>
                        <Text style={[styles.switchLabel, { color: textColor }]}>Is Admin?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isAdmin ? "#1E90FF" : "#f4f3f4"}
                            onValueChange={setIsAdmin}
                            value={isAdmin}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleCreate}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Create User</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
