import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111111",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#F5F5F5",
    color: "#222222",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  optionButtonSelected: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  optionButtonText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "500",
  },

  optionButtonTextSelected: {
    color: "#FFFFFF",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryItemText: {
    color: "#555555",
    fontSize: 15,
    flex: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  summaryLabel: {
    color: "#888888",
    fontSize: 16,
  },
  summaryValue: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryTotal: {
    marginTop: 15,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  summaryTotalLabel: {
    color: "#111111",
    fontSize: 20,
    fontWeight: "bold",
  },
  summaryTotalValue: {
    color: "#16A34A",
    fontSize: 20,
    fontWeight: "bold",
  },
  note: {
    color: "#999999",
    fontSize: 12,
    marginTop: 10,
    fontStyle: "italic",
  },
  footer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  placeOrderButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#DDDDDD",
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#EEEEEE',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  itemName: {
    color: '#222222',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetail: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 4,
  },
  itemQuantity: {
    color: '#555555',
    fontSize: 14,
  },
  itemPriceContainer: {
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  itemPrice: {
    color: '#111111',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#777777",
    textAlign: "center",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F9F9F9",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  orderDate: {
    fontSize: 13,
    color: "#777777",
  },
  orderProductList: {
    padding: 15,
  },
  orderProductItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderProductImage: {
    width: 45,
    height: 45,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "#EEEEEE",
  },
  orderProductInfo: {
    flex: 1,
  },
  orderProductName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444444",
  },
  orderProductDetails: {
    fontSize: 13,
    color: "#888888",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "#F9F9F9",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111111",
  },
  orderStatus: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  orderStatusText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusPending: {
    backgroundColor: "#FFA500",
  },
  statusProcessing: {
    backgroundColor: "#1E90FF",
  },
  statusShipped: {
    backgroundColor: "#32CD32",
  },
  statusCompleted: {
    backgroundColor: "#16A34A",
  },
  statusCancelled: {
    backgroundColor: "#DC143C",
  },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  detailOrderId: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  detailDate: {
    fontSize: 14,
    color: "#777",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailSection: {
    backgroundColor: "#F9F9F9",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: "#888",
    marginRight: 10,
  },
  detailValue: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  discountValue: {
    color: "#DC143C",
    fontWeight: "bold",
  },
  detailProductItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 15,
  },
  detailProductImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: "#EEEEEE",
  },
  detailProductInfo: {
    flex: 1,
  },
  detailProductName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  detailProductPrice: {
    fontSize: 14,
    color: "#777",
  },
  detailProductQuantity: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
    paddingLeft: 10,
  },

  cancelButtonFooter: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButtonDisabled: {
    backgroundColor: "#FFA07A",
  },
});

export default styles;

