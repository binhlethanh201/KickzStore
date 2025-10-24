import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  productImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  productQty: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 15,
    color: "#16A34A",
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: "#16A34A",
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  voucherInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  applyButton: {
    backgroundColor: "#16A34A",
    borderRadius: 8,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 15,
    marginBottom: 5,
  },
  summaryTotal: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#16A34A",
    marginTop: 5,
  },
  placeOrderBtn: {
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
