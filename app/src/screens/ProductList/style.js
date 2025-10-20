import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;
const CARD_MARGIN = 12;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },

  card: {
    width: CARD_WIDTH,
    marginRight: CARD_MARGIN,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",

    // shadow nhẹ kiểu stockx
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  photo: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    resizeMode: "contain",
    backgroundColor: "#F3F3F3",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginTop: 6,
    textAlign: "center",
  },

  category: {
    fontSize: 13,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 2,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
    textAlign: "center",
    marginTop: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});

export default styles;
