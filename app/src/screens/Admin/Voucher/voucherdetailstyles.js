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
  headerCode: {
    fontSize: 28,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 1.5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    textTransform: "capitalize",
  },
  headerDescription: {
    fontSize: 15,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  detailCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  row: {
    marginBottom: 15,
  },
  rowLabel: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  discountValue: {
    color: "#DC143C",
    fontWeight: "bold",
  },
  actionContainer: {
    width: "100%",
  },
  actionButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#1E90FF',
  },
  deleteButton: {
    backgroundColor: '#DC143C',
  },
});

export default styles;

