import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  orderId: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  orderDate: {
    fontSize: 14,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: 15,
    color: "#888",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  discountValue: {
    color: "#DC143C",
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
  },
  productBrand: {
    fontSize: 13,
    color: "#888",
  },
  productPriceInfo: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
  productQuantity: {
    fontSize: 13,
    color: "#888",
  },
  actionContainer: {
    flexDirection: "column",
    gap: 10,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#1E90FF",
  },
  deleteButton: {
    backgroundColor: "#DC143C",
  },
});

export default styles;
