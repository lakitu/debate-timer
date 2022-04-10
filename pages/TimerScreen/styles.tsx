import {StyleSheet, Platform, StatusBar} from "react-native";

export const timerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    marginTop: 20,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  count: {
    fontSize: 60,
    // height: 60,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontFamily: "RobotoMono",
    textAlign: "center",
    // flexShrink: 1,
  },
  finishedRed: {
    color: 'red',
  },
  finishedBlack: {
    color: 'black',
  },
  continuing: {
    color: "green",
  },
  speechName: {
    fontFamily: "MontserratAlternate",
    fontWeight: 'bold',
    textAlign: "center",
    fontSize: 40,
  }
});

export const upperBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3',
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    fontFamily: "RobotoMono"
  },
  backArrow: {
    flex: 1,
    height: 15,
    aspectRatio: 1,
    resizeMode: 'contain',
    paddingHorizontal: 30,
  }
});

export const hostStyles = StyleSheet.create({
  wrapperCustom: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexBasis: "auto",
    borderColor: "black",
  },
  sides: {
    height: 150,
    flexGrow: 1,
    maxWidth: 200,
    flexBasis: "50%",
  },
  innerText: {
    fontFamily: "MontserratAlternate",
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  }
});

export const prepStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  sideContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    flexGrow: 1,
    maxWidth: 200,
    flexBasis: "50%",
  },
  sideName: {
    fontFamily: "MontserratAlternate",
    fontSize: 30,
  },
  timer: {
    fontFamily: "RobotoMono",
    fontSize: 30,
  },
  pauseButtonText: {
    fontFamily: "MontserratAlternate",
    fontSize: 25,
    padding: 5,
  },
});