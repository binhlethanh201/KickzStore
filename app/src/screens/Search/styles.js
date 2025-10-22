import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 60,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  info: { flex: 1 },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16A34A",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#888",
    fontSize: 15,
  },
  recentContainer: {
    marginTop: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  recentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentText: {
    fontSize: 16,
    color: "#333",
  },
});

export default styles;
