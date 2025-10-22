import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getToken, removeToken } from "../../utils/auth";
import styles from "./styles";

export default function AccountScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:9999/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    setUser(null);
    Alert.alert("Logged out", "You have been signed out successfully.");
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={{ alignItems: "center", marginBottom: 25 }}>
            <Image
              source={{
                uri:
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              }}
              style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 10 }}
            />
            <Text style={styles.title}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={{ color: "#666", marginBottom: 5 }}>{user.email}</Text>
            <Text style={{ color: "#666" }}>
              {user.address ? user.address : "No address provided"}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e11d48" }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Sign in or create a new account</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "orange", marginTop: 10 }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
