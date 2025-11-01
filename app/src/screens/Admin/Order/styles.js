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
  orderItem: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 13,
    color: "#888",
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  userLabel: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
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
    textTransform: 'capitalize',
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
});

export default styles;

