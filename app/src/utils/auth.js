import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (e) {
    console.error("Error saving token", e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("authToken");
  } catch (e) {
    console.error("Error reading token", e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (e) {
    console.error("Error removing token", e);
  }
};
export default {};
