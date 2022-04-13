import {Platform, StyleSheet} from "react-native";

export const StartScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    header: {
        fontFamily:'RobotoMono',
        fontSize:30
    },
    roomInput: {
        borderColor: "black",
        borderWidth: 1,
        width: 350,
        height: 40,
        backgroundColor: "gainsboro",
        padding: 5,
        marginBottom: 5,
        fontFamily: "MontserratAlternate"
    },
    buttonContainer: {
        margin: 5,
        flexDirection: "row",
    },
    roomButton: {
        padding: 6,
        margin: 4,
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "MontserratAlternate",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    dropdown: {
        width: Platform.OS === "web" ? 300 : "100%",
        height: Platform.OS === "web" ? 30 : undefined,
    },
})

export const OfflineToggleStyles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
    },
    text: {
        fontFamily: "RobotoMono",
        padding: 5,
    }
});