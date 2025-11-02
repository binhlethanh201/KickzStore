import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
    },
    status: {
        fontSize: 13,
        fontWeight: "bold",
        borderWidth: 1.5,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 15,
        textTransform: "capitalize",
        marginLeft: 10,
    },
    productImage: {
        width: width,
        height: width * 0.8,
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        marginVertical: 15,
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
    descriptionText: {
        fontSize: 15,
        lineHeight: 22,
    },
    actionContainer: {
        width: "100%",
    },
    actionButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    updateButton: {
        backgroundColor: "#1E90FF",
    },
    deleteButton: {
        backgroundColor: "#DC143C",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        maxHeight: "90%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputMultiline: {
        height: 100,
        paddingVertical: 10,
        textAlignVertical: 'top',
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
    },
    createButton: {
        backgroundColor: "#16A34A",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: "#888",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        padding: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#DC2626",
        fontSize: 16,
    },
});

export default styles;

