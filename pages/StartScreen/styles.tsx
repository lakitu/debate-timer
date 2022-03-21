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
    },
    inputs: {
        padding: 3,
    },
    dropdown: {
        width: Platform.OS === "web" ? 300 : "100%",
    }
})