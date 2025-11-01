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
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  // Style cho Product Item
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginRight: 15,
  },
  productInfoContainer: {
    flex: 1, // Chiếm không gian
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSubText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },
  productStockContainer: {
    paddingLeft: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  productStockLabel: {
    fontSize: 13,
    color: '#888',
  },
  productStockValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
