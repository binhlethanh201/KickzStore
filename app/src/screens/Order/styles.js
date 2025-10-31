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
});

export default styles;