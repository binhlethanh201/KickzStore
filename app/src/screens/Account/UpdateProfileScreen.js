import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { getToken } from "../../utils/auth";
import styles from "./updateStyles";
export default function UpdateProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
    gender: user.gender || "M",
    phone: user.phone || "",
    address: {
      street: user.address?.street || "",
      district: user.address?.district || "",
      city: user.address?.city || "",
      country: user.address?.country || "",
    },
    email: user.email || "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const handleAddressChange = (key, value) =>
    setForm({ ...form, address: { ...form.address, [key]: value } });
  const handleUpdate = async () => {
    try {
      const token = await getToken();
      if (!token) return Alert.alert("Error", "You must be logged in.");
      setLoading(true);
      const response = await fetch("http://localhost:9999/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("UpdateProfile Error:", err);
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Update Your Personal Information</Text>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(val) => handleChange("firstName", val)}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(val) => handleChange("lastName", val)}
      />
      <Text style={styles.label}>Date of Birth (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={form.dateOfBirth}
        onChangeText={(val) => handleChange("dateOfBirth", val)}
      />
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(val) => handleChange("phone", val)}
      />
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.subLabel}>Street:</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={form.address.street}
        onChangeText={(val) => handleAddressChange("street", val)}
      />
      <Text style={styles.subLabel}>District:</Text>
      <TextInput
        style={styles.input}
        placeholder="District"
        value={form.address.district}
        onChangeText={(val) => handleAddressChange("district", val)}
      />
      <Text style={styles.subLabel}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.address.city}
        onChangeText={(val) => handleAddressChange("city", val)}
      />
      <Text style={styles.subLabel}>Country:</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={form.address.country}
        onChangeText={(val) => handleAddressChange("country", val)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(val) => handleChange("email", val)}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Updating..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
