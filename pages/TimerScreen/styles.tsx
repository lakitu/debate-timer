import {StyleSheet, Platform} from "react-native";

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
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: "RobotoMono",
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
    ...Platform.select({
      web: {
        flexDirection: "column",
        paddingHorizontal: 20,
        width: 200,
        height: 75,
      },
      default: {
        flex: 1,
      }
    }),
    flexBasis: "auto",
    borderColor: "black",
  },
  sides: {
    height: 150,
    // flex: 1,
    ...Platform.select({
      web: {
        width: 200,
      },
      default: {
        flex: 1,
      }
    }),
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
    ...Platform.select({
      web: {
        flexDirection: "column",
        marginHorizontal: 20,
      },
      default: {
        flex: 1,
      },
    }), // web specific features
    flexBasis: "auto",
    width: 200,
  },
  sideName: {
    fontFamily: "MontserratAlternate",
    fontSize: 30,
  },
  timer: {
    fontFamily: "RobotoMono",
    fontSize: 30,
  },
  pauseButton: {
    ...Platform.select({
      "web": {
        marginHorizontal: 20,
      },
    }),
  },
  pauseButtonText: {
    fontFamily: "MontserratAlternate",
    fontSize: 25,
    padding: 5,
    // fontWeight: "bold",
  },
});