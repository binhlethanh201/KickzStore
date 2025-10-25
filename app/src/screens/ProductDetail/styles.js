import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  brand: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#00C39A",
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    color: "#444",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#00C39A",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  optionText: {
    color: "#111",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#fff",
  },
  

});

export default styles;
