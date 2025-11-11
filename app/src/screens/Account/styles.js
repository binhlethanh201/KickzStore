import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },
  userCard: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#16A34A",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
  userEmail: {
    fontSize: 15,
    color: "#555",
    marginBottom: 4,
  },
  userAddress: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  buttonBlue: {
    backgroundColor: "#3b82f6",
  },
  buttonOrange: {
    backgroundColor: "#FFA500",
  },
  buttonRed: {
    backgroundColor: "#e11d48",
  },
  buttonOrange: {
    backgroundColor: "orange",
  },
});
