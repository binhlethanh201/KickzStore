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
        padding: 20,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: 18,
        fontWeight: '500',
        textTransform: 'capitalize',
        marginTop: 4,
    },
    detailCard: {
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
    },
    row: {
        marginBottom: 15,
    },
    rowLabel: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 4,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    actionContainer: {
        padding: 20,
        marginTop: 10,
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
