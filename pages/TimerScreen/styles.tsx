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
  // tooltipContainer: {
  //   position: "relative",
  //   display: "flex",
  // },
  // tooltip: {
  //   backgroundColor: "deepskyblue",
  //   textAlign: "center",
  //   borderRadius: 3,
  //   padding: 2,
  //   position: "absolute",
  //   zIndex: 1,
  //   top: "150%",
  //   left: "50%",
  //   marginLeft: -20,
  // }
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
        margin: 20,
      },
      default: {
        flex: 1,
        // margin: 0,
      }
    }),
    flexBasis: "auto",
    width: 200,
    height: 150,
  },
  innerText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(40, 40, 40)',
    padding: 10,
  }
});

export const prepStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
    fontFamily: "Righteous",
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
    fontFamily: "RobotoMono",
    fontSize: 20,
    padding: 5,
  },
});