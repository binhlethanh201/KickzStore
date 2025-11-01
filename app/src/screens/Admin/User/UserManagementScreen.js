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
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken } from "../../../utils/auth";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function UserManagementScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#111111";
  const iconColor = isDarkMode ? "#FFFFFF" : "#111111";
  const cardBg = isDarkMode ? "#1E1E1E" : "#FFFFFF";
  const placeholderColor = isDarkMode ? "#888" : "#999";
  const inputBorder = isDarkMode ? '#333' : '#EEE';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUsers = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "You are not authorized.");
        if (!refreshing) setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:9999/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        Alert.alert("Access Denied", "You are not an admin.");
        if (!refreshing) setLoading(false);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setUsers(data);
      } else {
        Alert.alert("Error", data.message || "Failed to load users.");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      if (!refreshing) setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchUsers();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUsers();
  }, []);

  const handleDeleteUser = (user) => {
    if (user.role === 'admin') {
      Alert.alert("Action Not Allowed", "Cannot delete an admin account.");
      return;
    }

    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", style: "destructive", onPress: async () => {
            try {
              const token = await getToken();
              const res = await fetch(`http://localhost:9999/api/admin/users/${user._id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });

              if (res.ok) {
                Alert.alert("Success", "User deleted successfully.");
                setUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
              } else {
                const data = await res.json();
                Alert.alert("Error", data.message || "Failed to delete user.");
              }
            } catch (error) {
              Alert.alert("Error", "Could not connect to server.");
            }
          }
        }
      ]
    );
  };

  const handleUpdateRole = (user) => {
    const newRole = user.role === 'user' ? 'admin' : 'user';
    Alert.alert(
      "Update Role",
      `Are you sure you want to change ${user.firstName}'s role to "${newRole}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update", style: "default", onPress: async () => {
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
                Alert.alert("Success", "User role updated successfully.");
                fetchUsers();
              } else {
                const data = await res.json();
                Alert.alert("Error", data.message || "Failed to update role.");
              }
            } catch (error) {
              Alert.alert("Error", "Could not connect to server.");
            }
          }
        }
      ]
    );
  };

  const handleOpenCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsCreatingUser(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  const handleSubmitNewUser = async () => {
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!firstName || !email || !password) {
      Alert.alert("Missing Fields", "First Name, Email, and Password are required.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setIsCreatingUser(true);
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
        handleCloseModal();
        fetchUsers();
      } else {
        Alert.alert("Creation Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Create user error:", error);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setIsCreatingUser(false);
    }
  };


  const renderItem = ({ item }) => (
    <View style={[styles.userItem, { borderColor: isDarkMode ? '#333' : '#EEE' }]}>
      <TouchableOpacity
        style={styles.userInfo}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("UserDetailScreen", { userId: item._id })}
      >
        <Text style={[styles.userName, { color: textColor }]}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={[styles.userEmail, { color: isDarkMode ? '#AAA' : '#555' }]}>{item.email}</Text>
        <Text style={[styles.userRole, { color: item.role === 'admin' ? '#16A34A' : textColor }]}>
          {item.role}
        </Text>
      </TouchableOpacity>
      <View style={styles.userActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateRole(item)}
        >
          <Text style={styles.updateText}>
            {item.role === 'user' ? 'Promote' : 'Demote'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteUser(item)}
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={[styles.title, { color: textColor }]}>
              User Management
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={handleOpenCreateModal}>
              <Ionicons name="add-circle-outline" size={32} color={iconColor} />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>
            No users found.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                <Text style={[styles.modalTitle, { color: textColor }]}>Create New User</Text>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Ionicons name="close-circle" size={30} color={placeholderColor} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                placeholder="First Name"
                placeholderTextColor={placeholderColor}
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                placeholder="Last Name"
                placeholderTextColor={placeholderColor}
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
                placeholder="Email Address"
                placeholderTextColor={placeholderColor}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={[styles.input, { color: textColor, borderColor: inputBorder }]}
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

              <TouchableOpacity
                style={[styles.createButton, isCreatingUser && styles.buttonDisabled]}
                onPress={handleSubmitNewUser}
                disabled={isCreatingUser}
              >
                {isCreatingUser ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Create User</Text>
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

