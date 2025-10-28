import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemText: { fontSize: 16 },
  itemPrice: { fontWeight: "600" },
  shippingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 5,
  },
  shippingOptionSelected: {
    borderColor: "#00C39A",
    backgroundColor: "#E8FDF7",
  },
  shippingText: { fontSize: 16 },
  shippingPrice: { fontWeight: "600" },
  voucherRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  voucherButton: {
    backgroundColor: "#00C39A",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  voucherButtonText: { color: "#fff", fontWeight: "600" },
  voucherApplied: { color: "green", marginTop: 8 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: { fontSize: 18, fontWeight: "700" },
  checkoutButton: {
    backgroundColor: "#00C39A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
