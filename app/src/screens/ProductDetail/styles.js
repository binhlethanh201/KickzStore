import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    width: width,
    height: width * 0.8,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },

  infoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 15,
  },
  price: {
    fontSize: 22,
    color: "#111111",
    fontWeight: "bold",
  },
  optionSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  optionButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 50,
    alignItems: "center",
  },
  optionSelected: {
    borderColor: "#16A34A",
    borderWidth: 2,
    backgroundColor: "#F0FFF8",
  },
  optionText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#16A34A",
    fontWeight: "700",
  },

  colorOptionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  colorOptionSelectedRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: '#292417',
    position: 'absolute',
  },


  descriptionSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
  },


  footer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#16A34A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#A0D9B9",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
