import {SafeAreaView, Text, View} from "react-native";
import {upperBarStyles as styles} from "../styles";
import React from "react";

const UpperBar = (props: {formatName: string, roomCode: string,}) => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{props.formatName}</Text>
        <Text style={styles.text}>{props.roomCode === '' ? "loading" : props.roomCode}</Text>
      </SafeAreaView>
    </View>
  );
};

export default UpperBar