import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    section: {
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111",
        marginLeft: 20,
        marginBottom: 15,
    },
    horizontalList: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    loadingContainer: {
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        color: "#000"
    },
    card: {
        width: 160,
        marginRight: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    photo: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: "cover",
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#222",
        marginTop: 10,
        marginHorizontal: 10,
    },
    category: {
        fontSize: 13,
        color: "#777",
        marginTop: 3,
        marginHorizontal: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#16A34A",
        marginTop: 8,
        marginBottom: 10,
        marginHorizontal: 10,
    },
});

export default styles;
