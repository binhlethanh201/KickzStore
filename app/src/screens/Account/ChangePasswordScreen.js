import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { getToken } from "../../utils/auth";
import styles from "./updateStyles";
export default function ChangePasswordScreen({ navigation }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (key, val) => setForm({ ...form, [key]: val });
  const confirmChangePassword = () => {
    Alert.alert(
      "Confirm Password Change",
      "Are you sure you want to change your password?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: handleChangePassword },
      ]
    );
  };
  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = form;
    if (!oldPassword || !newPassword || !confirmPassword)
      return Alert.alert("Error", "Please fill all fields.");
    if (newPassword !== confirmPassword)
      return Alert.alert("Error", "Passwords do not match.");
    try {
      const token = await getToken();
      if (!token) return Alert.alert("Error", "You must be logged in.");
      setLoading(true);
      const response = await fetch("http://localhost:9999/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("ChangePassword Error:", err);
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={form.oldPassword}
        onChangeText={(val) => handleChange("oldPassword", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={form.newPassword}
        onChangeText={(val) => handleChange("newPassword", val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(val) => handleChange("confirmPassword", val)}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={confirmChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Change Password"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
