import {Image, Pressable, SafeAreaView, Text, View} from "react-native";
import {upperBarStyles as styles} from "../styles";
import * as Clipboard from "expo-clipboard";
import React, {useState} from "react";

const UpperBar = (props: {formatName: string, roomCode: string, restartApp: ()=>void}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: "row",}}>
          <Pressable onPress={props.restartApp}>
            <Image source={require("../../../assets/backArrow.png")} style={styles.backArrow} />
          </Pressable>
          <Text style={styles.text}>{props.formatName}</Text>
        </View>
        <Pressable onPress={()=> {
          Clipboard.setString(props.roomCode);
          setTooltipVisible(true);
          setTimeout(() => setTooltipVisible(!tooltipVisible), 5000);
        }}>
          <Text style={styles.text}>{props.roomCode === '' ? "loading" : props.roomCode}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default UpperBar