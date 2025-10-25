import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { saveToken } from "../../utils/auth";
import styles from "./registerStyles";
export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "M",
    email: "",
    password: "",
  });
  const [address, setAddress] = useState({
    street: "",
    district: "",
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (key, value) => setForm({ ...form, [key]: value });
  const handleDateInput = (value) => {
    let cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 4 && cleaned.length <= 6) {
      cleaned = `${cleaned.slice(0, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length > 6) {
      cleaned = `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}/${cleaned.slice(6, 8)}`;
    }
    handleChange("dateOfBirth", cleaned);
  };
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleRegister = async () => {
    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      return Alert.alert("Validation Error", "Please fill in all required fields.");
    }
    if (!validateEmail(email)) {
      return Alert.alert("Validation Error", "Please enter a valid email address.");
    }
    const payload = { ...form, address };
    try {
      setLoading(true);
      const response = await fetch("http://localhost:9999/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        const loginRes = await fetch("http://localhost:9999/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          await saveToken(loginData.token);
          Alert.alert("Success", "Account created and logged in successfully!");
          navigation.navigate("MainMenu", { screen: "Home" });
        } else {
          Alert.alert("Registration Complete", "Please log in manually.");
          navigation.replace("Login");
        }
      } else {
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Register Error:", error);
      Alert.alert("Error", "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to start shopping</Text>
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={form.firstName}
        onChangeText={(val) => handleChange("firstName", val)}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={form.lastName}
        onChangeText={(val) => handleChange("lastName", val)}
        autoCapitalize="words"
      />
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600", color: "#444" }}>Gender</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[
            { label: "Male", value: "M" },
            { label: "Female", value: "F" },
            { label: "Other", value: "O" },
          ].map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.radioButton,
                form.gender === item.value && styles.radioButtonSelected,
              ]}
              onPress={() => handleChange("gender", item.value)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.radioCircle,
                  form.gender === item.value && styles.radioCircleSelected,
                ]}
              />
              <Text
                style={[
                  styles.radioLabel,
                  form.gender === item.value && styles.radioLabelSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TextInput
        placeholder="Street"
        style={styles.input}
        value={address.street}
        onChangeText={(val) => setAddress({ ...address, street: val })}
      />
      <TextInput
        placeholder="District"
        style={styles.input}
        value={address.district}
        onChangeText={(val) => setAddress({ ...address, district: val })}
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        value={address.city}
        onChangeText={(val) => setAddress({ ...address, city: val })}
      />
      <TextInput
        placeholder="Country"
        style={styles.input}
        value={address.country}
        onChangeText={(val) => setAddress({ ...address, country: val })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(val) => handleChange("email", val)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={form.password}
        onChangeText={(val) => handleChange("password", val)}
        secureTextEntry
      />
      <TextInput
        placeholder="Date of Birth (YYYY/MM/DD)"
        style={styles.input}
        value={form.dateOfBirth}
        onChangeText={handleDateInput}
        keyboardType="numeric"
        maxLength={10}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Register"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Log in
        </Text>
      </Text>
    </ScrollView>
  );
}
