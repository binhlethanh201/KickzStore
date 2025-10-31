import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  horizontalList: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    width: 110,
    paddingBottom: 10,
    overflow: "hidden",
  },
  image: {
    width: 110,
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 10,
    resizeMode: "cover",
    backgroundColor: "#EEEEEE",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
});

export default styles;
