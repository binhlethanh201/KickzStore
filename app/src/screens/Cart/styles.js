import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
    paddingHorizontal: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: "#111",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  checkboxTick: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  productInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 3,
  },
  productBrand: {
    color: "#666",
    fontSize: 13,
  },
  productPrice: {
    color: "#111",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 6,
  },

  // --- Quantity Buttons ---
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "600",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  checkoutContainer: {
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 16,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  
  selectAllLabel: {
    fontSize: 15,
    color: "#111",
    fontWeight: "500",
    marginLeft: 8,
  },
  
  
});
