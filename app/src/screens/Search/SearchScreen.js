import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:9999/api/products/search?q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      setResults(data);
      if (text.trim() && !recentSearches.includes(text.trim())) {
        setRecentSearches((prev) => [text.trim(), ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error("Error searching: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentPress = (term) => {
    setQuery(term);
    handleSearch(term);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("Home", {
          screen: "ProductDetail",
          params: { item, fromSearch: true }, // ✅ thêm flag này
        })
      }
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => handleRecentPress(item)}
    >
      <Text style={styles.recentText}>🔍 {item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Searching</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for shoes, brands, or styles..."
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
      />
      {query.length === 0 && recentSearches.length > 0 ? (
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRecentItem}
          />
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" color="#16A34A" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            query.length > 0 && !loading ? (
              <Text style={styles.emptyText}>No products found 😢</Text>
            ) : null
          }
        />
      )}
    </View>
  );
}
